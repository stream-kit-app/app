import type { TimerPlatform } from '../lib/stored-timer';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** Scheduled chat messages sent by the bot. */
export const botTimers = sqliteTable('bot_timers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	messages: text('messages', { mode: 'json' }).$type<string[]>().notNull(),
	intervalMinSec: integer('interval_min_sec').notNull(),
	intervalMaxSec: integer('interval_max_sec').notNull(),
	minChatLines: integer('min_chat_lines').notNull().default(0),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
	platforms: text('platforms', { mode: 'json' }).$type<TimerPlatform[]>().notNull(),
	onlineOnly: integer('online_only', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type { TimerRecord, TimerPlatform } from '../lib/stored-timer';
