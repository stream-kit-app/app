import type { StoredActionHandler, StoredActionTrigger } from '$lib/core/action/stored-action';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { DEFAULT_ACTION_GROUP } from '$lib/core/action/stored-action';

export {
	DEFAULT_ACTION_GROUP,
	type ActionRecord,
	type NewActionRecord,
	type StoredActionHandler,
	type StoredActionTrigger,
	type ActionLayoutUpdate
} from '$lib/core/action/stored-action';

/** User-configured actions saved to the local database. */
export const actions = sqliteTable('actions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	/** Stable id shared with PocketBase `user_actions` (15-char [a-z0-9]). */
	syncId: text('sync_id').notNull().unique(),
	name: text('name').notNull(),
	group: text('group').notNull().default(DEFAULT_ACTION_GROUP),
	groupSortOrder: integer('group_sort_order').notNull().default(0),
	sortOrder: integer('sort_order').notNull().default(0),
	triggers: text('triggers', { mode: 'json' }).$type<StoredActionTrigger[]>().notNull(),
	handlers: text('handlers', { mode: 'json' }).$type<StoredActionHandler[]>().notNull(),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
	queueId: integer('queue_id'),
	ownerPluginKey: text('owner_plugin_key'),
	/** Monotone sync counter; bumped on every local write. */
	revision: integer('revision').notNull().default(1),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});
