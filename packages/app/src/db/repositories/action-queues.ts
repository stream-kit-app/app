import type { ActionQueueRecord, SaveActionQueueInput } from '../schemas/action-queues';

import { asc, eq, max } from 'drizzle-orm';

import { DEFAULT_ACTION_QUEUE_NAME } from '$lib/core/action/stored-action';
import {
	QUEUE_CONCURRENCY_BLOCKING,
	QUEUE_CONCURRENCY_UNLIMITED
} from '$lib/core/action-queue/queue-mode';

import { db } from '../index';
import { actionQueues } from '../schemas/action-queues';
import { actions } from '../schemas/actions';

export type { ActionQueueRecord, SaveActionQueueInput } from '../schemas/action-queues';
export { DEFAULT_ACTION_QUEUE_NAME };

export function normalizeConcurrency(value: number | null | undefined): number {
	if (value === QUEUE_CONCURRENCY_UNLIMITED) {
		return QUEUE_CONCURRENCY_UNLIMITED;
	}

	if (value == null || !Number.isFinite(value)) {
		return QUEUE_CONCURRENCY_BLOCKING;
	}

	return Math.max(1, Math.floor(value));
}

export function normalizeMaxLength(value: number | null | undefined): number | null {
	if (value == null || !Number.isFinite(value) || value <= 0) {
		return null;
	}

	return Math.floor(value);
}

async function getNextQueueSortOrder(): Promise<number> {
	const [row] = await db.select({ value: max(actionQueues.sortOrder) }).from(actionQueues);

	return (row?.value ?? -1) + 1;
}

export async function getActionQueues(): Promise<ActionQueueRecord[]> {
	return db
		.select()
		.from(actionQueues)
		.orderBy(asc(actionQueues.sortOrder), asc(actionQueues.id));
}

export async function getActionQueue(id: number): Promise<ActionQueueRecord | undefined> {
	const [row] = await db.select().from(actionQueues).where(eq(actionQueues.id, id)).limit(1);

	return row;
}

export function isDefaultActionQueue(queue: Pick<ActionQueueRecord, 'name'>): boolean {
	return queue.name === DEFAULT_ACTION_QUEUE_NAME;
}

export async function getDefaultActionQueue(): Promise<ActionQueueRecord | undefined> {
	const [row] = await db
		.select()
		.from(actionQueues)
		.where(eq(actionQueues.name, DEFAULT_ACTION_QUEUE_NAME))
		.limit(1);

	return row;
}

export async function ensureDefaultActionQueue(): Promise<ActionQueueRecord> {
	const existing = await getDefaultActionQueue();

	if (existing) {
		return existing;
	}

	const now = new Date();

	const [row] = await db
		.insert(actionQueues)
		.values({
			name: DEFAULT_ACTION_QUEUE_NAME,
			concurrency: QUEUE_CONCURRENCY_BLOCKING,
			maxLength: null,
			sortOrder: 0,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	if (!row) {
		throw new Error('Failed to create default action queue');
	}

	return row;
}

export async function getDefaultActionQueueId(): Promise<number> {
	return (await ensureDefaultActionQueue()).id;
}

export async function saveActionQueue(
	input: SaveActionQueueInput,
	id?: number
): Promise<ActionQueueRecord | undefined> {
	const now = new Date();
	const concurrency = normalizeConcurrency(input.concurrency);
	const maxLength = normalizeMaxLength(input.maxLength);

	if (id != null) {
		const [row] = await db
			.update(actionQueues)
			.set({
				name: input.name,
				concurrency,
				maxLength,
				updatedAt: now
			})
			.where(eq(actionQueues.id, id))
			.returning();

		return row;
	}

	const sortOrder = await getNextQueueSortOrder();

	const [row] = await db
		.insert(actionQueues)
		.values({
			name: input.name,
			concurrency,
			maxLength,
			sortOrder,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return row;
}

export async function deleteActionQueue(id: number): Promise<void> {
	const queue = await getActionQueue(id);

	if (queue && isDefaultActionQueue(queue)) {
		throw new Error('Cannot delete the default action queue');
	}

	const defaultQueue = await ensureDefaultActionQueue();

	// Reassign actions to the default queue rather than leaving them unqueued.
	await db
		.update(actions)
		.set({ queueId: defaultQueue.id, updatedAt: new Date() })
		.where(eq(actions.queueId, id));

	await db.delete(actionQueues).where(eq(actionQueues.id, id));
}
