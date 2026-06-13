import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { CheerContext } from '../../contexts';
import {
	evaluateMinNumber,
	evaluateUserMatch,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeMessages } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestCheerContext } from '../../lib/test-contexts';

export const createCheerTrigger = (app: PluginAppApi) =>
	({
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
		onTest: createOnTest(() => createTestCheerContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
