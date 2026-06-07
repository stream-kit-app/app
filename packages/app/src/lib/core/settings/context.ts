import type { App } from '../app.svelte';
import type { SettingsFieldValue } from './field';
import type { LazyStore } from '@tauri-apps/plugin-store';

export type SettingsContext<TSettings extends LazyStore = LazyStore> = {
	app: App;
	settings: TSettings;
	getValue: (key: string) => SettingsFieldValue | undefined;
};

export type SettingsVisibilityContext = SettingsContext;
