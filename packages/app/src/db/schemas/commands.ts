import type {
	CommandPermissions,
	CommandSource
} from '$lib/core/commands/stored-command';
import type { StoredActionHandler } from '$lib/core/action/action-handler.svelte';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export {
	type CommandRecord,
	type CommandPermissions,
	type CommandSource,
	type NewCommandRecord
} from '$lib/core/commands/stored-command';

/** User-configured chat commands saved to the local database. */
export const commands = sqliteTable('commands', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	commandNames: text('command_names', { mode: 'json' }).$type<string[]>().notNull(),
	handlers: text('handlers', { mode: 'json' }).$type<StoredActionHandler[]>().notNull(),
	sources: text('sources', { mode: 'json' }).$type<CommandSource[]>().notNull(),
	permissions: text('permissions', { mode: 'json' }).$type<CommandPermissions>().notNull(),
	cooldownGlobalMs: integer('cooldown_global_ms'),
	cooldownUserMs: integer('cooldown_user_ms'),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});
