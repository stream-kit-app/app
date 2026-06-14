import { initDb, runRegisteredPluginMigrations } from '$db';

import { app } from './app-init';
import { registerOverlayHandlers } from './overlay/register-handlers';
import { initPluginDevWatcher, syncPluginDevWatchers } from './plugins/plugin-dev-watcher';
import { discoverAndLoadInstalledPlugins } from './plugins/plugin-loader';
import { linkWorkspaceDevPlugins } from './plugins/plugin-dev-link';

let bootPromise: Promise<void> | null = null;

export function bootApp(): Promise<void> {
	if (!bootPromise) {
		// Cache only a resolved boot so a failed boot can be retried instead of
		// permanently returning the same rejected promise.
		bootPromise = runBoot().catch((error) => {
			bootPromise = null;
			throw error;
		});
	}

	return bootPromise;
}

async function runBoot(): Promise<void> {
	await initDb();

	if (import.meta.env.DEV) {
		await linkWorkspaceDevPlugins(import.meta.env.VITE_STREAM_KIT_WORKSPACE_ROOT);
	}

	await discoverAndLoadInstalledPlugins(app);

	// Plugins register their migrations during `app.use`, so run them only after
	// every plugin has been loaded and before any plugin touches the database.
	await runRegisteredPluginMigrations();

	await app.plugins.load(app);
	await app.boot();
	await app.overlay.init();
	registerOverlayHandlers(app);
	await app.actions.load();
	await app.plugins.ready(app);
	app.lifecycle.emitStarted();
	await app.settings.load();

	if (app.settings.checkPluginUpdatesOnStartup) {
		const { pluginUpdates } = await import('./plugins/plugin-updates.svelte');
		void pluginUpdates.check(true);
	}

	await initPluginDevWatcher();
	await syncPluginDevWatchers(app);
}
