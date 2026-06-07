import type Database from '@tauri-apps/plugin-sql';

type LegacyTriggerTypeIdRow = {
	id: number;
	trigger_type_id: string;
	name: string;
	conditions: string;
	created_at: number;
	updated_at: number;
};

type SingularHandlerRow = {
	id: number;
	name: string;
	triggers: string;
	handler: string | null;
	created_at: number;
	updated_at: number;
};

async function createActionsTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS actions (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			"group" TEXT NOT NULL DEFAULT 'default',
			triggers TEXT NOT NULL,
			handlers TEXT NOT NULL,
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)
	`);
}

async function migrateAddGroupColumn(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(actions)');

	if (!columns.some((column) => column.name === 'group')) {
		await sqlite.execute(
			`ALTER TABLE actions ADD COLUMN "group" TEXT NOT NULL DEFAULT 'default'`
		);
	}
}

async function migrateFromTriggerTypeId(sqlite: Database): Promise<void> {
	const legacyRows = await sqlite.select<LegacyTriggerTypeIdRow[]>('SELECT * FROM actions');

	await sqlite.execute('DROP TABLE actions');
	await createActionsTable(sqlite);

	for (const row of legacyRows) {
		const triggers = JSON.stringify([
			{
				id: crypto.randomUUID(),
				triggerTypeId: row.trigger_type_id,
				conditions: JSON.parse(row.conditions)
			}
		]);

		await sqlite.execute(
			`INSERT INTO actions (id, name, triggers, handlers, created_at, updated_at)
			 VALUES ($1, $2, $3, $4, $5, $6)`,
			[row.id, row.name, triggers, '[]', row.created_at, row.updated_at]
		);
	}
}

async function migrateFromSingularHandler(sqlite: Database): Promise<void> {
	const rows = await sqlite.select<SingularHandlerRow[]>('SELECT * FROM actions');

	await sqlite.execute('DROP TABLE actions');
	await createActionsTable(sqlite);

	for (const row of rows) {
		const handlers = row.handler
			? JSON.stringify([
					{
						id: crypto.randomUUID(),
						...JSON.parse(row.handler)
					}
				])
			: '[]';

		await sqlite.execute(
			`INSERT INTO actions (id, name, triggers, handlers, created_at, updated_at)
			 VALUES ($1, $2, $3, $4, $5, $6)`,
			[row.id, row.name, row.triggers, handlers, row.created_at, row.updated_at]
		);
	}
}

export async function migrate(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(actions)');

	if (columns.length === 0) {
		await createActionsTable(sqlite);
		return;
	}

	if (columns.some((column) => column.name === 'trigger_type_id')) {
		await migrateFromTriggerTypeId(sqlite);
	} else if (columns.some((column) => column.name === 'handler')) {
		await migrateFromSingularHandler(sqlite);
	}

	await migrateAddGroupColumn(sqlite);
}
