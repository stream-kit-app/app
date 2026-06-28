import {
	deleteActionQueue,
	ensureDefaultActionQueue,
	getActionQueues,
	isDefaultActionQueue,
	normalizeConcurrency,
	normalizeMaxLength,
	saveActionQueue,
	type ActionQueueRecord,
	type SaveActionQueueInput
} from '$db';
import { DEFAULT_ACTION_QUEUE_NAME } from '$lib/core/action/stored-action';

import { QUEUE_CONCURRENCY_UNLIMITED } from './queue-mode';
import { getApp } from '../registry';

export type ActionQueueDefinition = {
	id: number;
	name: string;
	concurrency: number;
	maxLength: number | null;
	sortOrder: number;
};

export type ActionQueueStats = {
	pending: number;
	active: number;
	paused: boolean;
	pendingActions: QueuedActionEntry[];
	activeActions: QueuedActionEntry[];
};

export type QueuedActionEntry = {
	jobId: string;
	actionId: number | null;
	actionName: string;
};

export type QueueJob = {
	jobId: string;
	actionId: number | null;
	actionName: string;
	run: () => Promise<void>;
};

function toDefinition(record: ActionQueueRecord): ActionQueueDefinition {
	return {
		id: record.id,
		name: record.name,
		concurrency: record.concurrency,
		maxLength: record.maxLength,
		sortOrder: record.sortOrder
	};
}

/**
 * In-memory worker for a single queue. Pending jobs are not persisted; only the
 * queue definition lives in SQLite. With blocking mode the queue runs strictly in
 * FIFO order; without blocking, jobs start as soon as they are enqueued.
 */
class QueueRuntime {
	concurrency: number;
	maxLength: number | null;

	pending: number = $state(0);
	active: number = $state(0);
	paused: boolean = $state(false);
	pendingActions: QueuedActionEntry[] = $state([]);
	activeActions: QueuedActionEntry[] = $state([]);

	private jobs: QueueJob[] = [];

	constructor(definition: ActionQueueDefinition) {
		this.concurrency = definition.concurrency;
		this.maxLength = definition.maxLength;
	}

	applyDefinition(definition: ActionQueueDefinition): void {
		this.concurrency = definition.concurrency;
		this.maxLength = definition.maxLength;
		this.pump();
	}

	enqueue(job: QueueJob): boolean {
		if (this.maxLength != null && this.jobs.length >= this.maxLength) {
			return false;
		}

		this.jobs.push(job);
		this.syncPending();

		this.pump();

		return true;
	}

	private syncPending(): void {
		this.pending = this.jobs.length;
		this.pendingActions = this.jobs.map((job) => ({
			jobId: job.jobId,
			actionId: job.actionId,
			actionName: job.actionName
		}));
	}

	pause(): void {
		this.paused = true;
	}

	resume(): void {
		this.paused = false;
		this.pump();
	}

	clear(): void {
		this.jobs = [];
		this.pending = 0;
		this.pendingActions = [];
	}

	private pump(): void {
		while (
			!this.paused &&
			(this.concurrency === QUEUE_CONCURRENCY_UNLIMITED || this.active < this.concurrency) &&
			this.jobs.length > 0
		) {
			const job = this.jobs.shift();

			if (!job) {
				break;
			}

			this.syncPending();
			this.active += 1;
			this.activeActions = [
				...this.activeActions,
				{ jobId: job.jobId, actionId: job.actionId, actionName: job.actionName }
			];

			void this.runJob(job);
		}
	}

	private async runJob(job: QueueJob): Promise<void> {
		try {
			await job.run();
		} catch (error) {
			console.error('Action queue job failed', error);
		} finally {
			this.active -= 1;
			this.activeActions = this.activeActions.filter((item) => item.jobId !== job.jobId);
			this.pump();
		}
	}
}

export class ActionQueues {
	definitions: ActionQueueDefinition[] = $state.raw([]);
	defaultQueueId: number | null = $state(null);

	private runtimes = new Map<number, QueueRuntime>();

