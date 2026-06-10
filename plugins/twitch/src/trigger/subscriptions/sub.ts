import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { SubContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import {
	evaluateSubTier,
	evaluateUserMatch,
	subTierCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeSubs } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestSubContext } from '../../lib/test-contexts';

export const createSubTrigger = (app: PluginAppApi) =>
	({
		name: 'New Subscription',
		conditions: [subTierCondition(), userMatchCondition()],
		validate: (conditions, context) => {
			const { tier, user } = context as SubContext;

			return evaluateWith(conditions, context, {
				tier: (value) => evaluateSubTier(tier, value),
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeSubs(app, (event) => {
				if ((event as { type: string }).type !== 'new') {
					return;
				}

				const { channel, user, tier, months } = event as {
					channel: string;
					user: string;
					tier: string;
					months: number;
				};

				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel,
					user,
					tier,
					months
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestSubContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
