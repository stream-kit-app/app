import type Database from '@tauri-apps/plugin-sql';
import type { ConditionGroupNode } from '$lib/core/action/trigger/condition';

import {
	convertLegacyModRuleParameters,
	isLegacyModRuleType,
	migrateRateLimitConditionKeys,
	type LegacyModRuleRow
} from '../../moderation/app/lib/migrate-mod-rules';
import {
	convertTimerMessagesToHandlers,
	normalizeLegacyTimerMessages
} from '../../timers/app/lib/migrate-timer-messages';
import type { TimerPlatform } from '../../timers/app/lib/stored-timer';

export { migrateCommandsTable } from '../../commands/app/db/migrate';

type LegacyTimerRow = {
	id: number;
	name: string;
	messages: string;
	handlers?: string;
	interval_min_sec: number;
	interval_max_sec: number;
	min_chat_lines: number;
	enabled: number;
	platforms: string;
	online_only: number;
	created_at: number;
	updated_at: number;
};

async function createBotTimersTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS bot_timers (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			handlers TEXT NOT NULL,
			interval_min_sec INTEGER NOT NULL,
			interval_max_sec INTEGER NOT NULL,
			min_chat_lines INTEGER NOT NULL DEFAULT 0,
			enabled INTEGER NOT NULL DEFAULT 1,
			platforms TEXT NOT NULL,
			online_only INTEGER NOT NULL DEFAULT 0,
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)
	`);
}

function parsePlatforms(value: string): TimerPlatform[] {
	const parsed = JSON.parse(value) as unknown;

	if (!Array.isArray(parsed)) {
		return ['twitch', 'youtube'];
	}

	return parsed.filter((platform): platform is TimerPlatform =>
		platform === 'twitch' || platform === 'youtube'
	);
}

function parseHandlers(value: string | undefined): unknown[] {
	if (!value) {
		return [];
	}

	const parsed = JSON.parse(value) as unknown;

	return Array.isArray(parsed) ? parsed : [];
}

export async function migrateBotTimersTable(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(bot_timers)');

	if (columns.length === 0) {
		await createBotTimersTable(sqlite);
		return;
	}

	const hasMessages = columns.some((column) => column.name === 'messages');
	const hasHandlers = columns.some((column) => column.name === 'handlers');

	if (!hasHandlers) {
		await sqlite.execute(`ALTER TABLE bot_timers ADD COLUMN handlers TEXT NOT NULL DEFAULT '[]'`);
	}

	if (!hasMessages) {
		return;
	}

	const rows = await sqlite.select<LegacyTimerRow[]>('SELECT * FROM bot_timers');

	await sqlite.execute('DROP TABLE bot_timers');
	await createBotTimersTable(sqlite);

	for (const row of rows) {
		const platforms = parsePlatforms(row.platforms);
		const existingHandlers = parseHandlers(row.handlers);
		const legacyMessages = normalizeLegacyTimerMessages(JSON.parse(row.messages));
		const handlers =
			existingHandlers.length > 0
				? existingHandlers
				: convertTimerMessagesToHandlers(legacyMessages, platforms);

		await sqlite.execute(
			`INSERT INTO bot_timers (
				id, name, handlers, interval_min_sec, interval_max_sec, min_chat_lines,
				enabled, platforms, online_only, created_at, updated_at
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
			[
				row.id,
				row.name,
				JSON.stringify(handlers),
				row.interval_min_sec,
				row.interval_max_sec,
				row.min_chat_lines,
				row.enabled,
				row.platforms,
				row.online_only,
				row.created_at,
				row.updated_at
			]
		);
	}
}

export async function migrateBotModRulesTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS bot_mod_rules (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			type TEXT NOT NULL,
			enabled INTEGER NOT NULL DEFAULT 1,
			action TEXT NOT NULL,
			parameters TEXT NOT NULL,
			platforms TEXT NOT NULL,
			priority INTEGER NOT NULL DEFAULT 0,
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)
	`);

	try {
		await sqlite.execute(`ALTER TABLE bot_mod_rules ADD COLUMN priority INTEGER NOT NULL DEFAULT 0`);
	} catch {
		// Column already exists.
	}

	const rows = await sqlite.select<LegacyModRuleRow[]>(
		`SELECT id, type, parameters FROM bot_mod_rules WHERE type != 'custom'`
	);

	for (const row of rows) {
		if (!isLegacyModRuleType(row.type)) {
			continue;
		}

		const parameters = convertLegacyModRuleParameters(
			row.type,
			typeof row.parameters === 'string' ? JSON.parse(row.parameters) : row.parameters
		);

		await sqlite.execute(
			`UPDATE bot_mod_rules SET type = 'custom', parameters = $1, updated_at = $2 WHERE id = $3`,
			[JSON.stringify({ conditions: parameters }), Date.now(), row.id]
		);
	}

	const customRows = await sqlite.select<Array<{ id: number; parameters: string }>>(
		`SELECT id, parameters FROM bot_mod_rules WHERE type = 'custom'`
	);

	for (const row of customRows) {
		const parsed =
			typeof row.parameters === 'string' ? JSON.parse(row.parameters) : row.parameters;

		if (!parsed?.conditions) {
			continue;
		}

		const conditions = structuredClone(parsed.conditions) as ConditionGroupNode;

		if (!migrateRateLimitConditionKeys(conditions)) {
			continue;
		}

		await sqlite.execute(`UPDATE bot_mod_rules SET parameters = $1, updated_at = $2 WHERE id = $3`, [
			JSON.stringify({ ...parsed, conditions }),
			Date.now(),
			row.id
		]);
	}
}

export async function migrateBotTables(sqlite: Database): Promise<void> {
	const { migrateCommandsTable } = await import('../../commands/app/db/migrate');

	await migrateCommandsTable(sqlite);
	await migrateBotTimersTable(sqlite);
	await migrateBotModRulesTable(sqlite);
}
