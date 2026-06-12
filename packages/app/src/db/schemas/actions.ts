import {
	DEFAULT_ACTION_GROUP,
	type StoredActionHandler,
	type StoredActionTrigger
} from '$lib/core/action/stored-action';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
	name: text('name').notNull(),
	group: text('group').notNull().default(DEFAULT_ACTION_GROUP),
	groupSortOrder: integer('group_sort_order').notNull().default(0),
	sortOrder: integer('sort_order').notNull().default(0),
	triggers: text('triggers', { mode: 'json' }).$type<StoredActionTrigger[]>().notNull(),
	handlers: text('handlers', { mode: 'json' }).$type<StoredActionHandler[]>().notNull(),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});
