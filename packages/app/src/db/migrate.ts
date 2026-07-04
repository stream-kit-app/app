import type Database from '@tauri-apps/plugin-sql';

import {
	migrateStoredActionHandlers,
	migrateStoredActionTriggers
} from './migrate-maps-to-collections';

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

// tauri-plugin-sql runs each execute() on a pooled connection, so BEGIN/COMMIT
// cannot reliably span calls. Instead of dropping the table first, rename it to
// a backup and only drop the backup once the rebuilt table is fully populated,
// so a crash mid-migration never destroys data.
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
		console.warn('Skipping corrupt JSON value during migration', error);
		return fallback;
	}
}

async function createActionsTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS actions (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			"group" TEXT NOT NULL DEFAULT 'default',
			group_sort_order INTEGER NOT NULL DEFAULT 0,
			sort_order INTEGER NOT NULL DEFAULT 0,
			triggers TEXT NOT NULL,
			handlers TEXT NOT NULL,
			enabled INTEGER NOT NULL DEFAULT 1,
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

async function migrateAddEnabledColumn(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(actions)');

	if (!columns.some((column) => column.name === 'enabled')) {
		await sqlite.execute(`ALTER TABLE actions ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1`);
	}
}

type ActionSortRow = {
	id: number;
	group: string;
};

async function migrateAddSortOrderColumns(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(actions)');
	const hasGroupSortOrder = columns.some((column) => column.name === 'group_sort_order');
	const hasSortOrder = columns.some((column) => column.name === 'sort_order');

	if (!hasGroupSortOrder) {
		await sqlite.execute(
			`ALTER TABLE actions ADD COLUMN group_sort_order INTEGER NOT NULL DEFAULT 0`
		);
	}

	if (!hasSortOrder) {
		await sqlite.execute(
			`ALTER TABLE actions ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0`
		);
	}

	if (hasGroupSortOrder && hasSortOrder) {
		return;
	}

	const rows = await sqlite.select<ActionSortRow[]>(
		`SELECT id, "group" as "group" FROM actions ORDER BY id ASC`
	);

	const groupSortOrderByName = new Map<string, number>();
	let nextGroupSortOrder = 0;

	for (const row of rows) {
		if (!groupSortOrderByName.has(row.group)) {
			groupSortOrderByName.set(row.group, nextGroupSortOrder);
			nextGroupSortOrder += 1;
		}
	}

	const sortOrderByGroup = new Map<string, number>();

	for (const row of rows) {
		const groupSortOrder = groupSortOrderByName.get(row.group) ?? 0;
		const sortOrder = sortOrderByGroup.get(row.group) ?? 0;

		await sqlite.execute(
			`UPDATE actions SET group_sort_order = $1, sort_order = $2 WHERE id = $3`,
			[groupSortOrder, sortOrder, row.id]
		);

		sortOrderByGroup.set(row.group, sortOrder + 1);
	}
}

async function migrateFromTriggerTypeId(sqlite: Database): Promise<void> {
	const legacyRows = await sqlite.select<LegacyTriggerTypeIdRow[]>('SELECT * FROM actions');

	await replaceTableWithBackup(
		sqlite,
		'actions',
		() => createActionsTable(sqlite),
		async () => {
			for (const row of legacyRows) {
				const triggers = JSON.stringify([
					{
						id: crypto.randomUUID(),
						triggerTypeId: row.trigger_type_id,
						conditions: safeJsonParse<unknown>(row.conditions, {})
					}
				]);

				await sqlite.execute(
					`INSERT INTO actions (id, name, triggers, handlers, created_at, updated_at)
					 VALUES ($1, $2, $3, $4, $5, $6)`,
					[row.id, row.name, triggers, '[]', row.created_at, row.updated_at]
				);
			}
		}
	);
}

async function migrateFromSingularHandler(sqlite: Database): Promise<void> {
	const rows = await sqlite.select<SingularHandlerRow[]>('SELECT * FROM actions');

	await replaceTableWithBackup(
		sqlite,
		'actions',
		() => createActionsTable(sqlite),
		async () => {
			for (const row of rows) {
				const parsedHandler = row.handler
					? safeJsonParse<Record<string, unknown>>(row.handler, {})
					: null;
				const handlers = parsedHandler
					? JSON.stringify([
							{
								id: crypto.randomUUID(),
								...parsedHandler
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
	);
}

async function migrateActionsTable(sqlite: Database): Promise<void> {
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
	await migrateAddEnabledColumn(sqlite);
	await migrateAddSortOrderColumns(sqlite);
}

async function createOverlaysTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS overlays (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			template TEXT NOT NULL DEFAULT 'blank',
			config TEXT NOT NULL DEFAULT '{}',
			version INTEGER NOT NULL DEFAULT 0,
			expected_events TEXT NOT NULL DEFAULT '[]',
			required_plugins TEXT NOT NULL DEFAULT '[]',
			installed_action_keys TEXT NOT NULL DEFAULT '[]',
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)
	`);
}

async function migrateOverlaysVersionColumn(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(overlays)');

	if (columns.some((column) => column.name === 'version')) {
		return;
	}

	if (columns.some((column) => column.name === 'settings_schema_version')) {
		await sqlite.execute('ALTER TABLE overlays RENAME COLUMN settings_schema_version TO version');
		return;
	}

	await sqlite.execute('ALTER TABLE overlays ADD COLUMN version INTEGER NOT NULL DEFAULT 0');
}

async function migrateOverlaysRemoveDimensions(sqlite: Database): Promise<void> {
	await replaceTableWithBackup(
		sqlite,
		'overlays',
		() => createOverlaysTable(sqlite),
		async () => {
			const rows = await sqlite.select<
				Array<{
					id: string;
					name: string;
					template: string;
					config: string;
					expected_events: string;
					created_at: number;
					updated_at: number;
				}>
			>(
				`SELECT id, name, template, config, expected_events, created_at, updated_at
				 FROM overlays_migration_backup`
			);

			for (const row of rows) {
				await sqlite.execute(
					`INSERT INTO overlays (id, name, template, config, expected_events, created_at, updated_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
					[
						row.id,
						row.name,
						row.template,
						row.config,
						row.expected_events,
						row.created_at,
						row.updated_at
					]
				);
			}
		}
	);
}

async function migrateOverlaysTable(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(overlays)');

	if (columns.length === 0) {
		await createOverlaysTable(sqlite);
		return;
	}

	if (columns.some((column) => column.name === 'width')) {
		await migrateOverlaysRemoveDimensions(sqlite);
	}

	await migrateOverlaysVersionColumn(sqlite);
	await migrateOverlaysPresetColumns(sqlite);
}

async function migrateOverlaysPresetColumns(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(overlays)');

	if (!columns.some((column) => column.name === 'required_plugins')) {
		await sqlite.execute(
			"ALTER TABLE overlays ADD COLUMN required_plugins TEXT NOT NULL DEFAULT '[]'"
		);
	}

	if (!columns.some((column) => column.name === 'installed_action_keys')) {
		await sqlite.execute(
			"ALTER TABLE overlays ADD COLUMN installed_action_keys TEXT NOT NULL DEFAULT '[]'"
		);
	}
}

async function createActionQueuesTable(sqlite: Database): Promise<void> {
	await sqlite.execute(`
		CREATE TABLE IF NOT EXISTS action_queues (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			concurrency INTEGER NOT NULL DEFAULT 1,
			max_length INTEGER,
			sort_order INTEGER NOT NULL DEFAULT 0,
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)
	`);
}

async function addActionsQueueIdColumn(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(actions)');

	if (!columns.some((column) => column.name === 'queue_id')) {
		await sqlite.execute('ALTER TABLE actions ADD COLUMN queue_id INTEGER');
	}
}

const DEFAULT_ACTION_QUEUE_NAME = 'default';

async function ensureDefaultActionQueue(sqlite: Database): Promise<number> {
	const rows = await sqlite.select<Array<{ id: number }>>(
		`SELECT id FROM action_queues WHERE name = $1 LIMIT 1`,
		[DEFAULT_ACTION_QUEUE_NAME]
	);

	if (rows[0]) {
		return rows[0].id;
	}

	const now = Date.now();

	await sqlite.execute(
		`INSERT INTO action_queues (name, concurrency, max_length, sort_order, created_at, updated_at)
		 VALUES ($1, 1, NULL, 0, $2, $2)`,
		[DEFAULT_ACTION_QUEUE_NAME, now]
	);

	const created = await sqlite.select<Array<{ id: number }>>(
		`SELECT id FROM action_queues WHERE name = $1 LIMIT 1`,
		[DEFAULT_ACTION_QUEUE_NAME]
	);

	if (!created[0]) {
		throw new Error('Failed to create default action queue during migration');
	}

	return created[0].id;
}

async function assignUnqueuedActionsToDefault(sqlite: Database): Promise<void> {
	const defaultQueueId = await ensureDefaultActionQueue(sqlite);

	await sqlite.execute(`UPDATE actions SET queue_id = $1 WHERE queue_id IS NULL`, [
		defaultQueueId
	]);
}

async function migrateDashboardWidgetsTable(sqlite: Database): Promise<void> {
	const columns = await sqlite.select<Array<{ name: string }>>(
		'PRAGMA table_info(dashboard_widgets)'
	);

	if (columns.length === 0) {
		await sqlite.execute(`
			CREATE TABLE IF NOT EXISTS dashboard_widgets (
				id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
				definition_id TEXT NOT NULL,
				columns INTEGER NOT NULL DEFAULT 1,
				sort_order INTEGER NOT NULL DEFAULT 0,
				created_at INTEGER NOT NULL,
				updated_at INTEGER NOT NULL
			)
		`);
	}
}

async function migrateMapsToCollections(sqlite: Database): Promise<void> {
	const dashboardColumns = await sqlite.select<Array<{ name: string }>>(
		'PRAGMA table_info(dashboard_widgets)'
	);

	if (dashboardColumns.length > 0) {
		await sqlite.execute(
			`UPDATE dashboard_widgets SET definition_id = 'core:collections' WHERE definition_id = 'core:maps'`
		);
	}

	const actionColumns = await sqlite.select<Array<{ name: string }>>('PRAGMA table_info(actions)');

	if (actionColumns.length === 0) {
		return;
	}

	const rows = await sqlite.select<Array<{ id: number; triggers: string; handlers: string }>>(
		'SELECT id, triggers, handlers FROM actions'
	);

	for (const row of rows) {
		const triggers = migrateStoredActionTriggers(row.triggers);
		const handlers = migrateStoredActionHandlers(row.handlers);

		if (triggers !== row.triggers || handlers !== row.handlers) {
			await sqlite.execute('UPDATE actions SET triggers = $1, handlers = $2 WHERE id = $3', [
				triggers,
				handlers,
				row.id
			]);
		}
	}
}

export async function migrate(sqlite: Database): Promise<void> {
	await migrateActionsTable(sqlite);
	await migrateOverlaysTable(sqlite);
	await createActionQueuesTable(sqlite);
	await addActionsQueueIdColumn(sqlite);
	await assignUnqueuedActionsToDefault(sqlite);
	await migrateDashboardWidgetsTable(sqlite);
	await migrateMapsToCollections(sqlite);
}
