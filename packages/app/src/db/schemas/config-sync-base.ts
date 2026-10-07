import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Content of each synced entity as of its last successful sync (the common ancestor).
 * Lets config sync tell which side changed which field when both edited the same entity.
 */
export const configSyncBase = sqliteTable(
	'config_sync_base',
	{
		entityType: text('entity_type').notNull(),
		syncId: text('sync_id').notNull(),
		revision: integer('revision').notNull(),
		/** JSON object of the entity's synced fields (no id/user/revision/timestamps). */
		content: text('content').notNull()
	},
	(table) => [primaryKey({ columns: [table.entityType, table.syncId] })]
);