	async load(): Promise<void> {
		const defaultQueue = await ensureDefaultActionQueue();
		const records = await getActionQueues();
		const definitions = records.map(toDefinition);

		this.defaultQueueId = defaultQueue.id;
		this.definitions = definitions;

		const validIds = new Set(definitions.map((definition) => definition.id));

		for (const [id, runtime] of this.runtimes) {
			if (!validIds.has(id)) {
				runtime.clear();
				this.runtimes.delete(id);
			}
		}

		for (const definition of definitions) {
			this.runtimeFor(definition);
		}
	}

	getDefinition(id: number): ActionQueueDefinition | undefined {
		return this.definitions.find((definition) => definition.id === id);
	}

	isDefaultQueue(id: number): boolean {
		const definition = this.getDefinition(id);

		return definition != null && definition.name === DEFAULT_ACTION_QUEUE_NAME;
	}

	async create(input: SaveActionQueueInput): Promise<ActionQueueDefinition | undefined> {
		const record = await saveActionQueue({
			name: input.name,
			concurrency: normalizeConcurrency(input.concurrency),
			maxLength: normalizeMaxLength(input.maxLength)
		});

		if (!record) {
			return undefined;
		}

		const definition = toDefinition(record);
		this.definitions = [...this.definitions, definition];
		this.runtimeFor(definition);

		return definition;
	}

	async update(
		id: number,
		input: SaveActionQueueInput
	): Promise<ActionQueueDefinition | undefined> {
		const record = await saveActionQueue(
			{
				name: input.name,
				concurrency: normalizeConcurrency(input.concurrency),
				maxLength: normalizeMaxLength(input.maxLength)
			},
			id
		);

		if (!record) {
			return undefined;
		}

		const definition = toDefinition(record);
		this.definitions = this.definitions.map((item) =>
			item.id === id ? definition : item
		);
		this.runtimes.get(id)?.applyDefinition(definition);

		return definition;
	}

	async delete(id: number): Promise<void> {
		const definition = this.getDefinition(id);

		if (definition && isDefaultActionQueue(definition)) {
			throw new Error('Cannot delete the default action queue');
		}

		await deleteActionQueue(id);

		this.definitions = this.definitions.filter((item) => item.id !== id);
		this.runtimes.get(id)?.clear();
		this.runtimes.delete(id);

		// Actions reassigned in the DB may still point at the old id in memory.
		if (this.defaultQueueId != null) {
			for (const action of getApp().actions.items) {
				if (action.queueId === id) {
					action.queueId = this.defaultQueueId;
				}
			}
		}
	}

	/** Returns false when the queue is full (the job is dropped). */
	enqueue(queueId: number, job: QueueJob): boolean {
		const definition = this.getDefinition(queueId);

		if (!definition) {
			// Unknown queue (e.g. deleted): run immediately rather than dropping.
			void job.run().catch((error) => {
				console.error('Action queue job failed', error);
			});

			return true;
		}

		const accepted = this.runtimeFor(definition).enqueue(job);

		if (!accepted) {
			console.warn(
				`Action queue "${definition.name}" is full (max ${definition.maxLength}); dropping run.`
			);
		}

		return accepted;
	}

	pause(queueId: number): void {
		this.runtimes.get(queueId)?.pause();
	}

	resume(queueId: number): void {
		this.runtimes.get(queueId)?.resume();
	}

	clear(queueId: number): void {
		this.runtimes.get(queueId)?.clear();
	}

	stats(queueId: number): ActionQueueStats {
		const runtime = this.runtimes.get(queueId);

		if (!runtime) {
			return {
				pending: 0,
				active: 0,
				paused: false,
				pendingActions: [],
				activeActions: []
			};
		}

		return {
			pending: runtime.pending,
			active: runtime.active,
			paused: runtime.paused,
			pendingActions: runtime.pendingActions,
			activeActions: runtime.activeActions
		};
	}

	private runtimeFor(definition: ActionQueueDefinition): QueueRuntime {
		let runtime = this.runtimes.get(definition.id);

		if (!runtime) {
			runtime = new QueueRuntime(definition);
			this.runtimes.set(definition.id, runtime);
		}

		return runtime;
	}
}
