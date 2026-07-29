import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** Pending / known deletes for cloud config sync (LWW tombstones). */
export const configSyncTombstones = sqliteTable('config_sync_tombstones', {
	entityType: text('entity_type').notNull(),
	syncId: text('sync_id').notNull(),
	deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }).notNull(),
	/** Delete-side revision (existing.revision + 1 when recorded from a local delete). */
	revision: integer('revision')
});

/** Known entity types; string allows new adapters without a schema migration. */
export type ConfigSyncEntityType =
	| 'action'
	| 'action_queue'
	| 'plugin_record'
	| 'overlay'
	| 'dashboard_widget'
	| (string & {});

export type ConfigSyncTombstoneRecord = {
	entityType: ConfigSyncEntityType;
	syncId: string;
	deletedAt: Date;
	revision: number | null;
};
