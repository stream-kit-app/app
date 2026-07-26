import type { PluginAppApi } from '@stream-kit/plugin';

type TwitchPluginApi = {
	userId?: string;
	token?: { userName?: string | null };
	chat?: { say(channel: string, message: string): void };
	sendChatMessageAsBot?: (broadcasterId: string, message: string) => Promise<void>;
};

export type TwitchChatTarget = {
	channel?: string;
	broadcasterId?: string;
};

export function tryGetTwitch(app: PluginAppApi): TwitchPluginApi | undefined {
	return app.plugins.tryGet<TwitchPluginApi>('twitch');
}

/** Resolve channel / broadcaster from trigger data, falling back to the connected Twitch account. */
export function resolveTwitchChatTarget(
	app: PluginAppApi,
	data?: { channel?: unknown; broadcasterId?: unknown } | null
): TwitchChatTarget {
	const twitch = tryGetTwitch(app);
	const channelFromData = typeof data?.channel === 'string' ? data.channel.trim() : '';
	const broadcasterFromData =
		typeof data?.broadcasterId === 'string' ? data.broadcasterId.trim() : '';

	return {
		channel: channelFromData || twitch?.token?.userName || undefined,
		broadcasterId: broadcasterFromData || twitch?.userId || undefined
	};
}

export async function sendTwitchChatMessage(
	app: PluginAppApi,
	message: string,
	options: { asBot: boolean; data?: { channel?: unknown; broadcasterId?: unknown } | null }
): Promise<boolean> {
	const trimmed = message.trim();

	if (!trimmed) {
		return false;
	}

	const twitch = tryGetTwitch(app);
	const { channel, broadcasterId } = resolveTwitchChatTarget(app, options.data);

	if (options.asBot && broadcasterId && twitch?.sendChatMessageAsBot) {
		await twitch.sendChatMessageAsBot(broadcasterId, trimmed);
		return true;
	}

	if (channel && twitch?.chat) {
		twitch.chat.say(channel, trimmed);
		return true;
	}

	return false;
}
