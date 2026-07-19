import type { PluginAppApi, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { MessageReceivedContext } from '../../contexts';
import {
	evaluateMessageMatch,
	evaluateOptionalEquals,
	evaluateUserMatch,
	messageMatchCondition,
	textEqualsCondition,
	userMatchCondition
} from '../../lib/conditions';
import { DISCORD_EVENTS, onDiscordEvent } from '../../lib/event-hub';
import { createTestMessageReceivedContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { MESSAGE_TEXT_VARIABLES } from '../../lib/variables';

export const createMessageReceivedTrigger = (app: PluginAppApi) =>
	({
		name: 'Message Received',
		conditions: [
			messageMatchCondition({ variables: MESSAGE_TEXT_VARIABLES }),
			userMatchCondition(),
			textEqualsCondition('guild-id', 'Server ID', 'Guild ID (optional)'),
			textEqualsCondition('channel-id', 'Channel ID', 'Channel ID (optional)')
		],
		validate: (conditions, context) => {
			const ctx = context as MessageReceivedContext;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(ctx.message, value),
				user: (value) =>
					evaluateUserMatch(ctx.username, value) || evaluateUserMatch(ctx.user, value),
				'guild-id': (value) => evaluateOptionalEquals(ctx.guildId, value),
				'channel-id': (value) => evaluateOptionalEquals(ctx.channelId, value)
			});
		},
		onTest: createOnTest(() => createTestMessageReceivedContext()),
		activate: createActivate<MessageReceivedContext>(
			app,
			(handler) => onDiscordEvent(DISCORD_EVENTS.MESSAGE_RECEIVED, handler),
			(conditions, context) => {
				return evaluateWith(conditions, context, {
					match: (value) => evaluateMessageMatch(context.message, value),
					user: (value) =>
						evaluateUserMatch(context.username, value) ||
						evaluateUserMatch(context.user, value),
					'guild-id': (value) => evaluateOptionalEquals(context.guildId, value),
					'channel-id': (value) => evaluateOptionalEquals(context.channelId, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
