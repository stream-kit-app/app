import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { ConfigSyncEntityType } from './config-sync-tombstones';

/** Local snapshots of entities removed by remote-driven sync deletes (recovery buffer). */
export const configSyncTrash = sqliteTable('config_sync_trash', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	entityType: text('entity_type').notNull(),
	syncId: text('sync_id').notNull(),
	payload: text('payload').notNull(),
	deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }).notNull()
});

export type ConfigSyncTrashRecord = {
	id: number;
	entityType: ConfigSyncEntityType;
	syncId: string;
	payload: string;
	deletedAt: Date;
};
