import { and, eq } from 'drizzle-orm';

import { db } from '../index';
import { configSyncBase } from '../schemas/config-sync-base';
import type { ConfigSyncEntityType } from '../schemas/config-sync-tombstones';

export type ConfigSyncBaseEntry = {
	revision: number;
	content: Record<string, unknown>;
};

export async function listConfigSyncBases(
	entityType: ConfigSyncEntityType
): Promise<Map<string, ConfigSyncBaseEntry>> {
	const rows = await db
		.select()
		.from(configSyncBase)
		.where(eq(configSyncBase.entityType, entityType));

	const bases = new Map<string, ConfigSyncBaseEntry>();
	for (const row of rows) {
		try {
			bases.set(row.syncId, {
				revision: row.revision,
				content: JSON.parse(row.content) as Record<string, unknown>
			});
		} catch {
			// A corrupt base only disables merging for that entity.
		}
	}
	return bases;
}

export async function setConfigSyncBase(
	entityType: ConfigSyncEntityType,
	syncId: string,
	revision: number,
	content: Record<string, unknown>
): Promise<void> {
	const serialized = JSON.stringify(content);
	await db
		.insert(configSyncBase)
		.values({ entityType, syncId, revision, content: serialized })
		.onConflictDoUpdate({
			target: [configSyncBase.entityType, configSyncBase.syncId],
			set: { revision, content: serialized }
		});
}

export async function deleteConfigSyncBase(
	entityType: ConfigSyncEntityType,
	syncId: string
): Promise<void> {
	await db
		.delete(configSyncBase)
		.where(and(eq(configSyncBase.entityType, entityType), eq(configSyncBase.syncId, syncId)));
}
