import type { PluginAppApi } from '@stream-kit/plugin';

import type { BotPluginRegistrationApi } from './plugin-api';

type TwitchPluginApi = {
	readonly userId?: string;
	readonly botAccount: {
		readonly isConnected: boolean;
	};
	readonly chat?: {
		say(channel: string, message: string): Promise<void>;
	};
	sendChatMessageAsBot(broadcasterId: string, message: string): Promise<void>;
};

type YouTubePluginApi = {
	readonly liveChatId?: string;
	sendMessage(text: string): Promise<boolean>;
};

function shouldSendAsBot(app: PluginAppApi): boolean {
	const bot = app.plugins.tryGet<BotPluginRegistrationApi>('bot');

	return bot?.settings.sendAsBot ?? true;
}

export async function sendChatMessage(
	app: PluginAppApi,
	source: 'twitch' | 'youtube',
	context: {
		channel?: string;
		broadcasterId?: string;
		liveChatId?: string;
	},
	message: string
): Promise<void> {
	const trimmed = message.trim();

	if (!trimmed) {
		return;
	}

	if (source === 'youtube') {
		const youtube = app.plugins.tryGet<YouTubePluginApi>('youtube');

		if (!youtube) {
			return;
		}

		await youtube.sendMessage(trimmed);
		return;
	}

	const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

	if (!twitch) {
		return;
	}

	if (shouldSendAsBot(app) && context.broadcasterId) {
		await twitch.sendChatMessageAsBot(context.broadcasterId, trimmed);
		return;
	}

	if (context.channel && twitch.chat) {
		await twitch.chat.say(context.channel, trimmed);
	}
}
