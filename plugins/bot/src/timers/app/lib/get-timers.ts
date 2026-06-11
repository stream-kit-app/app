import type { BotPluginRegistrationApi } from '../../../lib/plugin-api';

import { getApp } from '$lib/core/registry';

import type { Timers } from './timers.svelte';

export function getTimersService(): Timers {
	const api = getApp().plugins.tryGet<BotPluginRegistrationApi>('bot');

	if (!api?.timers) {
		throw new Error('Bot plugin is not loaded');
	}

	return api.timers;
}

export function tryGetTimersService(): Timers | undefined {
	return getApp().plugins.tryGet<BotPluginRegistrationApi>('bot')?.timers;
}
