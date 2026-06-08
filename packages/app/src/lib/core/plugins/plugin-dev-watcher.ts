import type { App } from '../app.svelte';
import type { InstalledPluginManifest } from './installed-plugin';

import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import { translate } from '$lib/i18n';

import { settings } from '../settings';
import { resolveEntryPath } from './plugin-loader';

let listenerInitialized = false;
let isReloading = false;

export async function initPluginDevWatcher(): Promise<void> {
	if (listenerInitialized) {
		return;
	}

	listenerInitialized = true;

	await listen<{ pluginKey: string }>('plugin-entry-changed', async () => {
		if (isReloading) {
			return;
		}

		isReloading = true;

		try {
			await invoke('open_devtools_if_needed');
		} catch (error) {
			console.warn('Failed to open devtools', error);
		}

		window.location.reload();
	});
}

export async function startPluginDevWatcher(
	pluginKey: string,
	manifest: Pick<InstalledPluginManifest, 'installPath' | 'entry'>
): Promise<boolean> {
	const entryPath = resolveEntryPath(manifest);

	try {
		await invoke('watch_plugin_entry', { pluginKey, entryPath });
		return true;
	} catch (error) {
		console.warn(`Failed to watch plugin entry for ${pluginKey}`, error);
		return false;
	}
}

export async function stopPluginDevWatcher(pluginKey: string): Promise<void> {
	try {
		await invoke('unwatch_plugin_entry', { pluginKey });
	} catch (error) {
		console.warn(`Failed to stop plugin entry watcher for ${pluginKey}`, error);
	}
}

export async function stopAllPluginDevWatchers(app: App): Promise<void> {
	for (const plugin of app.plugins.items) {
		if (plugin.source === 'installed') {
			await stopPluginDevWatcher(plugin.key);
		}
	}
}

export async function syncPluginDevWatchers(app: App): Promise<void> {
	await settings.ensureLoaded();

	if (!settings.developerMode) {
		await stopAllPluginDevWatchers(app);
		return;
	}

	const manifests = await invoke<InstalledPluginManifest[]>('list_installed_plugins');

	for (const plugin of app.plugins.items) {
		if (plugin.source !== 'installed') {
			continue;
		}

		const manifest = manifests.find((item) => item.key === plugin.key);

		if (!manifest) {
			await stopPluginDevWatcher(plugin.key);
			continue;
		}

		if (settings.isPluginDevMode(plugin.key)) {
			await startPluginDevWatcher(plugin.key, manifest);
		} else {
			await stopPluginDevWatcher(plugin.key);
		}
	}
}

export async function setPluginDevMode(
	app: App,
	pluginKey: string,
	enabled: boolean,
	manifest: Pick<InstalledPluginManifest, 'installPath' | 'entry'> | undefined
): Promise<void> {
	if (!settings.developerMode || !enabled) {
		await settings.setPluginDevMode(pluginKey, enabled);
		await stopPluginDevWatcher(pluginKey);
		return;
	}

	if (!manifest) {
		app.toast.create({
			title: translate('Plugin could not be loaded'),
			description: translate('{name} could not be loaded.', { name: pluginKey }),
			variant: 'warning'
		});
		return;
	}

	await settings.setPluginDevMode(pluginKey, enabled);

	const started = await startPluginDevWatcher(pluginKey, manifest);

	if (!started) {
		app.toast.create({
			title: translate('Plugin could not be loaded'),
			description: translate('Plugin entry file not found.'),
			variant: 'warning'
		});
		await settings.setPluginDevMode(pluginKey, false);
	}
}
