import { invoke } from '@tauri-apps/api/core';

import type { App } from '../app.svelte';
import type { InstalledPluginManifest } from '../plugins/installed-plugin';

import {
	createPluginRecord,
	listPluginRecords,
	updatePluginRecord
} from '$db/repositories/plugin-records';
import { translate } from '$lib/i18n';

const APP_PLUGIN_KEY = '__app__';
const INSTALLED_PLUGINS_COLLECTION = 'installedPlugins';

function pluginSyncId(key: string): string {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let h = 2166136261;
	const input = `installed:${key}`;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	let id = '';
	let n = h >>> 0;
	for (let i = 0; i < 15; i++) {
		id += alphabet[n % 36];
		n = Math.imul(n ^ (n >>> 16), 2246822507) >>> 0;
	}
	return id;
}

/** Push the local installed (zip) plugin catalog into synced plugin_records. */
export async function publishInstalledPluginsCatalog(_app: App): Promise<void> {
	const manifests = await invoke<InstalledPluginManifest[]>('list_installed_plugins');
	const existing = await listPluginRecords(APP_PLUGIN_KEY, INSTALLED_PLUGINS_COLLECTION);
	const existingByKey = new Map(
		existing.map((row) => {
			const payload =
				typeof row.payload === 'string'
					? (JSON.parse(row.payload) as { key?: string })
					: (row.payload as { key?: string });
			return [payload.key ?? row.syncId, row];
		})
	);

	for (const manifest of manifests) {
		const payload = {
			key: manifest.key,
			version: manifest.version,
			manifestUrl: manifest.updateManifestUrl ?? null,
			name: manifest.name
		};
		const found = existingByKey.get(manifest.key);
		if (found) {
			await updatePluginRecord(APP_PLUGIN_KEY, INSTALLED_PLUGINS_COLLECTION, found.syncId, {
				payload
			});
		} else {
			await createPluginRecord({
				pluginKey: APP_PLUGIN_KEY,
				collection: INSTALLED_PLUGINS_COLLECTION,
				syncId: pluginSyncId(manifest.key),
				payload
			});
		}
	}
}

/**
 * After sync on a new machine, download missing marketplace plugins listed in cloud catalog.
 */
export async function restoreMissingInstalledPlugins(app: App): Promise<void> {
	const catalog = await listPluginRecords(APP_PLUGIN_KEY, INSTALLED_PLUGINS_COLLECTION);
	if (catalog.length === 0) {
		return;
	}

	const installed = await invoke<InstalledPluginManifest[]>('list_installed_plugins');
	const installedKeys = new Set(installed.map((item) => item.key));

	for (const row of catalog) {
		const payload =
			typeof row.payload === 'string'
				? (JSON.parse(row.payload) as {
						key?: string;
						manifestUrl?: string | null;
					})
				: (row.payload as { key?: string; manifestUrl?: string | null });
		const key = payload.key;
		const manifestUrl =
			typeof payload.manifestUrl === 'string' ? payload.manifestUrl.trim() : '';
		if (!key || installedKeys.has(key) || !manifestUrl) {
			continue;
		}

		try {
			const { fetchRemotePluginManifest } = await import('../plugins/plugin-update');
			const { reloadInstalledPlugin } = await import('../plugins/plugin-loader');
			const remote = await fetchRemotePluginManifest(manifestUrl);
			const manifest = await invoke<InstalledPluginManifest>(
				'download_and_install_plugin_update',
				{
					downloadUrl: remote.downloadUrl,
					expectedKey: key,
					expectedSha256: remote.sha256 ?? null
				}
			);
			await reloadInstalledPlugin(app, manifest);
		} catch (error) {
			console.warn(`Failed to restore plugin "${key}"`, error);
			app.toast.create({
				title: translate('Plugin restore failed'),
				description: translate('Could not install "{key}" from the cloud catalog.', {
					key
				}),
				variant: 'error'
			});
		}
	}
}
