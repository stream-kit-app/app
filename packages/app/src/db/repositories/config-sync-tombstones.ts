import type { BatchStatement } from '../batch';
import { and, eq } from 'drizzle-orm';

import { db } from '../index';
import {
	configSyncTombstones,
	type ConfigSyncEntityType
} from '../schemas/config-sync-tombstones';

/**
 * Tombstone upsert as a raw statement, for writing it in the same `executeBatch`
 * transaction as the delete it records (keeps an existing revision when none is given).
 */
export function configSyncTombstoneStatement(
	entityType: ConfigSyncEntityType,
	syncId: string,
	deletedAt: Date,
	revision?: number
): BatchStatement {
	return {
		sql: `INSERT INTO config_sync_tombstones (entity_type, sync_id, deleted_at, revision)
			VALUES (?, ?, ?, ?)
			ON CONFLICT (entity_type, sync_id) DO UPDATE SET
				deleted_at = excluded.deleted_at,
				revision = COALESCE(excluded.revision, config_sync_tombstones.revision)`,
		params: [entityType, syncId, deletedAt.getTime(), revision ?? null]
	};
}

export async function recordConfigSyncTombstone(
	entityType: ConfigSyncEntityType,
	syncId: string,
	deletedAt: Date = new Date(),
	revision?: number
): Promise<void> {
	const existing = await db
		.select()
		.from(configSyncTombstones)
		.where(
			and(
				eq(configSyncTombstones.entityType, entityType),
				eq(configSyncTombstones.syncId, syncId)
			)
		)
		.limit(1);

	const nextRevision =
		revision ?? existing[0]?.revision ?? null;

	if (existing[0]) {
		await db
			.update(configSyncTombstones)
			.set({
				deletedAt,
				...(nextRevision != null ? { revision: nextRevision } : {})
			})
			.where(
				and(
					eq(configSyncTombstones.entityType, entityType),
					eq(configSyncTombstones.syncId, syncId)
				)
			);
		return;
	}

	await db.insert(configSyncTombstones).values({
		entityType,
		syncId,
		deletedAt,
		revision: nextRevision
	});
}

export async function listConfigSyncTombstones(
	entityType: ConfigSyncEntityType
): Promise<Array<{ syncId: string; deletedAt: Date; revision: number | null }>> {
	const rows = await db
		.select()
		.from(configSyncTombstones)
		.where(eq(configSyncTombstones.entityType, entityType));

	return rows.map((row) => ({
		syncId: row.syncId,
		deletedAt: row.deletedAt,
		revision: row.revision ?? null
	}));
}

export async function clearConfigSyncTombstone(
	entityType: ConfigSyncEntityType,
	syncId: string
): Promise<void> {
	await db
		.delete(configSyncTombstones)
		.where(
			and(
				eq(configSyncTombstones.entityType, entityType),
				eq(configSyncTombstones.syncId, syncId)
			)
		);
}
