import Database from '@tauri-apps/plugin-sql';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

import { migrate } from './migrate';
import { runPluginMigrations } from './plugin-migrations';
import * as schema from './schemas';

let sqlite: Database | undefined;

export let db: ReturnType<typeof createDb>;

function createDb(connection: Database) {
	return drizzle<typeof schema>(
		async (sql, params, method) => {
			if (returnsRows(sql)) {
				const rows = await connection.select<Record<string, unknown>[]>(sql, params);
				const values = rows.map((row) => Object.values(row));

				return { rows: method === 'get' ? values[0] : values };
			}

			await connection.execute(sql, params);

			return { rows: [] };
		},
		{ schema }
	);
}

export async function initDb(): Promise<void> {
	if (sqlite) {
		return;
	}

	const connection = await Database.load('sqlite:app.db');
	await migrate(connection);

	sqlite = connection;
	db = createDb(connection);
}

export async function runRegisteredPluginMigrations(): Promise<void> {
	if (!sqlite) {
		throw new Error('Database has not been initialized');
	}

	await runPluginMigrations(sqlite);
}

export {
	saveAction,
	getActions,
	getAction,
	getActionGroups,
	updateActionsQueue
} from './repositories/actions';
export type { SaveActionInput } from './repositories/actions';
export type { ActionRecord, NewActionRecord } from './schemas/actions';
export {
	getActionQueues,
	getActionQueue,
	getDefaultActionQueue,
	getDefaultActionQueueId,
	ensureDefaultActionQueue,
	saveActionQueue,
	deleteActionQueue,
	isDefaultActionQueue,
	normalizeConcurrency,
	normalizeMaxLength,
	DEFAULT_ACTION_QUEUE_NAME
} from './repositories/action-queues';
export type { ActionQueueRecord, SaveActionQueueInput } from './repositories/action-queues';

function returnsRows(sql: string): boolean {
	return /^\s*select/i.test(sql) || /\breturning\b/i.test(sql);
}
