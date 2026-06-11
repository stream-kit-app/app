import type { LazyStore } from '@tauri-apps/plugin-store';

/**
 * Persistent key-value store for a single plugin.
 * Backed by a Tauri store file (`plugin.{key}.json`).
 *
 * @example
 * ```ts
 * onBoot: async ({ store }) => {
 *   const cached = await store.get<string>('connections');
 *   if (cached) hydrate(JSON.parse(cached));
 *   await store.set('bootedAt', Date.now());
 * }
 * ```
 */
export type PluginStore = {
	/**
	 * Read a value by key. Returns `undefined` when the key is not set.
	 *
	 * @example
	 * ```ts
	 * const token = await store.get<string>('accessToken');
	 * ```
	 */
	get<T>(key: string): Promise<T | undefined>;

	/**
	 * Write a value by key.
	 *
	 * @example
	 * ```ts
	 * await store.set('lastSync', new Date().toISOString());
	 * ```
	 */
	set<T>(key: string, value: T): Promise<void>;

	/**
	 * Delete a key from the store.
	 *
	 * @example
	 * ```ts
	 * await store.delete('temporaryToken');
	 * ```
	 */
	delete(key: string): Promise<void>;

	/**
	 * Remove all keys from the plugin store.
	 */
	clear(): Promise<void>;

	/**
	 * Return all key-value pairs as a plain object.
	 *
	 * @example
	 * ```ts
	 * const all = await store.entries();
	 * console.log(Object.keys(all));
	 * ```
	 */
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
