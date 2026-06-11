import type { PluginAppApi } from '@stream-kit/app/api';

type TwitchPluginApi = {
	readonly userId?: string;
	readonly client?: {
		chat: {
			sendChatMessageAsApp(
				senderId: string,
				broadcasterId: string,
				message: string
			): Promise<void>;
		};
	};
	readonly chat?: {
		say(channel: string, message: string): Promise<void>;
	};
};

type YouTubePluginApi = {
	readonly liveChatId?: string;
	sendMessage(text: string): Promise<boolean>;
};

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

	if (!twitch?.chat) {
		return;
	}

	if (twitch.userId && twitch.client && context.broadcasterId) {
		await twitch.client.chat.sendChatMessageAsApp(
			twitch.userId,
			context.broadcasterId,
			trimmed
		);
		return;
	}

	if (context.channel) {
		await twitch.chat.say(context.channel, trimmed);
	}
}
