import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Generic per-record store for plugin domain data (commands, rankings users, quotes, …).
 * Synced to PocketBase `user_plugin_records` via ConfigSync.
 */
export const pluginRecords = sqliteTable('plugin_records', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	pluginKey: text('plugin_key').notNull(),
	collection: text('collection').notNull(),
	/** Stable id shared with PocketBase (15-char [a-z0-9]). */
	syncId: text('sync_id').notNull().unique(),
	payload: text('payload', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
	sortOrder: integer('sort_order').notNull().default(0),
	/** Monotone sync counter; bumped on every local write. */
	revision: integer('revision').notNull().default(1),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type PluginRecordRow = {
	id: number;
	pluginKey: string;
	collection: string;
	syncId: string;
	payload: Record<string, unknown>;
	sortOrder: number;
	revision: number;
	createdAt: Date;
	updatedAt: Date;
};

export type SavePluginRecordInput = {
	pluginKey: string;
	collection: string;
	syncId?: string;
	payload: Record<string, unknown>;
	sortOrder?: number;
};
