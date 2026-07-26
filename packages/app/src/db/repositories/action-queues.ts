import type { ActionQueueRecord, SaveActionQueueInput } from '../schemas/action-queues';

import { asc, eq, max } from 'drizzle-orm';

import { DEFAULT_ACTION_QUEUE_NAME } from '$lib/core/action/stored-action';
import {
	QUEUE_CONCURRENCY_BLOCKING,
	QUEUE_CONCURRENCY_UNLIMITED
} from '$lib/core/action-queue/queue-mode';

import { db } from '../index';
import { createSyncId } from '../sync-id';
import { actionQueues } from '../schemas/action-queues';
import { actions } from '../schemas/actions';
import { recordConfigSyncTombstone } from './config-sync-tombstones';
import { notifyConfigLocalChange } from '../config-sync-notify';

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
			syncId: createSyncId(),
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

		notifyConfigLocalChange();
		return row;
	}

	const sortOrder = await getNextQueueSortOrder();

	const [row] = await db
		.insert(actionQueues)
		.values({
			syncId: createSyncId(),
			name: input.name,
			concurrency,
			maxLength,
			sortOrder,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	notifyConfigLocalChange();
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

	if (queue?.syncId) {
		await recordConfigSyncTombstone('action_queue', queue.syncId);
	}

	await db.delete(actionQueues).where(eq(actionQueues.id, id));
	notifyConfigLocalChange();
}

export async function getActionQueueBySyncId(
	syncId: string
): Promise<ActionQueueRecord | undefined> {
	const [row] = await db
		.select()
		.from(actionQueues)
		.where(eq(actionQueues.syncId, syncId))
		.limit(1);

	return row;
}

export async function upsertActionQueueFromSync(input: {
	syncId: string;
	name: string;
	concurrency: number;
	maxLength: number | null;
	sortOrder: number;
	updatedAt: Date;
}): Promise<ActionQueueRecord> {
	const existing = await getActionQueueBySyncId(input.syncId);
	const concurrency = normalizeConcurrency(input.concurrency);
	const maxLength = normalizeMaxLength(input.maxLength);

	if (existing) {
		const [row] = await db
			.update(actionQueues)
			.set({
				name: input.name,
				concurrency,
				maxLength,
				sortOrder: input.sortOrder,
				updatedAt: input.updatedAt
			})
			.where(eq(actionQueues.id, existing.id))
			.returning();

		if (!row) {
			throw new Error('Failed to update action queue from sync');
		}

		return row;
	}

	const [row] = await db
		.insert(actionQueues)
		.values({
			syncId: input.syncId,
			name: input.name,
			concurrency,
			maxLength,
			sortOrder: input.sortOrder,
			createdAt: input.updatedAt,
			updatedAt: input.updatedAt
		})
		.returning();

	if (!row) {
		throw new Error('Failed to create action queue from sync');
	}

	return row;
}

export async function deleteActionQueueBySyncId(syncId: string): Promise<void> {
	const queue = await getActionQueueBySyncId(syncId);
	if (!queue) {
		return;
	}

	if (isDefaultActionQueue(queue)) {
		return;
	}

	await deleteActionQueue(queue.id);
}

export async function replaceActionQueueSyncId(
	id: number,
	nextSyncId: string
): Promise<void> {
	const existing = await getActionQueueBySyncId(nextSyncId);
	if (existing && existing.id !== id) {
		await db
			.update(actions)
			.set({ queueId: id, updatedAt: new Date() })
			.where(eq(actions.queueId, existing.id));
		await db.delete(actionQueues).where(eq(actionQueues.id, existing.id));
	}

	await db
		.update(actionQueues)
		.set({ syncId: nextSyncId, updatedAt: new Date() })
		.where(eq(actionQueues.id, id));
}
