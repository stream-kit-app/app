import type { App } from './app.svelte';

let app: App | undefined;

export function registerApp(instance: App): void {
	app = instance;
}

export function getApp(): App {
	if (!app) {
		throw new Error('App has not been initialized yet');
	}

	return app;
}

export function tryGetApp(): App | undefined {
	return app;
}
