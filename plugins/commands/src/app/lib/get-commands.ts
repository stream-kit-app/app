import type { CommandsPluginApi } from '$lib/core/plugins/app-api';

import { getApp } from '$lib/core/registry';

import type { Commands } from './commands.svelte';

export function getCommandsService(): Commands {
	const api = getApp().plugins.tryGet<CommandsPluginApi>('commands');

	if (!api?.commands) {
		throw new Error('Commands plugin is not loaded');
	}

	return api.commands as Commands;
}

export function tryGetCommandsService(): Commands | undefined {
	return getApp().plugins.tryGet<CommandsPluginApi>('commands')?.commands as Commands | undefined;
}
