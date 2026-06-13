import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { ChatMessageContext } from '../../contexts';
import { parseCommand } from '../../lib/command';
import {
	evaluateBooleanFilter,
	evaluateCommandMatch,
	evaluateMessageMatch,
	evaluateMinNumber,
	evaluateRewardId,
	evaluateRole,
	evaluateUserMatch,
	flagCondition,
	messageMatchCondition,
	minNumberCondition,
	roleCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeMessages } from '../../lib/irc-setup';
import { rewardSelectCondition } from '../../lib/rewards';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestChatMessageContext } from '../../lib/test-contexts';

export const createChatMessageTrigger = (app: PluginAppApi) =>
	({
		name: 'Chat Message',
		conditions: [
			messageMatchCondition(),
			userMatchCondition(),
			roleCondition(),
			messageMatchCondition('command', 'Command', { variables: [] }),
			rewardSelectCondition(app),
			minNumberCondition('minBits', 'Minimum Bits'),
			minNumberCondition('minAmount', 'Minimum Hype Amount'),
			minNumberCondition('minHypeLevel', 'Minimum Hype Level'),
			flagCondition('isCheer', 'Cheer'),
			flagCondition('isRedemption', 'Redemption'),
			flagCondition('isHypeChat', 'Hype Chat'),
			flagCondition('isFirst', 'First Message'),
			flagCondition('isReturningChatter', 'Returning Chatter'),
			flagCondition('isHighlight', 'Highlight'),
			flagCondition('isReply', 'Reply'),
			userMatchCondition('parentUser', 'Reply User', 'Parent username (optional)'),
			messageMatchCondition('parentMessage', 'Reply Message', { variables: [] })
		],
		validate: (conditions, context) => {
			const ctx = context as ChatMessageContext;
			const { message, role, user, msg } = ctx;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(message, value),
				user: (value) => evaluateUserMatch(user, value),
				role: (value) => evaluateRole(role, value),
				command: (value) => evaluateCommandMatch(parseCommand(message), value),
				rewardId: (value) => evaluateRewardId(msg.rewardId ?? '', value),
				minBits: (value) => evaluateMinNumber(msg.bits, value),
				minAmount: (value) => evaluateMinNumber(msg.hypeChatLocalizedAmount ?? 0, value),
				minHypeLevel: (value) => evaluateMinNumber(msg.hypeChatLevel ?? 0, value),
				isCheer: (value) => evaluateBooleanFilter(msg.isCheer, value),
				isRedemption: (value) => evaluateBooleanFilter(msg.isRedemption, value),
				isHypeChat: (value) => evaluateBooleanFilter(msg.isHypeChat, value),
				isFirst: (value) => evaluateBooleanFilter(msg.isFirst, value),
				isReturningChatter: (value) => evaluateBooleanFilter(msg.isReturningChatter, value),
				isHighlight: (value) => evaluateBooleanFilter(msg.isHighlight, value),
				isReply: (value) => evaluateBooleanFilter(msg.isReply, value),
				parentUser: (value) => evaluateUserMatch(msg.parentMessageUserName ?? '', value),
				parentMessage: (value) => evaluateMessageMatch(msg.parentMessageText ?? '', value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeMessages(app, () => true, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestChatMessageContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
