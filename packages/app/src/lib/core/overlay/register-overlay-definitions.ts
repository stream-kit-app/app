import type { App } from '../app.svelte';

import { registerOverlayHandlers } from './register-handlers';
import { registerOverlayTriggers } from './register-triggers';

type HandlerHostServices = {
	load(): Promise<void>;
	refreshDefinitionBindings(): Promise<void>;
};

async function refreshPluginHandlerBindings(app: App): Promise<void> {
	const bot = app.plugins.tryGet<{
		commands?: HandlerHostServices;
		timers?: HandlerHostServices;
	}>('bot');

	await Promise.all([
		bot?.commands?.refreshDefinitionBindings(),
		bot?.timers?.refreshDefinitionBindings()
	]);
}

export async function registerOverlayDefinitions(app: App): Promise<void> {
	registerOverlayHandlers(app);
	registerOverlayTriggers(app);
	app.actions.refreshDefinitionBindings();
	await refreshPluginHandlerBindings(app);
}