import { LazyStore } from '@tauri-apps/plugin-store';

import {
	createDefaultApiServerSettings,
	type ApiServerBind,
	type ApiServerSettings
} from './types';

const SETTINGS_KEY = 'apiServer';

const store = new LazyStore('app.settings.json');

function normalizeSettings(value: Partial<ApiServerSettings> | undefined): ApiServerSettings {
	const defaults = createDefaultApiServerSettings();
	const bind = value?.bind === '0.0.0.0' || value?.bind === '127.0.0.1' ? value.bind : defaults.bind;
	const port =
		typeof value?.port === 'number' && Number.isFinite(value.port) && value.port > 0
			? Math.floor(value.port)
			: defaults.port;

	return {
		enabled: Boolean(value?.enabled),
		port,
		bind: bind as ApiServerBind,
		token: typeof value?.token === 'string' ? value.token : defaults.token
	};
}

export async function loadApiServerSettings(): Promise<ApiServerSettings> {
	const stored = await store.get<Partial<ApiServerSettings>>(SETTINGS_KEY);
	return normalizeSettings(stored);
}

export async function saveApiServerSettings(settings: ApiServerSettings): Promise<void> {
	await store.set(SETTINGS_KEY, normalizeSettings(settings));
}
