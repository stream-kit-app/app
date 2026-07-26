import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { resolveUserIdentity } from '../lib/extract-user';
import { getFieldValue, resolveFieldText } from '../lib/get-field-value';
import { sendTwitchChatMessage } from '../lib/twitch-chat-target';

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

			const sent = await sendTwitchChatMessage(app, message, { asBot, data });

			if (!sent) {
				app.toast.create({
					title: 'Send rank message failed',
					description: 'Twitch is not connected, or no channel is available to send to.',
					variant: 'warning'
				});
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
			const prefix = resolveFieldText(handler.fields, 'prefix', context.data).trim();
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const leaderboard = rankings.formatLeaderboardMessage();
			const message = prefix ? `${prefix} ${leaderboard}` : leaderboard;

			const sent = await sendTwitchChatMessage(app, message, { asBot, data });

			if (!sent) {
				app.toast.create({
					title: 'Send leaderboard message failed',
					description: 'Twitch is not connected, or no channel is available to send to.',
					variant: 'warning'
				});
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
}
