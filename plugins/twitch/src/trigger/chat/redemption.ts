import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { RedemptionContext } from '../../contexts';
import {
	evaluateRewardId,
	evaluateUserMatch,
	userMatchCondition
} from '../../lib/conditions';
import { rewardSelectCondition } from '../../lib/rewards';
import { subscribeMessages } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestRedemptionContext } from '../../lib/test-contexts';

export const createRedemptionTrigger = (app: PluginAppApi) =>
	({
		name: 'Channel Point Redemption',
		conditions: [rewardSelectCondition(app), userMatchCondition()],
		validate: (conditions, context) => {
			const { rewardId, user } = context as RedemptionContext;

			return evaluateWith(conditions, context, {
				rewardId: (value) => evaluateRewardId(rewardId, value),
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeMessages(
				app,
				(context) => context.msg.isRedemption,
				(context) => {
					action.fire(trigger, {
						...context,
						rewardId: context.msg.rewardId ?? ''
					});
				}
			);

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestRedemptionContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
