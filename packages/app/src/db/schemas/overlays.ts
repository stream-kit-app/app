import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const overlays = sqliteTable('overlays', {
	id: text('id').primaryKey(),
	/** Stable id shared with PocketBase `user_overlay_projects` (15-char [a-z0-9]). */
	syncId: text('sync_id').notNull().unique(),
	name: text('name').notNull(),
	template: text('template').notNull().default('blank'),
	config: text('config', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
	version: integer('version').notNull().default(0),
	expectedEvents: text('expected_events', { mode: 'json' }).$type<string[]>().notNull(),
	requiredPlugins: text('required_plugins', { mode: 'json' }).$type<string[]>().notNull(),
	installedActionKeys: text('installed_action_keys', { mode: 'json' }).$type<string[]>().notNull(),
	/** SHA-256 hex of the last uploaded/downloaded project zip; empty until first sync. */
	sourceHash: text('source_hash').notNull().default(''),
	/** Monotone sync counter; bumped on every local write. */
	revision: integer('revision').notNull().default(1),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type OverlayRecord = typeof overlays.$inferSelect;
export type NewOverlayRecord = typeof overlays.$inferInsert;
