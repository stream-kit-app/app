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
 * import type { Plugin } from '@stream-kit/plugin';
 *
 * const plugin: Plugin = (app) => ({
 *   name: 'My Plugin',
 *   onEnable: async ({ store }) => {
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
		? Omit<Field, 'key'> & { key?: string }
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

/** Props passed to custom Svelte views registered in {@link PluginRegistration.customViews}. */
export type PluginCustomViewProps = {
	/** App API for toasts, filesystem, and other host services. */
	app: PluginAppApi;
	/** Optional page title shown in the view chrome. */
	title?: string;
	/** Optional page description shown below the title. */
	description?: string;
};

export type PluginWidgetColumns = 1 | 2 | 3 | 4;

/** Props passed to dashboard widget Svelte components. */
export type PluginWidgetProps = {
	/** App API for toasts, filesystem, and other host services. */
	app: PluginAppApi;
};

/** Dashboard widget registered by a plugin. */
export type PluginWidgetDefinition = {
	/** Stable widget key unique within the plugin. */
	key: string;
	/** Widget title shown on the dashboard. */
	title: string;
	/** Optional short description. */
	description?: string;
	/** Remix icon name (for example `ri:plug-line`). */
	icon?: string;
	/** Grid column span on the dashboard (1–4). */
	columns?: PluginWidgetColumns;
	/** Svelte component name registered in the plugin bundle. */
	view: string;
};

/** Nested sidebar menu item with its own page. */
export type PluginMenuItemChildDefinition = {
	/** Child item label. */
	title: string;
	/** Declarative page definition rendered when selected. */
	page: PluginPageDefinition;
	children?: never;
};

/** Sidebar menu entry with either a page or nested children. */
export type PluginMenuItemDefinition =
	| {
			/** Menu item label. */
			title: string;
			/** Remix icon name. */
			icon: string;
			/** Declarative page definition rendered when selected. */
			page: PluginPageDefinition;
			children?: never;
	  }
	| {
			/** Menu item label for a parent with sub-items. */
			title: string;
			/** Remix icon name. */
			icon: string;
			page?: never;
			/** Nested menu items. */
			children: PluginMenuItemChildDefinition[];
	  };

/**
 * Object returned from a plugin entry function. Registers triggers, handlers, UI, and lifecycle hooks.
 */
export type PluginRegistration<TApi = PluginPublicApi> = {
	/** Display name shown in the plugin list and UI. */
	name: string;
	/** Short description for the plugin list. */
	description?: string;
	/** Remix icon name for the plugin list and sidebar. */
	icon?: string;
	/** Plugin keys that must be enabled before this plugin can run. */
	dependencies?: string[];
	/** Trigger definitions users can attach to actions. */
	triggers?: TriggerDefinitionProps<any>[];
	/** Handler definitions users can attach to actions. */
	handlers?: HandlerDefinitionProps[];
	/** Static sidebar menu items declared at registration time. */
	menuItems?: PluginMenuItemDefinition[];
	/** Dashboard widgets declared at registration time. */
	widgets?: PluginWidgetDefinition[];
	/** Plugin settings fields shown on the plugin settings page. */
	settings?: PluginSettingsFieldItem[];
	/** Named Svelte components for custom views (built-in npm plugins). */
	customViews?: Record<string, Component>;
	/** Public API surface exposed to other plugins via `app.plugins.get`. */
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
	 * Runs before {@link PluginRegistration.onEnable}. Use this to hydrate in-memory state from persisted settings.
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
	 * Called when the plugin is enabled and all dependencies are satisfied.
	 * Runs during app startup for enabled plugins and when the user toggles the plugin on.
	 * Use this to initialize services, register runtimes, and connect to external systems.
	 *
	 * @example
	 * ```ts
	 * onEnable: async ({ store, getValue }) => {
	 *   controller = createController(app);
	 *   await controller.boot(store);
	 *   syncGetValue(getValue);
	 * }
	 * ```
	 */
	onEnable?: (context: PluginSettingsContext) => void | Promise<void>;

	/**
	 * Called after all plugins have enabled and actions are loaded.
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
