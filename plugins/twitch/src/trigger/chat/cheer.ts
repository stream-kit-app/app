import type { App } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { CheerContext } from '../../contexts';
import {
	evaluateMinNumber,
	evaluateUserMatch,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeMessages } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createCheerTrigger = (app: App) =>
	({
		id: 'twitch-chat-cheer',
		name: 'Cheer',
		conditions: [minNumberCondition('minBits', 'Minimum Bits'), userMatchCondition()],
		validate: (conditions, context) => {
			const { bits, user } = context as CheerContext;

			return evaluateWith(conditions, context, {
				minBits: (value) => evaluateMinNumber(bits, value),
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeMessages(
				app,
				(context) => context.msg.isCheer,
				(context) => {
					action.fire(trigger, { ...context, bits: context.msg.bits });
				}
			);

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
