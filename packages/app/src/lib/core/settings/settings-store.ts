import { LazyStore } from '@tauri-apps/plugin-store';

const LOCALE_KEY = 'locale';
const DEVELOPER_MODE_KEY = 'developerMode';
const PLUGIN_DEV_MODE_KEY = 'pluginDevMode';

const store = new LazyStore('app.settings.json');

export async function getSavedLocale(): Promise<string | undefined> {
	return store.get<string>(LOCALE_KEY);
}

export async function saveLocale(locale: string): Promise<void> {
	await store.set(LOCALE_KEY, locale);
}

export async function getDeveloperMode(): Promise<boolean> {
	return (await store.get<boolean>(DEVELOPER_MODE_KEY)) ?? false;
}

export async function saveDeveloperMode(enabled: boolean): Promise<void> {
	await store.set(DEVELOPER_MODE_KEY, enabled);
}

export async function getPluginDevModes(): Promise<Record<string, boolean>> {
	return (await store.get<Record<string, boolean>>(PLUGIN_DEV_MODE_KEY)) ?? {};
}

export async function setPluginDevMode(
	pluginKey: string,
	enabled: boolean
): Promise<Record<string, boolean>> {
	const modes = await getPluginDevModes();

	if (enabled) {
		modes[pluginKey] = true;
	} else {
		delete modes[pluginKey];
	}

	await store.set(PLUGIN_DEV_MODE_KEY, modes);

	return modes;
}

export async function clearPluginDevModes(): Promise<void> {
	await store.set(PLUGIN_DEV_MODE_KEY, {});
}

export async function removePluginDevMode(pluginKey: string): Promise<void> {
	await setPluginDevMode(pluginKey, false);
}
