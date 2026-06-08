import { LazyStore } from '@tauri-apps/plugin-store';

import type { App } from '../app.svelte';
import type { RegisterPluginOptions } from './installed-plugin';
import type { PluginRegistration, PluginPublicApi } from './types';

import { translate } from '$lib/i18n';

import { RegisteredPlugin } from './registered-plugin.svelte';

const LEGACY_PLUGIN_STORE_PATHS: Record<string, string[]> = {
	tts: ['tts-streamelements.json']
};

export class Plugins {
	items: RegisteredPlugin[] = $state.raw([]);

	register<TApi = PluginPublicApi>(
		props: PluginRegistration<TApi>,
		options: RegisterPluginOptions = {}
	): RegisteredPlugin<TApi> {
		if (this.find(props.key)) {
			throw new Error(`Plugin with key ${props.key} already exists`);
		}

		const store = new LazyStore(`plugin.${props.key}.json`);
		const legacyStores = (LEGACY_PLUGIN_STORE_PATHS[props.key] ?? []).map(
			(path) => new LazyStore(path)
		);
		const plugin = new RegisteredPlugin<TApi>(props, store, legacyStores, options);
		this.items = [...this.items, plugin];

		return plugin;
	}

	remove(key: string): void {
		this.items = this.items.filter((plugin) => plugin.key !== key);
	}

	async loadPlugin(app: App, key: string): Promise<void> {
		const plugin = this.find(key);

		if (!plugin) {
			throw new Error(`Plugin with key ${key} is not registered`);
		}

		try {
			await plugin.load(app);
		} catch (error) {
			console.warn(`Failed to load plugin ${plugin.key}`, error);
			app.toast.create({
				title: translate('Plugin could not be loaded'),
				description: translate('{name} could not be loaded.', { name: plugin.name }),
				variant: 'warning'
			});
		}
	}

	find(key: string): RegisteredPlugin | undefined {
		return this.items.find((plugin) => plugin.key === key);
	}

	get<TApi>(key: string): TApi {
		const plugin = this.find(key);

		if (!plugin?.api) {
			throw new Error(`Plugin API ${key} is not registered`);
		}

		return plugin.api as TApi;
	}

	tryGet<TApi>(key: string): TApi | undefined {
		return this.find(key)?.api as TApi | undefined;
	}

	async load(app: App): Promise<void> {
		for (const plugin of this.items) {
			try {
				await plugin.load(app);
			} catch (error) {
				console.warn(`Failed to load plugin ${plugin.key}`, error);
				app.toast.create({
					title: translate('Plugin could not be loaded'),
					description: translate('{name} could not be loaded.', { name: plugin.name }),
					variant: 'warning'
				});
			}
		}
	}

	async boot(app: App): Promise<void> {
		for (const plugin of this.items) {
			try {
				await plugin.boot(app);
			} catch (error) {
				console.warn(`Failed to boot plugin ${plugin.key}`, error);
				app.toast.create({
					title: translate('Plugin could not be started'),
					description: translate('{name} could not be started.', { name: plugin.name }),
					variant: 'warning'
				});
			}
		}
	}
}
