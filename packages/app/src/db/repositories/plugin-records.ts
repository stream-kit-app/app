import { and, asc, eq } from 'drizzle-orm';

import { db } from '../index';
import { createSyncId, isSyncId } from '../sync-id';
import { notifyConfigLocalChange } from '../config-sync-notify';
import {
	pluginRecords,
	type PluginRecordRow,
	type SavePluginRecordInput
} from '../schemas/plugin-records';
import { recordConfigSyncTombstone } from './config-sync-tombstones';

export type { PluginRecordRow, SavePluginRecordInput };

export async function listPluginRecords(
	pluginKey: string,
	collection: string
): Promise<PluginRecordRow[]> {
	return db
		.select()
		.from(pluginRecords)
		.where(
			and(
				eq(pluginRecords.pluginKey, pluginKey),
				eq(pluginRecords.collection, collection)
			)
		)
		.orderBy(asc(pluginRecords.sortOrder), asc(pluginRecords.id));
}

export async function listAllPluginRecords(): Promise<PluginRecordRow[]> {
	return db.select().from(pluginRecords);
}

export async function getPluginRecordBySyncId(
	syncId: string
): Promise<PluginRecordRow | undefined> {
	const [row] = await db
		.select()
		.from(pluginRecords)
		.where(eq(pluginRecords.syncId, syncId))
		.limit(1);
	return row;
}

export async function getPluginRecord(
	pluginKey: string,
	collection: string,
	syncId: string
): Promise<PluginRecordRow | undefined> {
	const [row] = await db
		.select()
		.from(pluginRecords)
		.where(
			and(
				eq(pluginRecords.pluginKey, pluginKey),
				eq(pluginRecords.collection, collection),
				eq(pluginRecords.syncId, syncId)
			)
		)
		.limit(1);
	return row;
}

export async function createPluginRecord(
	input: SavePluginRecordInput
): Promise<PluginRecordRow> {
	const now = new Date();
	const syncId =
		input.syncId && isSyncId(input.syncId) ? input.syncId : createSyncId();
	const sortOrder = input.sortOrder ?? 0;
	const payload = { ...input.payload, id: syncId };

	const [row] = await db
		.insert(pluginRecords)
		.values({
			pluginKey: input.pluginKey,
			collection: input.collection,
			syncId,
			payload,
			sortOrder,
			revision: 1,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	if (!row) {
		throw new Error('Failed to create plugin record');
	}

	notifyConfigLocalChange();
	return row;
}

export async function updatePluginRecord(
	pluginKey: string,
	collection: string,
	syncId: string,
	input: { payload?: Record<string, unknown>; sortOrder?: number }
): Promise<PluginRecordRow> {
	const existing = await getPluginRecord(pluginKey, collection, syncId);
	if (!existing) {
		throw new Error(`Plugin record "${syncId}" not found`);
	}

	const [row] = await db
		.update(pluginRecords)
		.set({
			payload: input.payload ?? existing.payload,
			sortOrder: input.sortOrder ?? existing.sortOrder,
			revision: (existing.revision ?? 1) + 1,
			updatedAt: new Date()
		})
		.where(eq(pluginRecords.id, existing.id))
		.returning();

	if (!row) {
		throw new Error('Failed to update plugin record');
	}

	notifyConfigLocalChange();
	return row;
}

export async function deletePluginRecord(
	pluginKey: string,
	collection: string,
	syncId: string
): Promise<void> {
	const existing = await getPluginRecord(pluginKey, collection, syncId);
	if (!existing) {
		return;
	}

	await db.delete(pluginRecords).where(eq(pluginRecords.id, existing.id));
	await recordConfigSyncTombstone(
		'plugin_record',
		existing.syncId,
		new Date(),
		(existing.revision ?? 1) + 1
	);
	notifyConfigLocalChange();
}

export async function deletePluginRecordsByPlugin(pluginKey: string): Promise<number> {
	const rows = await db
		.select()
		.from(pluginRecords)
		.where(eq(pluginRecords.pluginKey, pluginKey));

	if (rows.length === 0) {
		return 0;
	}

	const deletedAt = new Date();
	for (const row of rows) {
		await db.delete(pluginRecords).where(eq(pluginRecords.id, row.id));
		await recordConfigSyncTombstone(
			'plugin_record',
			row.syncId,
			deletedAt,
			(row.revision ?? 1) + 1
		);
	}
	notifyConfigLocalChange();
	return rows.length;
}

/** Apply a remote row without notifying sync (used by ConfigSync). */
export async function upsertPluginRecordFromSync(input: {
	syncId: string;
	pluginKey: string;
	collection: string;
	payload: Record<string, unknown>;
	sortOrder: number;
	revision: number;
	updatedAt: Date;
}): Promise<PluginRecordRow> {
	const existing = await getPluginRecordBySyncId(input.syncId);
	const revision = Number(input.revision) || 1;

	if (existing) {
		const [row] = await db
			.update(pluginRecords)
			.set({
				pluginKey: input.pluginKey,
				collection: input.collection,
				payload: input.payload,
				sortOrder: input.sortOrder,
				revision,
				updatedAt: input.updatedAt
			})
			.where(eq(pluginRecords.id, existing.id))
			.returning();

		if (!row) {
			throw new Error('Failed to update plugin record from sync');
		}
		return row;
	}

	const [row] = await db
		.insert(pluginRecords)
		.values({
			syncId: input.syncId,
			pluginKey: input.pluginKey,
			collection: input.collection,
			payload: input.payload,
			sortOrder: input.sortOrder,
			revision,
			createdAt: input.updatedAt,
			updatedAt: input.updatedAt
		})
		.returning();

	if (!row) {
		throw new Error('Failed to create plugin record from sync');
	}
	return row;
}

/** Hard-delete by syncId without tombstone (remote soft-delete already won). */
export async function deletePluginRecordBySyncIdFromSync(syncId: string): Promise<void> {
	const existing = await getPluginRecordBySyncId(syncId);
	if (!existing) {
		return;
	}
	await db.delete(pluginRecords).where(eq(pluginRecords.id, existing.id));
}

export async function snapshotPluginRecordToTrash(syncId: string): Promise<void> {
	const existing = await getPluginRecordBySyncId(syncId);
	if (!existing) {
		return;
	}
	const { writeConfigSyncTrash } = await import('./config-sync-trash');
	await writeConfigSyncTrash('plugin_record', syncId, existing);
}
