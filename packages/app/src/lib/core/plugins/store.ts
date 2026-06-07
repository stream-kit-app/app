import type { LazyStore } from '@tauri-apps/plugin-store';

export type PluginStore = {
	get<T>(key: string): Promise<T | undefined>;
	set<T>(key: string, value: T): Promise<void>;
	delete(key: string): Promise<void>;
	clear(): Promise<void>;
	entries(): Promise<Record<string, unknown>>;
};

export function createPluginStore(store: LazyStore): PluginStore {
	return {
		get: <T>(key: string) => store.get<T>(key),
		set: <T>(key: string, value: T) => store.set(key, value),
		delete: async (key: string) => {
			await store.delete(key);
		},
		clear: () => store.clear(),
		entries: async () => Object.fromEntries(await store.entries<unknown>())
	};
}
