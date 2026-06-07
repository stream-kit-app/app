import type { Store } from './store.svelte';

import { app } from './app-init';
import { store } from './store.svelte';

export type { App } from './app.svelte';
export type { Plugin } from './plugins';
export type {
	PluginAppApi,
	PluginPublicApi,
	PluginRegistration,
	PluginSettingsContext,
	PluginStore
} from './plugins';
export { Plugins, RegisteredPlugin } from './plugins';
export type { OAuthStartOptions } from './oauth';
export { OAuth } from './oauth';
export { Opener } from './opener';
export { app, store, type Store };
