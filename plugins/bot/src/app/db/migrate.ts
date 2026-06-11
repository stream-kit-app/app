import type Database from '@tauri-apps/plugin-sql';
import type { ConditionGroupNode } from '$lib/core/action/trigger/condition';

import {
	convertLegacyModRuleParameters,
	isLegacyModRuleType,
	migrateRateLimitConditionKeys,
	type LegacyModRuleRow
} from '../../moderation/app/lib/migrate-mod-rules';

export { migrateCommandsTable } from '../../commands/app/db/migrate';

export async function migrateBotTimersTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS bot_timers (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			messages TEXT NOT NULL,
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
