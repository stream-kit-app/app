import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** Named queues that serialize action execution. */
export const actionQueues = sqliteTable('action_queues', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	/** Stable id shared with PocketBase `user_action_queues` (15-char [a-z0-9]). */
	syncId: text('sync_id').notNull().unique(),
	name: text('name').notNull(),
	concurrency: integer('concurrency').notNull().default(1),
	maxLength: integer('max_length'),
	sortOrder: integer('sort_order').notNull().default(0),
	/** Monotone sync counter; bumped on every local write. */
	revision: integer('revision').notNull().default(1),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type ActionQueueRecord = {
	id: number;
	syncId: string;
	name: string;
	concurrency: number;
	maxLength: number | null;
	sortOrder: number;
	revision: number;
	createdAt: Date;
	updatedAt: Date;
};

export type SaveActionQueueInput = {
	name: string;
	concurrency: number;
	maxLength: number | null;
};
