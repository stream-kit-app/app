import type { PluginAppApi } from '@stream-kit/app/api';

import { createCooldownTracker } from './cooldown';
import { executeCommand } from './execute-command';
import { findMatchingCommand } from './match-command';
import { parseCommand } from './parse-command';

type TwitchPluginApi = {
	chat?: {
		onMessage: (
			handler: (
				channel: string,
				user: string,
				text: string,
				msg: {
					channelId?: string;
					userInfo: {
						userId?: string;
						isMod: boolean;
						isBroadcaster: boolean;
						isVip: boolean;
						isSubscriber: boolean;
						isArtist: boolean;
						isFounder: boolean;
					};
				}
			) => void
		) => { unbind(): void };
	};
};

type YouTubePluginApi = {
	subscribeChatMessages: (
		filter: (context: YouTubeChatContext) => boolean,
		handler: (context: YouTubeChatContext) => void
	) => () => void;
};

type YouTubeChatContext = {
	channelId: string;
	channel: string;
	liveChatId: string;
	broadcastId: string;
	user: string;
	userId: string;
	message: string;
	role: string;
};

function resolveTwitchRole(msg: {
	userInfo: {
		isMod: boolean;
		isBroadcaster: boolean;
		isVip: boolean;
		isSubscriber: boolean;
		isArtist: boolean;
		isFounder: boolean;
	};
}): string {
	if (msg.userInfo.isArtist) {
		return 'artist';
	}

	if (msg.userInfo.isFounder) {
		return 'founder';
	}

	if (msg.userInfo.isMod) {
		return 'mod';
	}

	if (msg.userInfo.isBroadcaster) {
		return 'broadcaster';
	}

	if (msg.userInfo.isVip) {
		return 'vip';
	}

	if (msg.userInfo.isSubscriber) {
		return 'subscriber';
	}

	return 'user';
}

function handleChatMessage(
	app: PluginAppApi,
	source: 'twitch' | 'youtube',
	context: {
		user: string;
		userId: string;
		message: string;
		role: string;
		channel?: string;
		broadcasterId?: string;
		channelId?: string;
		liveChatId?: string;
		broadcastId?: string;
	},
	cooldownState: ReturnType<typeof createCooldownTracker>
): void {
	const commandName = parseCommand(context.message);

	if (!commandName) {
		return;
	}

	const command = findMatchingCommand(app.commands.getSnapshot(), commandName);

	if (!command) {
		return;
	}

	executeCommand(
		app,
		command,
		{
			...context,
			command: commandName
		},
		source,
		cooldownState
	);
}

export function createChatRuntime(app: PluginAppApi): () => void {
	const cooldownState = createCooldownTracker();
	const cleanups: Array<() => void> = [];

	const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

	if (twitch?.chat) {
		const listener = twitch.chat.onMessage((channel, user, text, msg) => {
			handleChatMessage(
				app,
				'twitch',
				{
					user,
					userId: msg.userInfo.userId ?? '',
					message: text,
					role: resolveTwitchRole(msg),
					channel,
					broadcasterId: msg.channelId ?? ''
				},
				cooldownState
			);
		});

		cleanups.push(() => listener.unbind());
	}

	const youtube = app.plugins.tryGet<YouTubePluginApi>('youtube');

	if (youtube?.subscribeChatMessages) {
		const unsubscribe = youtube.subscribeChatMessages(
			(context) => parseCommand(context.message) != null,
			(context) => {
				handleChatMessage(
					app,
					'youtube',
					{
						user: context.user,
						userId: context.userId,
						message: context.message,
						role: context.role,
						channel: context.channel,
						channelId: context.channelId,
						liveChatId: context.liveChatId,
						broadcastId: context.broadcastId
					},
					cooldownState
				);
			}
		);

		cleanups.push(unsubscribe);
	}

	return () => {
		for (const cleanup of cleanups) {
			cleanup();
		}
	};
}
