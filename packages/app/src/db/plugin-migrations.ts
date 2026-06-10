import type Database from '@tauri-apps/plugin-sql';

export type PluginMigration = (sqlite: Database) => Promise<void>;

const pluginMigrations = new Map<string, PluginMigration[]>();

export function registerPluginMigrations(pluginKey: string, migrations: PluginMigration[]): void {
	pluginMigrations.set(pluginKey, migrations);
}

export async function runPluginMigrations(sqlite: Database): Promise<void> {
	for (const [pluginKey, migrations] of pluginMigrations) {
		for (const migration of migrations) {
			try {
				await migration(sqlite);
			} catch (error) {
				console.error(`Plugin migration failed for ${pluginKey}`, error);
				throw error;
			}
		}
	}
}
