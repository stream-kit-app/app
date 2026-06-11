import type {
	ModRuleAction,
	ModRuleParameters,
	ModRulePlatform,
	ModRuleType
} from '../lib/stored-mod-rule';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** Auto-moderation rules applied to incoming chat messages. */
export const botModRules = sqliteTable('bot_mod_rules', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	type: text('type').$type<ModRuleType>().notNull(),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
	action: text('action').$type<ModRuleAction>().notNull(),
	parameters: text('parameters', { mode: 'json' }).$type<ModRuleParameters>().notNull(),
	platforms: text('platforms', { mode: 'json' }).$type<ModRulePlatform[]>().notNull(),
	priority: integer('priority').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type {
	ModRuleAction,
	ModRuleParameters,
	ModRulePlatform,
	ModRuleRecord,
	ModRuleType
} from '../lib/stored-mod-rule';
