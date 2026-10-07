import { invoke } from '@tauri-apps/api/core';

/** Connection string the app database is loaded with (also the key of its Rust pool). */
export const APP_DB_URL = 'sqlite:app.db';

export type BatchStatement = {
	sql: string;
	params?: unknown[];
};

/**
 * Runs `statements` in a single SQLite transaction: all of them apply, or none do.
 * `tauri-plugin-sql` runs each `execute()` on a pooled connection, so BEGIN/COMMIT from
 * the frontend can't span statements; use this for multi-step writes that must not
 * half-apply when the app crashes or closes midway.
 */
export async function executeBatch(statements: BatchStatement[]): Promise<void> {
	if (statements.length === 0) {
		return;
	}

	await invoke('db_execute_batch', {
		db: APP_DB_URL,
		statements: statements.map((statement) => ({
			sql: statement.sql,
			params: statement.params ?? []
		}))
	});
}
