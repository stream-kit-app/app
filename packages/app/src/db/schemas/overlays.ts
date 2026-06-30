import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const overlays = sqliteTable('overlays', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	template: text('template').notNull().default('blank'),
	config: text('config', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
	expectedEvents: text('expected_events', { mode: 'json' }).$type<string[]>().notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type OverlayRecord = typeof overlays.$inferSelect;
export type NewOverlayRecord = typeof overlays.$inferInsert;
