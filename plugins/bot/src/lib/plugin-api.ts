import type { PluginAppApi } from '@stream-kit/plugin';

import type { BotSettings } from '../settings/bot-settings';
import type { Commands } from '../commands/app/lib/commands.svelte';
import type { ModerationRules } from '../moderation/app/lib/moderation-rules.svelte';
import type { Timers } from '../timers/app/lib/timers.svelte';

export type BotPluginRegistrationApi = {
	commands: Commands;
	timers: Timers;
	moderation: ModerationRules;
	settings: BotSettings;
};

export function getBotApi(app: PluginAppApi): BotPluginRegistrationApi {
	const api = app.plugins.get<BotPluginRegistrationApi>('bot');

	if (!api?.commands) {
		throw new Error('Bot plugin is not loaded');
	}

	return api;
}
