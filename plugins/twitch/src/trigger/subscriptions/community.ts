import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { CommunitySubContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import { evaluateMinNumber, minNumberCondition } from '../../lib/conditions';
import { subscribeSubs } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestCommunitySubContext } from '../../lib/test-contexts';

export const createCommunitySubTrigger = (app: PluginAppApi) =>
	({
		name: 'Community Subscription',
		conditions: [minNumberCondition('giftCount', 'Minimum Gift Count')],
		validate: (conditions, context) => {
			const { giftCount } = context as CommunitySubContext;

			return evaluateWith(conditions, context, {
				giftCount: (value) => evaluateMinNumber(giftCount, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeSubs(app, (event) => {
				if ((event as { type: string }).type !== 'community') {
					return;
				}

				const { channel, user, giftCount } = event as {
					channel: string;
					user: string;
					giftCount: number;
				};

				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel,
					user,
					giftCount
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestCommunitySubContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
