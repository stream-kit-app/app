import { asc, eq, lt } from 'drizzle-orm';

import { db } from '../index';
import type { ConfigSyncEntityType } from '../schemas/config-sync-tombstones';
import { configSyncTrash } from '../schemas/config-sync-trash';
import { getActionBySyncId } from './actions';
import {
	getActionQueueBySyncId,
	isDefaultActionQueue
} from './action-queues';

const TRASH_MAX_ITEMS = 50;
const TRASH_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export async function writeConfigSyncTrash(
	entityType: ConfigSyncEntityType,
	syncId: string,
	payload: unknown,
	deletedAt: Date = new Date()
): Promise<void> {
	await db.insert(configSyncTrash).values({
		entityType,
		syncId,
		payload: JSON.stringify(payload),
		deletedAt
	});
	await pruneConfigSyncTrash();
}

export async function snapshotActionToTrash(syncId: string): Promise<void> {
	const existing = await getActionBySyncId(syncId);
	if (!existing) {
		return;
	}
	await writeConfigSyncTrash('action', syncId, existing);
}

export async function snapshotActionQueueToTrash(syncId: string): Promise<void> {
	const existing = await getActionQueueBySyncId(syncId);
	if (!existing || isDefaultActionQueue(existing)) {
		return;
	}
	await writeConfigSyncTrash('action_queue', syncId, existing);
}

async function pruneConfigSyncTrash(): Promise<void> {
	const cutoff = new Date(Date.now() - TRASH_MAX_AGE_MS);
	await db.delete(configSyncTrash).where(lt(configSyncTrash.deletedAt, cutoff));

	const rows = await db
		.select({ id: configSyncTrash.id })
		.from(configSyncTrash)
		.orderBy(asc(configSyncTrash.deletedAt), asc(configSyncTrash.id));

	const overflow = rows.length - TRASH_MAX_ITEMS;
	if (overflow <= 0) {
		return;
	}

	const dropIds = rows.slice(0, overflow).map((row) => row.id);
	for (const id of dropIds) {
		await db.delete(configSyncTrash).where(eq(configSyncTrash.id, id));
	}
}
