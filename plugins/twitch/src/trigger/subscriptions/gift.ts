import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { GiftSubContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import {
	evaluateMinNumber,
	evaluateSubTier,
	minNumberCondition,
	subTierCondition
} from '../../lib/conditions';
import { subscribeSubs } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createGiftSubTrigger = (app: PluginAppApi) =>
	({
		name: 'Gift Subscription',
		conditions: [subTierCondition(), minNumberCondition('giftCount', 'Minimum Gift Count')],
		validate: (conditions, context) => {
			const { tier, giftCount } = context as GiftSubContext;

			return evaluateWith(conditions, context, {
				tier: (value) => evaluateSubTier(tier, value),
				giftCount: (value) => evaluateMinNumber(giftCount, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeSubs(app, (event) => {
				if ((event as { type: string }).type !== 'gift') {
					return;
				}

				const { channel, user, tier, giftCount } = event as {
					channel: string;
					user: string;
					tier: string;
					giftCount: number;
				};

				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel,
					user,
					tier,
					giftCount
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
