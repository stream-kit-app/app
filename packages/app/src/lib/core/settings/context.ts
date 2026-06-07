import type { LazyStore } from '@tauri-apps/plugin-store';

import type { App } from '../app.svelte';

export type SettingsContext<TSettings extends LazyStore = LazyStore> = {
	app: App;
	settings: TSettings;
};
