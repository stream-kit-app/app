import type { PluginAppApi } from '@stream-kit/plugin';

import type { ChatModerationContext } from './moderation-engine';

type TwitchChatMessageContext = {
	broadcasterId: string;
	channel: string;
	user: string;
	userId: string;
	message: string;
	role: string;
	msg: {
		id?: string;
	};
};

type TwitchPluginApi = {
	readonly subscribe?: (listener: () => void) => () => void;
	subscribeChatMessages?: (
		filter: (context: TwitchChatMessageContext) => boolean,
		handler: (context: TwitchChatMessageContext) => void
	) => () => void;
};

type YouTubeChatContext = {
	channelId: string;
	channel: string;
	liveChatId: string;
	user: string;
	userId: string;
	message: string;
	role: string;
	raw?: { id?: string };
};

type YouTubePluginApi = {
	subscribeChatMessages?: (
		filter: (context: YouTubeChatContext) => boolean,
		handler: (context: YouTubeChatContext) => void
	) => () => void;
};

export function subscribeChatMessages(
	app: PluginAppApi,
	handler: (context: ChatModerationContext) => void
): () => void {
	const cleanups: Array<() => void> = [];
	let twitchMessageCleanup: (() => void) | undefined;

	function bindTwitchMessages(): void {
		twitchMessageCleanup?.();
		twitchMessageCleanup = undefined;

		const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

		if (!twitch?.subscribeChatMessages) {
			return;
		}

		twitchMessageCleanup = twitch.subscribeChatMessages(
			() => true,
			(context) => {
				handler({
					source: 'twitch',
					user: context.user,
					userId: context.userId,
					message: context.message,
					role: context.role,
					channel: context.channel,
					broadcasterId: context.broadcasterId,
					messageId: context.msg.id
				});
			}
		);
	}

	bindTwitchMessages();

	const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

	if (twitch?.subscribe) {
		cleanups.push(
			twitch.subscribe(() => {
				bindTwitchMessages();
			})
		);
	}

	cleanups.push(() => twitchMessageCleanup?.());

	const youtube = app.plugins.tryGet<YouTubePluginApi>('youtube');

	if (youtube?.subscribeChatMessages) {
		cleanups.push(
			youtube.subscribeChatMessages(
				() => true,
				(context) => {
					handler({
						source: 'youtube',
						user: context.user,
						userId: context.userId,
						message: context.message,
						role: context.role,
						channel: context.channel,
						channelId: context.channelId,
						liveChatId: context.liveChatId,
						messageId: context.raw?.id
					});
				}
			)
		);
	}

	return () => {
		for (const cleanup of cleanups) {
			cleanup();
		}
	};
}
