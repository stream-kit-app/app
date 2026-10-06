import { invoke } from '@tauri-apps/api/core';

import type { App } from '../app.svelte';
import type { InstalledPluginManifest } from '../plugins/installed-plugin';

import {
	createPluginRecord,
	deletePluginRecord,
	listPluginRecords,
	updatePluginRecord
} from '#db/repositories/plugin-records.js';
import { translate } from '#lib/i18n.js';

import { resolveSiteUrl } from '../overlay/overlay-cloud';

const APP_PLUGIN_KEY = '__app__';
const INSTALLED_PLUGINS_COLLECTION = 'installedPlugins';

type CatalogPayload = { key?: string; manifestUrl?: string | null; name?: string };

/** Keys the user declined to restore this session, so we don't ask after every sync. */
const declinedRestoreKeys = new Set<string>();

function readCatalogPayload(row: { payload: unknown }): CatalogPayload {
	return typeof row.payload === 'string'
		? (JSON.parse(row.payload) as CatalogPayload)
		: (row.payload as CatalogPayload);
}

/**
 * Only the Stream Kit marketplace endpoint is trusted for silent-free restores: its
 * manifest pins the download URL and SHA-256, so a synced record can't point a new
 * machine at arbitrary code.
 */
function isMarketplaceManifestUrl(manifestUrl: string, key: string): boolean {
	const site = resolveSiteUrl();
	if (!site) {
		return false;
	}

	try {
		const url = new URL(manifestUrl);
		const siteUrl = new URL(site);
		return (
			url.origin === siteUrl.origin &&
			url.pathname === `/api/plugins/${encodeURIComponent(key)}/manifest.json`
		);
	} catch {
		return false;
	}
}

/** Remove a plugin from the synced catalog so other machines don't reinstall it. */
export async function forgetInstalledPlugin(key: string): Promise<void> {
	const catalog = await listPluginRecords(APP_PLUGIN_KEY, INSTALLED_PLUGINS_COLLECTION);

	for (const row of catalog) {
		if (readCatalogPayload(row).key === key) {
			await deletePluginRecord(APP_PLUGIN_KEY, INSTALLED_PLUGINS_COLLECTION, row.syncId);
		}
	}
}

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
 * After sync on a new machine, offer to install missing marketplace plugins listed in
 * the cloud catalog. Nothing is installed without the user's consent.
 */
export async function restoreMissingInstalledPlugins(app: App): Promise<void> {
	const catalog = await listPluginRecords(APP_PLUGIN_KEY, INSTALLED_PLUGINS_COLLECTION);
	if (catalog.length === 0) {
		return;
	}

	const installed = await invoke<InstalledPluginManifest[]>('list_installed_plugins');
	const installedKeys = new Set(installed.map((item) => item.key));

	const restorable: Array<{ key: string; name: string; manifestUrl: string }> = [];
	const untrusted: string[] = [];

	for (const row of catalog) {
		const payload = readCatalogPayload(row);
		const key = payload.key;
		const manifestUrl =
			typeof payload.manifestUrl === 'string' ? payload.manifestUrl.trim() : '';
		if (!key || installedKeys.has(key) || !manifestUrl || declinedRestoreKeys.has(key)) {
			continue;
		}

		const name = payload.name?.trim() || key;
		if (isMarketplaceManifestUrl(manifestUrl, key)) {
			restorable.push({ key, name, manifestUrl });
		} else {
			untrusted.push(name);
			declinedRestoreKeys.add(key);
		}
	}

	if (untrusted.length > 0) {
		app.toast.create({
			title: translate('Some plugins were not restored'),
			description: translate(
				'{plugins} did not come from the Stream Kit marketplace. Reinstall them manually if you trust the source.',
				{ plugins: untrusted.join(', ') }
			),
			variant: 'warning'
		});
	}

	if (restorable.length === 0) {
		return;
	}

	const confirmed = await app.confirm.ask({
		title: translate('Install plugins from your account?'),
		description: translate(
			'Your account has plugins that are not installed on this computer: {plugins}. Plugins run with full access to Stream Kit and your system.',
			{ plugins: restorable.map((item) => item.name).join(', ') }
		),
		confirmLabel: translate('Install'),
		cancelLabel: translate('Not now')
	});

	if (!confirmed) {
		for (const item of restorable) {
			declinedRestoreKeys.add(item.key);
		}
		return;
	}

	const { fetchRemotePluginManifest } = await import('../plugins/plugin-update');
	const { reloadInstalledPlugin } = await import('../plugins/plugin-loader');

	for (const { key, manifestUrl } of restorable) {
		try {
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
