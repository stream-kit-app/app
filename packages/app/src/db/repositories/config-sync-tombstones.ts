import { and, eq } from 'drizzle-orm';

import { db } from '../index';
import {
	configSyncTombstones,
	type ConfigSyncEntityType
} from '../schemas/config-sync-tombstones';

export async function recordConfigSyncTombstone(
	entityType: ConfigSyncEntityType,
	syncId: string,
	deletedAt: Date = new Date()
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

	if (existing[0]) {
		await db
			.update(configSyncTombstones)
			.set({ deletedAt })
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
		deletedAt
	});
}

export async function listConfigSyncTombstones(
	entityType: ConfigSyncEntityType
): Promise<Array<{ syncId: string; deletedAt: Date }>> {
	const rows = await db
		.select()
		.from(configSyncTombstones)
		.where(eq(configSyncTombstones.entityType, entityType));

	return rows.map((row) => ({
		syncId: row.syncId,
		deletedAt: row.deletedAt
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
