import { LazyStore } from '@tauri-apps/plugin-store';

import type { App } from '../app.svelte';
import type { PluginRegistration, PluginPublicApi } from './types';

import { RegisteredPlugin } from './registered-plugin.svelte';

const LEGACY_PLUGIN_STORE_PATHS: Record<string, string[]> = {
	tts: ['tts-streamelements.json']
};

export class Plugins {
	items: RegisteredPlugin[] = $state.raw([]);

	register<TApi = PluginPublicApi>(props: PluginRegistration<TApi>): RegisteredPlugin<TApi> {
		if (this.find(props.key)) {
			throw new Error(`Plugin with key ${props.key} already exists`);
		}

		const store = new LazyStore(`plugin.${props.key}.json`);
		const legacyStores = (LEGACY_PLUGIN_STORE_PATHS[props.key] ?? []).map(
			(path) => new LazyStore(path)
		);
		const plugin = new RegisteredPlugin<TApi>(props, store, legacyStores);
		this.items = [...this.items, plugin];

		return plugin;
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
					title: 'Plugin kon niet geladen worden',
					description: `${plugin.name} kon niet geladen worden.`,
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
					title: 'Plugin kon niet gestart worden',
					description: `${plugin.name} kon niet gestart worden.`,
					variant: 'warning'
				});
			}
		}
	}
}
