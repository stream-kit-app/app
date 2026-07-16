import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { resolveUserIdentity } from '../lib/extract-user';
import { getFieldValue, resolveFieldText } from '../lib/get-field-value';

type TwitchPluginApi = {
	chat?: { say(channel: string, message: string): void };
	sendChatMessageAsBot?: (broadcasterId: string, message: string) => Promise<void>;
};

export function createSendRankMessageHandler(app: PluginAppApi, rankings: RankingsService) {
	return {
		name: 'Send rank message',
		fields: [
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: '@{username} you are {rank} in {tier} with {points} points.'
			},
			{
				type: 'switch',
				name: 'As bot',
				placeholder: 'Send as bot account'
			}
		],
		execute: async (_action, handler, context, next) => {
			const identity = resolveUserIdentity(context.data);
			const data = context.data as Record<string, unknown> | undefined;
			const channel = typeof data?.channel === 'string' ? data.channel : undefined;
			const broadcasterId =
				typeof data?.broadcasterId === 'string' ? data.broadcasterId : undefined;
			const templateValue = getFieldValue(handler.fields, 'message');
			const template = typeof templateValue === 'string' ? templateValue : '';
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;

			if (!identity || !template.trim()) {
				next();
				return;
			}

			await rankings.canonicalizeUserIdentity(identity);

			const message = rankings.formatRankMessage(identity.userId, template.trim(), {
				username: identity.username
			});
			const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

			if (asBot && broadcasterId && twitch?.sendChatMessageAsBot) {
				void twitch.sendChatMessageAsBot(broadcasterId, message);
			} else if (channel && twitch?.chat) {
				twitch.chat.say(channel, message);
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
}

export function createLeaderboardMessageHandler(app: PluginAppApi, rankings: RankingsService) {
	return {
		name: 'Send leaderboard message',
		fields: [
			{
				type: 'text',
				name: 'Prefix',
				placeholder: 'Top users:'
			},
			{
				type: 'switch',
				name: 'As bot',
				placeholder: 'Send as bot account'
			}
		],
		execute: async (_action, handler, context, next) => {
			const data = context.data as Record<string, unknown> | undefined;
			const channel = typeof data?.channel === 'string' ? data.channel : undefined;
			const broadcasterId =
				typeof data?.broadcasterId === 'string' ? data.broadcasterId : undefined;
			const prefix = resolveFieldText(handler.fields, 'prefix', context.data).trim();
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const leaderboard = rankings.formatLeaderboardMessage();
			const message = prefix ? `${prefix} ${leaderboard}` : leaderboard;
			const twitch = app.plugins.tryGet<TwitchPluginApi>('twitch');

			if (asBot && broadcasterId && twitch?.sendChatMessageAsBot) {
				void twitch.sendChatMessageAsBot(broadcasterId, message);
			} else if (channel && twitch?.chat) {
				twitch.chat.say(channel, message);
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
}
