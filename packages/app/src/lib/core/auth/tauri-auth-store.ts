import { AsyncAuthStore } from 'pocketbase';
import { LazyStore } from '@tauri-apps/plugin-store';

const AUTH_STORE_FILE = 'app.auth.json';
const AUTH_STORE_KEY = 'pocketbase';

const store = new LazyStore(AUTH_STORE_FILE);

/**
 * Persist the PocketBase session in the Tauri store so plugins cannot read
 * the auth token from `localStorage` (same-origin plugin modules share the window).
 *
 * Awaits the initial payload so `authStore.isValid` is correct immediately after construction.
 */
export async function createTauriAuthStore(): Promise<AsyncAuthStore> {
	const initial = (await store.get<string>(AUTH_STORE_KEY)) ?? '';

	return new AsyncAuthStore({
		save: async (serialized) => {
			await store.set(AUTH_STORE_KEY, serialized);
		},
		clear: async () => {
			await store.delete(AUTH_STORE_KEY);
		},
		initial
	});
}
