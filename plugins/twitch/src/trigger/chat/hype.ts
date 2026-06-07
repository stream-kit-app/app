import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { HypeChatContext } from '../../contexts';
import { evaluateMinNumber, minNumberCondition } from '../../lib/conditions';
import { subscribeMessages } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createHypeChatTrigger = (app: PluginAppApi) =>
	({
		id: 'twitch-chat-hype',
		name: 'Hype Chat',
		conditions: [minNumberCondition('minAmount', 'Minimum Amount')],
		validate: (conditions, context) => {
			const { amount } = context as HypeChatContext;

			return evaluateWith(conditions, context, {
				minAmount: (value) => evaluateMinNumber(amount, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeMessages(
				app,
				(context) => context.msg.isHypeChat,
				(context) => {
					action.fire(trigger, {
						...context,
						amount: context.msg.hypeChatLocalizedAmount ?? 0
					});
				}
			);

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
