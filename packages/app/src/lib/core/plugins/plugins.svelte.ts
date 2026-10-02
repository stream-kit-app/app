import { LazyStore } from '@tauri-apps/plugin-store';

import type { App } from '../app.svelte';
import type { RegisterPluginOptions } from './installed-plugin';
import type { PluginAppApi } from './plugin-app-api.types';
import type { PluginPublicApi } from './types';

import { translate } from '$lib/i18n';

import { createPluginAppApi } from './app-api';
import { sortByDependencies } from './plugin-order';
import { parsePluginRegistration } from './registration';
import { RegisteredPlugin } from './registered-plugin.svelte';

const LEGACY_PLUGIN_STORE_PATHS: Record<string, string[]> = {
	tts: ['tts-streamelements.json']
};

export class Plugins {
	items: RegisteredPlugin[] = $state.raw([]);

	// Building the plugin app API is expensive (~150 bound functions); build it once per plugin.
	#appApis = new Map<string, PluginAppApi>();

	register<TApi = PluginPublicApi>(
		props: unknown,
		options: RegisterPluginOptions = {}
	): RegisteredPlugin<TApi> {
		const key = options.key;

		if (!key) {
			throw new Error('Plugin registration requires an install key');
		}

		const registration = parsePluginRegistration<TApi>(props);

		if (!registration.ok) {
			throw new Error(`Plugin "${key}" returned an invalid registration: ${registration.error}`);
		}

		if (this.find(key)) {
			throw new Error(`Plugin with key ${key} already exists`);
		}

		const store = new LazyStore(`plugin.${key}.json`);
		const legacyStores = (LEGACY_PLUGIN_STORE_PATHS[key] ?? []).map(
			(path) => new LazyStore(path)
		);
		const plugin = new RegisteredPlugin<TApi>(
			key,
			registration.value,
			store,
			legacyStores,
			options
		);
		this.items = [...this.items, plugin];

		return plugin;
	}

	remove(key: string): void {
		this.items = this.items.filter((plugin) => plugin.key !== key);
		this.#appApis.delete(key);
	}

	/** The app API for a plugin, or the unscoped API when no key is given. */
	appApi(app: App, key?: string): PluginAppApi {
		const cacheKey = key ?? '';
		let api = this.#appApis.get(cacheKey);

		if (!api) {
			api = createPluginAppApi(app, key ? { pluginKey: key } : undefined);
			this.#appApis.set(cacheKey, api);
		}

		return api;
	}

	async loadPlugin(app: App, key: string): Promise<void> {
		const plugin = this.find(key);

		if (!plugin) {
			throw new Error(`Plugin with key ${key} is not registered`);
		}

		await this.#runPhase(app, plugin, 'load');
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
		for (const plugin of this.#ordered()) {
			await this.#runPhase(app, plugin, 'load');
		}
	}

	async boot(app: App): Promise<void> {
		for (const plugin of this.#ordered()) {
			await this.#runPhase(app, plugin, 'boot');
		}
	}

	async ready(app: App): Promise<void> {
		for (const plugin of this.#ordered()) {
			await this.#runPhase(app, plugin, 'ready');
		}
	}

	/** Dependencies first, so a plugin's dependencies have loaded and started before it does. */
	#ordered(): RegisteredPlugin[] {
		return sortByDependencies(this.items);
	}

	async #runPhase(app: App, plugin: RegisteredPlugin, phase: PluginPhase): Promise<void> {
		try {
			await plugin[phase](app);
		} catch (error) {
			console.warn(`Failed to ${phase} plugin ${plugin.key}`, error);
			app.toast.create({
				title: translate(
					phase === 'load' ? 'Plugin could not be loaded' : 'Plugin could not be started'
				),
				description: PHASE_ERROR_DESCRIPTIONS[phase](plugin.name),
				variant: 'warning'
			});
		}
	}
}

type PluginPhase = 'load' | 'boot' | 'ready';

const PHASE_ERROR_DESCRIPTIONS: Record<PluginPhase, (name: string) => string> = {
	load: (name) => translate('{name} could not be loaded.', { name }),
	boot: (name) => translate('{name} could not be started.', { name }),
	ready: (name) => translate('{name} could not finish starting.', { name })
};
