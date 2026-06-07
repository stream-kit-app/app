import type { Store } from './store.svelte';

import { app } from './app-init';
import { store } from './store.svelte';

export type { App, Plugin } from './app.svelte';
export { app, store, type Store };
