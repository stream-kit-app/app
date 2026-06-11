import type { BotPluginApi } from '$lib/core/plugins/app-api';

import { getApp } from '$lib/core/registry';

import type { Commands } from './commands.svelte';

export function getCommandsService(): Commands {
	const api = getApp().plugins.tryGet<BotPluginApi>('bot');

	if (!api?.commands) {
		throw new Error('Bot plugin is not loaded');
	}

	return api.commands as Commands;
}

export function tryGetCommandsService(): Commands | undefined {
	return getApp().plugins.tryGet<BotPluginApi>('bot')?.commands as Commands | undefined;
}
