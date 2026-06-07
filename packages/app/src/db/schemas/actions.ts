import type { ConditionGroupNode } from '$lib/core/action/trigger/condition';
import type { HandlerFieldInstance } from '$lib/core/action/handler/field';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type StoredActionTrigger = {
	id: string;
	triggerTypeId: string;
	conditions: ConditionGroupNode;
};

export type StoredActionHandler = {
	id: string;
	handlerTypeId: string;
	fields: HandlerFieldInstance[];
	/** @deprecated Legacy condition-tree config, migrated on load. */
	config?: ConditionGroupNode;
};

export const DEFAULT_ACTION_GROUP = 'default';

/** User-configured actions saved to the local database. */
export const actions = sqliteTable('actions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	group: text('group').notNull().default(DEFAULT_ACTION_GROUP),
	triggers: text('triggers', { mode: 'json' }).$type<StoredActionTrigger[]>().notNull(),
	handlers: text('handlers', { mode: 'json' }).$type<StoredActionHandler[]>().notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type ActionRecord = typeof actions.$inferSelect;
export type NewActionRecord = typeof actions.$inferInsert;
