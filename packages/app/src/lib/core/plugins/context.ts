import type { SettingsFieldValue } from '../settings';
import type { PluginAppApi } from './app-api';
import type { PluginStore } from './store';

/**
 * Context passed to plugin lifecycle callbacks and `isConfigured`.
 *
 * @example
 * ```ts
 * onSave: async ({ app, store, getValue }) => {
 *   const url = getValue('url');
 *   await store.set('lastSavedUrl', url);
 *   app.toast.create({ title: 'Saved', variant: 'success' });
 * }
 * ```
 */
export type PluginSettingsContext = {
	/** App APIs available to plugin authors (toast, fs, other plugins, etc.). */
	app: PluginAppApi;

	/** Persistent key-value store scoped to this plugin. */
	store: PluginStore;

	/** Alias for {@link PluginSettingsContext.store}. */
	settings: PluginStore;

	/**
	 * Read a settings field value by key from the current in-memory settings form.
	 *
	 * @example
	 * ```ts
	 * const host = getValue('host');
	 * ```
	 */
	getValue: (key: string) => SettingsFieldValue | undefined;
};
