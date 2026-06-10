import { App } from './app.svelte';
import { registerApp } from './registry';

export const app = new App();
registerApp(app);
