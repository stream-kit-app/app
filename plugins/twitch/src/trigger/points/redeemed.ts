import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { PointsRedemptionContext } from '../../contexts';
import {
	evaluateRewardId,
	evaluateUserMatch,
	userMatchCondition
} from '../../lib/conditions';
import { rewardSelectCondition } from '../../lib/rewards';
import { subscribeRedemptionAdd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createPointsRedeemedTrigger = (app: PluginAppApi) =>
	({
		name: 'Reward Redeemed',
		conditions: [rewardSelectCondition(app), userMatchCondition()],
		validate: (conditions, context) => {
			const { rewardId, user } = context as PointsRedemptionContext;

			return evaluateWith(conditions, context, {
				rewardId: (value) => evaluateRewardId(rewardId, value),
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeRedemptionAdd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
