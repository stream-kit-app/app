import type { App } from '../app.svelte';
import type { InstalledPluginManifest } from './installed-plugin';
import type { Plugin } from './types';

import { convertFileSrc, invoke } from '@tauri-apps/api/core';

import { translate } from '$lib/i18n';

import { stopPluginDevWatcher } from './plugin-dev-watcher';
import { getPluginHostUrl } from './plugin-host-url';
import {
	PLUGIN_HOST_SVELTE_SUBPATHS,
	PLUGIN_HOST_UI_SUBPATHS
} from '../../../../plugin-host-modules.generated.js';

let importMapReady = false;

function createPluginHostImportMap(): Record<string, string> {
	const imports: Record<string, string> = {
		'@stream-kit/plugin': getPluginHostUrl('plugin.js'),
		'@stream-kit/plugin/action': getPluginHostUrl('action.js'),
		'@stream-kit/core': getPluginHostUrl('core.js'),
		'@iconify/svelte': getPluginHostUrl('@iconify/svelte.js'),
		svelte: getPluginHostUrl('svelte.js'),
		runed: getPluginHostUrl('runed.js')
	};

	for (const subpath of PLUGIN_HOST_SVELTE_SUBPATHS) {
		imports[`svelte/${subpath}`] = getPluginHostUrl(`svelte/${subpath}.js`);
	}

	for (const subpath of PLUGIN_HOST_UI_SUBPATHS) {
		imports[`@stream-kit/ui/${subpath}`] = getPluginHostUrl(`@stream-kit/ui/${subpath}.js`);
	}

	return imports;
}

async function ensurePluginImportMap(): Promise<void> {
	if (importMapReady) {
		return;
	}

	const script = document.createElement('script');
	script.type = 'importmap';
	script.id = 'stream-kit-plugin-import-map';
	script.textContent = JSON.stringify({
		imports: createPluginHostImportMap()
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
	url.searchParams.set(
		'streamKitPluginLoad',
		`${manifest.key}-${manifest.version}-${Date.now()}`
	);
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

export async function reloadInstalledPlugin(
	app: App,
	manifest: InstalledPluginManifest
): Promise<void> {
	const existing = app.plugins.find(manifest.key);
	const wasEnabled = existing?.isEnabled ?? false;

	if (existing) {
		await existing.teardown(app);
		await stopPluginDevWatcher(manifest.key);
		app.plugins.remove(manifest.key);
	}

	try {
		const pluginFactory = await loadInstalledPluginModule(manifest);
		await app.use(pluginFactory, {
			key: manifest.key,
			source: 'installed',
			installPath: manifest.installPath,
			version: manifest.version
		});
		await app.plugins.loadPlugin(app, manifest.key);

		const plugin = app.plugins.find(manifest.key);

		if (plugin && wasEnabled) {
			await plugin.boot(app);
			await plugin.ready(app);
		}

		await app.actions.load();
	} catch (error) {
		app.plugins.remove(manifest.key);
		await invoke('uninstall_plugin', { key: manifest.key }).catch(() => undefined);
		throw error;
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

	await reloadInstalledPlugin(app, manifest);

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

	plugin.removeDefinitions(app);

	await stopPluginDevWatcher(key);
	await app.settings.clearPluginDevMode(key);

	await invoke('uninstall_plugin', { key });
	app.plugins.remove(key);
}
