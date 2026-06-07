import Database from '@tauri-apps/plugin-sql';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

import { migrate } from './migrate';
import * as schema from './schemas';

const sqlite = await Database.load('sqlite:app.db');

await migrate(sqlite);

export const db = drizzle<typeof schema>(
	async (sql, params, method) => {
		if (returnsRows(sql)) {
			const rows = await sqlite.select<Record<string, unknown>[]>(sql, params);
			const values = rows.map((row) => Object.values(row));

			return { rows: method === 'get' ? values[0] : values };
		}

		await sqlite.execute(sql, params);

		return { rows: [] };
	},
	{ schema }
);

export { saveAction, getActions, getAction, getActionGroups } from './repositories/actions';
export type { SaveActionInput } from './repositories/actions';
export type { ActionRecord, NewActionRecord } from './schemas/actions';

function returnsRows(sql: string): boolean {
	return /^\s*select/i.test(sql) || /\breturning\b/i.test(sql);
}
