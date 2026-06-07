import type { LazyStore } from '@tauri-apps/plugin-store';

import type { App } from '../app.svelte';

import type { SettingsFieldValue } from './field';

export type SettingsContext<TSettings extends LazyStore = LazyStore> = {
	app: App;
	settings: TSettings;
	getValue: (key: string) => SettingsFieldValue | undefined;
};

/** @deprecated Use SettingsContext — both include getValue for form state. */
export type SettingsVisibilityContext<TSettings extends LazyStore = LazyStore> =
	SettingsContext<TSettings>;
