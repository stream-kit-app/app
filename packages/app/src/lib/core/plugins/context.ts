import type { SettingsFieldValue } from '../settings';
import type { PluginAppApi } from './app-api';
import type { PluginStore } from './store';

export type PluginSettingsContext = {
	app: PluginAppApi;
	store: PluginStore;
	settings: PluginStore;
	getValue: (key: string) => SettingsFieldValue | undefined;
};
