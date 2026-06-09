import type { App } from '../app.svelte';
import type { InstalledPluginManifest } from './installed-plugin';
import type { Plugin } from './types';

import { convertFileSrc, invoke } from '@tauri-apps/api/core';

import { translate } from '$lib/i18n';

import { settings } from '../settings';
import { stopPluginDevWatcher } from './plugin-dev-watcher';

let importMapReady = false;

function getPluginHostUrl(fileName: string): string {
	return new URL(`/plugin-host/${fileName}`, window.location.origin).href;
}

async function ensurePluginImportMap(): Promise<void> {
	if (importMapReady) {
		return;
	}

	const script = document.createElement('script');
	script.type = 'importmap';
	script.id = 'stream-kit-plugin-import-map';
	script.textContent = JSON.stringify({
		imports: {
			'@stream-kit/app/api': getPluginHostUrl('app-api.js'),
			'@stream-kit/core': getPluginHostUrl('core.js')
		}
	});
	document.head.prepend(script);

	await new Promise<void>((resolve) => {
		requestAnimationFrame(() => resolve());
	});

	importMapReady = true;
}

export function resolveEntryPath(
	manifest: Pick<InstalledPluginManifest, 'installPath' | 'entry'>
): string {
	const installPath = manifest.installPath.replace(/\\/g, '/');
	const entry = manifest.entry.replace(/\\/g, '/');

	if (entry.startsWith('/') || /^[a-zA-Z]:/.test(entry)) {
		return entry;
	}

	return `${installPath}/${entry}`.replace(/\/+/g, '/');
}

export async function loadInstalledPluginModule(
	manifest: InstalledPluginManifest
): Promise<Plugin> {
	await ensurePluginImportMap();

	const entryPath = resolveEntryPath(manifest);
	const url = new URL(convertFileSrc(entryPath));
	url.searchParams.set('streamKitPluginLoad', `${manifest.key}-${manifest.version}-${Date.now()}`);
	const module = await import(/* @vite-ignore */ url.href);
	const plugin = module.default;

	if (typeof plugin !== 'function') {
		throw new Error(`Plugin "${manifest.key}" must export a default function`);
	}

	return plugin;
}

export async function discoverAndLoadInstalledPlugins(app: App): Promise<void> {
	const manifests = await invoke<InstalledPluginManifest[]>('list_installed_plugins');

	for (const manifest of manifests) {
		if (app.plugins.find(manifest.key)) {
			continue;
		}

		try {
			const pluginFactory = await loadInstalledPluginModule(manifest);
			await app.use(pluginFactory, {
				key: manifest.key,
				source: 'installed',
				installPath: manifest.installPath,
				version: manifest.version
			});
		} catch (error) {
			console.warn(`Failed to load installed plugin ${manifest.key}`, error);
			app.toast.create({
				title: translate('Plugin could not be loaded'),
				description:
					error instanceof Error
						? translate('{name}: {error}', {
								name: manifest.name,
								error: error.message
							})
						: translate('{name} could not be loaded.', { name: manifest.name }),
				variant: 'warning'
			});
		}
	}
}

export async function installPluginFromZip(
	app: App,
	zipPath: string,
	replaceExisting = false
): Promise<InstalledPluginManifest> {
	const manifest = await invoke<InstalledPluginManifest>('install_plugin_zip', {
		zipPath,
		replaceExisting
	});

	if (app.plugins.find(manifest.key)) {
		app.plugins.remove(manifest.key);
	}

	const pluginFactory = await loadInstalledPluginModule(manifest);
	await app.use(pluginFactory, {
		key: manifest.key,
		source: 'installed',
		installPath: manifest.installPath,
		version: manifest.version
	});
	await app.plugins.loadPlugin(app, manifest.key);

	return manifest;
}

export async function uninstallInstalledPlugin(app: App, key: string): Promise<void> {
	const plugin = app.plugins.find(key);

	if (!plugin || plugin.source !== 'installed') {
		throw new Error(`Plugin "${key}" is not an installed plugin`);
	}

	if (plugin.isEnabled) {
		await plugin.setEnabled(app, false);
	}

	await stopPluginDevWatcher(key);
	await settings.clearPluginDevMode(key);

	await invoke('uninstall_plugin', { key });
	app.plugins.remove(key);
}
