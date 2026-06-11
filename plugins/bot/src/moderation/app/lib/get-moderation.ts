import type { BotPluginRegistrationApi } from '../../../lib/plugin-api';

import { getApp } from '$lib/core/registry';

import type { ModerationRules } from './moderation-rules.svelte';

export function getModerationService(): ModerationRules {
	const api = getApp().plugins.tryGet<BotPluginRegistrationApi>('bot');

	if (!api?.moderation) {
		throw new Error('Bot plugin is not loaded');
	}

	return api.moderation;
}

export function tryGetModerationService(): ModerationRules | undefined {
	return getApp().plugins.tryGet<BotPluginRegistrationApi>('bot')?.moderation;
}
