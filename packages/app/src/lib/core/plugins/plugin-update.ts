import type { App } from '../app.svelte';
import type { InstalledPluginManifest } from './installed-plugin';

import { invoke } from '@tauri-apps/api/core';
import semver from 'semver';

import { translate } from '$lib/i18n';

import { reloadInstalledPlugin } from './plugin-loader';

function isViteDev(): boolean {
	return Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);
}

export type RemotePluginManifest = {
	key: string;
	name: string;
	version: string;
	description?: string;
	icon?: string;
	entry: string;
	dependencies: string[];
	streamKitVersion?: string;
	updateManifestUrl?: string;
	downloadUrl?: string;
	sha256?: string;
};

export type PluginUpdateInfo = {
	key: string;
	installedVersion: string;
	availableVersion: string;
	downloadUrl: string;
	sha256?: string;
	description?: string;
};

export function canCheckForUpdates(manifest: InstalledPluginManifest): boolean {
	return Boolean(manifest.updateManifestUrl);
}

export function canApplyPluginUpdates(): boolean {
	return !isViteDev();
}

export function isUpdateAvailable(installedVersion: string, remoteVersion: string): boolean {
	const installedValue = installedVersion.trim();
	const remoteValue = remoteVersion.trim();

	if (semver.valid(installedValue) && semver.valid(remoteValue)) {
		return semver.gt(remoteValue, installedValue);
	}

	const installed = semver.coerce(installedValue);
	const remote = semver.coerce(remoteValue);

	if (!installed || !remote) {
		return remoteValue !== installedValue;
	}

	return semver.gt(remote, installed);
}

export async function fetchRemotePluginManifest(
	manifestUrl: string
): Promise<RemotePluginManifest> {
	return invoke<RemotePluginManifest>('fetch_plugin_manifest', { manifestUrl });
}

export async function checkPluginUpdate(
	installed: InstalledPluginManifest
): Promise<PluginUpdateInfo | null> {
	if (!canCheckForUpdates(installed) || !installed.updateManifestUrl) {
		return null;
	}

	const remote = await fetchRemotePluginManifest(installed.updateManifestUrl);

	if (remote.key !== installed.key) {
		throw new Error(
			translate("Remote manifest key '{remote}' does not match installed plugin '{installed}'.", {
				remote: remote.key,
				installed: installed.key
			})
		);
	}

	if (!isUpdateAvailable(installed.version, remote.version)) {
		return null;
	}

	if (!remote.downloadUrl) {
		throw new Error(
			translate('Remote manifest for {name} is missing downloadUrl.', { name: remote.name })
		);
	}

	return {
		key: installed.key,
		installedVersion: installed.version,
		availableVersion: remote.version,
		downloadUrl: remote.downloadUrl,
		sha256: remote.sha256,
		description: remote.description
	};
}

export async function checkAllPluginUpdates(
	installed: InstalledPluginManifest[]
): Promise<PluginUpdateInfo[]> {
	const updates: PluginUpdateInfo[] = [];

	for (const manifest of installed) {
		if (!canCheckForUpdates(manifest)) {
			if (isViteDev()) {
				console.debug(
					`Skipped update check for ${manifest.key}: missing updateManifestUrl`
				);
			}
			continue;
		}

		try {
			const update = await checkPluginUpdate(manifest);

			if (update) {
				updates.push(update);
			} else if (isViteDev()) {
				console.debug(
					`No update for ${manifest.key}: installed v${manifest.version} is current`
				);
			}
		} catch (error) {
			console.warn(`Failed to check updates for plugin ${manifest.key}`, error);
		}
	}

	return updates;
}

export async function applyPluginUpdate(app: App, update: PluginUpdateInfo): Promise<void> {
	if (!canApplyPluginUpdates()) {
		throw new Error(
			translate('Plugin updates cannot be installed while Stream Kit is running in development mode.')
		);
	}

	const manifest = await invoke<InstalledPluginManifest>('download_and_install_plugin_update', {
		downloadUrl: update.downloadUrl,
		expectedKey: update.key,
		expectedSha256: update.sha256 ?? null
	});

	await reloadInstalledPlugin(app, manifest);
}
