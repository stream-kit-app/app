import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { RaidContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import { evaluateMinNumber, minNumberCondition } from '../../lib/conditions';
import { subscribeRaids } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createIncomingRaidTrigger = (app: PluginAppApi) =>
	({
		name: 'Incoming Raid',
		conditions: [minNumberCondition('viewers', 'Minimum Viewers')],
		validate: (conditions, context) => {
			const { viewers } = context as RaidContext;

			return evaluateWith(conditions, context, {
				viewers: (value) => evaluateMinNumber(viewers, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeRaids(app, ({ channel, user, viewers }) => {
				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel,
					user,
					viewers
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
