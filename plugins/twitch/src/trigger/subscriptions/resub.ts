import type { App } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { SubContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import {
	evaluateMinNumber,
	evaluateSubTier,
	evaluateUserMatch,
	minNumberCondition,
	subTierCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeSubs } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createResubTrigger = (app: App) =>
	({
		id: 'twitch-sub-resub',
		name: 'Resubscription',
		conditions: [
			subTierCondition(),
			minNumberCondition('months', 'Minimum Months'),
			userMatchCondition()
		],
		validate: (conditions, context) => {
			const { tier, months = 0, user } = context as SubContext;

			return evaluateWith(conditions, context, {
				tier: (value) => evaluateSubTier(tier, value),
				months: (value) => evaluateMinNumber(months, value),
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeSubs(app, (event) => {
				if ((event as { type: string }).type !== 'resub') {
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
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
