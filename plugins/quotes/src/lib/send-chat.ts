import type { PluginAppApi } from '@stream-kit/plugin';

type TwitchPluginApi = {
	chat?: { say(channel: string, message: string): void };
	sendChatMessageAsBot?: (broadcasterId: string, message: string) => Promise<void>;
};

export function sendChatMessage(
	app: PluginAppApi,
	options: {
		message: string;
		channel?: string;
		broadcasterId?: string;
		asBot?: boolean;
	}
): void {
	const trimmed = options.message.trim();

	if (!trimmed) {
		return;
	}

	const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

	if (options.asBot && options.broadcasterId && twitch?.sendChatMessageAsBot) {
		void twitch.sendChatMessageAsBot(options.broadcasterId, trimmed);
		return;
	}

	if (options.channel && twitch?.chat) {
		twitch.chat.say(options.channel, trimmed);
	}
}
