import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { PointsRedemptionContext } from '../../contexts';
import {
	evaluateRewardId,
	evaluateUserMatch,
	userMatchCondition
} from '../../lib/conditions';
import { rewardSelectCondition } from '../../lib/rewards';
import { subscribeRedemptionAdd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestPointsRedemptionContext } from '../../lib/test-contexts';

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
		onTest: createOnTest(() => createTestPointsRedemptionContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
