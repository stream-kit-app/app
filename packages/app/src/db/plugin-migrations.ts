import type Database from '@tauri-apps/plugin-sql';

export type PluginMigration = (sqlite: Database) => Promise<void>;

const pluginMigrations = new Map<string, PluginMigration[]>();

export function registerPluginMigrations(pluginKey: string, migrations: PluginMigration[]): void {
	pluginMigrations.set(pluginKey, migrations);
}

/** Runs registered plugin migrations; all plugins, or only `pluginKey`. Migrations must be re-runnable. */
export async function runPluginMigrations(sqlite: Database, pluginKey?: string): Promise<void> {
	for (const [key, migrations] of pluginMigrations) {
		if (pluginKey && key !== pluginKey) {
			continue;
		}

		for (const migration of migrations) {
			try {
				await migration(sqlite);
			} catch (error) {
				console.error(`Plugin migration failed for ${key}`, error);
				throw error;
			}
		}
	}
}
