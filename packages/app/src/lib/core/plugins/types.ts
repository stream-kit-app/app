import type { Component } from 'svelte';

import type { HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinitionProps } from '../action/trigger';
import type {
	SettingsFieldDefinition,
	SettingsFieldSectionDefinition
} from '../settings';
import type { PluginAppApi } from './app-api';
import type { PluginSettingsContext } from './context';
import type {
	PageBlock,
	PageButtonClickHandler,
	PageDefinition,
	PageFormBlock,
	PageFormField,
	PageFormItem,
	PageFormSection
} from '@stream-kit/ui/blocks/types';

export type PluginPublicApi = unknown;

/**
 * Plugin entry point. Receives the app API and returns a registration object.
 *
 * @example
 * ```ts
 * import type { Plugin } from '@stream-kit/app/api';
 *
 * const plugin: Plugin = (app) => ({
 *   name: 'My Plugin',
 *   onBoot: async ({ store }) => {
 *     await store.set('initialized', true);
 *   }
 * });
 *
 * export default plugin;
 * ```
 */
export type Plugin = (
	app: PluginAppApi
) => PluginRegistration | Promise<PluginRegistration>;

export type PluginPageBlock = PageBlock;
export type PluginPageDefinition = PageDefinition;
export type PluginPageFormBlock = PageFormBlock;
export type PluginPageFormField = PageFormField;
export type PluginPageFormItem = PageFormItem;
export type PluginPageFormSection = PageFormSection;
export type PluginPageButtonClickHandler = PageButtonClickHandler;
export type PluginSettingsFieldDefinition = SettingsFieldDefinition extends infer Field
	? Field extends { key: string }
		? Omit<Field, 'key'>
		: Field
	: never;
export type PluginSettingsFieldSectionDefinition = Omit<
	SettingsFieldSectionDefinition,
	'fields'
> & {
	fields: PluginSettingsFieldDefinition[];
};
export type PluginSettingsFieldItem =
	| PluginSettingsFieldDefinition
	| PluginSettingsFieldSectionDefinition;

export type PluginMenuItemChildDefinition = {
	title: string;
	page: PluginPageDefinition;
	children?: never;
};

export type PluginMenuItemDefinition =
	| {
			title: string;
			icon: string;
			page: PluginPageDefinition;
			children?: never;
	  }
	| {
			title: string;
			icon: string;
			page?: never;
			children: PluginMenuItemChildDefinition[];
	  };

export type PluginRegistration<TApi = PluginPublicApi> = {
	name: string;
	description?: string;
	icon?: string;
	dependencies?: string[];
	triggers?: TriggerDefinitionProps<any>[];
	handlers?: HandlerDefinitionProps[];
	menuItems?: PluginMenuItemDefinition[];
	settings?: PluginSettingsFieldItem[];
	customViews?: Record<string, Component>;
	api?: TApi;

	/**
	 * Called when the app checks whether required settings are filled in.
	 * Return `true` when the plugin is ready to use.
	 *
	 * @example
	 * ```ts
	 * isConfigured: ({ getValue }) => Boolean(getValue('apiKey'))
	 * ```
	 */
	isConfigured?: (context: PluginSettingsContext) => boolean;

	/**
	 * Called after plugin settings are read from the plugin store during app startup.
	 * Runs before {@link PluginRegistration.onBoot}. Use this to hydrate in-memory state from persisted settings.
	 *
	 * @example
	 * ```ts
	 * onLoad: async ({ app }) => {
	 *   await commands.load();
	 * }
	 * ```
	 */
	onLoad?: (context: PluginSettingsContext) => void | Promise<void>;

	/**
	 * Called after plugin settings are written to the plugin store.
	 * Use this to apply new configuration (reconnect, sync state, etc.).
	 *
	 * @example
	 * ```ts
	 * onSave: async ({ app, getValue }) => {
	 *   await reconnect(getValue('host'));
	 *   app.toast.create({ title: 'Settings saved', variant: 'success' });
	 * }
	 * ```
	 */
	onSave?: (context: PluginSettingsContext) => void | Promise<void>;

	/**
	 * Called the first time the plugin starts while enabled and all dependencies are satisfied.
	 * Use this to initialize services, register runtimes, and connect to external systems.
	 *
	 * @example
	 * ```ts
	 * onBoot: async ({ store, getValue }) => {
	 *   controller = createController(app);
	 *   await controller.boot(store);
	 *   syncGetValue(getValue);
	 * }
	 * ```
	 */
	onBoot?: (context: PluginSettingsContext) => void | Promise<void>;

	/**
	 * Called after all plugins have booted and actions are loaded.
	 * Use this for work that depends on the full app being ready (e.g. auto-connect).
	 *
	 * @example
	 * ```ts
	 * onReady: async () => {
	 *   await controller?.connectAutoConnect();
	 * }
	 * ```
	 */
	onReady?: (context: PluginSettingsContext) => void | Promise<void>;

	/**
	 * Called when the user enables the plugin.
	 * Runs after {@link PluginRegistration.onBoot} on first enable, or on subsequent toggles after boot.
	 *
	 * @example
	 * ```ts
	 * onEnable: async ({ getValue }) => {
	 *   syncGetValue(getValue);
	 *   await api?.connect();
	 * }
	 * ```
	 */
	onEnable?: (context: PluginSettingsContext) => void | Promise<void>;

	/**
	 * Called when the user disables the plugin, before triggers and handlers are unregistered.
	 * Use this to disconnect, stop listeners, and release resources.
	 *
	 * @example
	 * ```ts
	 * onDisable: async () => {
	 *   await controller?.disconnectAll();
	 * }
	 * ```
	 */
	onDisable?: (context: PluginSettingsContext) => void | Promise<void>;
};
