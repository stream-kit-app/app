import type Database from '@tauri-apps/plugin-sql';

type LegacyCommandRow = {
	id: number;
	name: string;
	command: string;
	aliases: string;
	action_ids: string;
	sources: string;
	permissions: string;
	cooldown_global_ms: number | null;
	cooldown_user_ms: number | null;
	enabled: number;
	created_at: number;
	updated_at: number;
};

function normalizeLegacyCommandName(value: string): string {
	return value.trim().replace(/^!+/, '').toLowerCase();
}

// tauri-plugin-sql pools connections, so BEGIN/COMMIT cannot reliably span
// execute() calls. Rename the old table to a backup and only drop it once the
// rebuilt table is fully populated, so a crash never destroys data.
async function replaceTableWithBackup(
	sqlite: Database,
	table: string,
	create: () => Promise<void>,
	fill: () => Promise<void>
): Promise<void> {
	const backup = `${table}_migration_backup`;

	await sqlite.execute(`DROP TABLE IF EXISTS "${backup}"`);
	await sqlite.execute(`ALTER TABLE "${table}" RENAME TO "${backup}"`);
	await create();
	await fill();
	await sqlite.execute(`DROP TABLE IF EXISTS "${backup}"`);
}

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
	if (typeof value !== 'string' || value.trim() === '') {
		return fallback;
	}

	try {
		return JSON.parse(value) as T;
	} catch (error) {
		console.warn('Skipping corrupt JSON value during commands migration', error);
		return fallback;
	}
}

async function createCommandsTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS commands (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			command_names TEXT NOT NULL,
			handlers TEXT NOT NULL,
			sources TEXT NOT NULL,
			permissions TEXT NOT NULL,
			cooldown_global_ms INTEGER,
			cooldown_user_ms INTEGER,
			enabled INTEGER NOT NULL DEFAULT 1,
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)
	`);
}

export async function migrateCommandsTable(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(commands)');

	if (columns.length === 0) {
		await createCommandsTable(sqlite);
		return;
	}

	if (!columns.some((column: { name: string }) => column.name === 'command')) {
		return;
	}

	const rows = await sqlite.select<LegacyCommandRow[]>('SELECT * FROM commands');

	await replaceTableWithBackup(
		sqlite,
		'commands',
		() => createCommandsTable(sqlite),
		async () => {
			for (const row of rows) {
				const aliases = safeJsonParse<string[]>(row.aliases, []);
				const commandNames = [
					normalizeLegacyCommandName(row.command),
					...aliases.map(normalizeLegacyCommandName)
				].filter(Boolean);
				const uniqueCommandNames = [...new Set(commandNames)];

				await sqlite.execute(
					`INSERT INTO commands (
						id, name, command_names, handlers, sources, permissions,
						cooldown_global_ms, cooldown_user_ms, enabled, created_at, updated_at
					) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
					[
						row.id,
						row.name,
						JSON.stringify(uniqueCommandNames),
						'[]',
						row.sources,
						row.permissions,
						row.cooldown_global_ms,
						row.cooldown_user_ms,
						row.enabled,
						row.created_at,
						row.updated_at
					]
				);
			}
		}
	);
}
