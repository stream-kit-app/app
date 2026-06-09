import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { getBroadcasterId } from '../../lib/broadcaster';
import { subscribeJoinPart } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';

export const createUserJoinTrigger = (app: PluginAppApi) =>
	({
		name: 'User Join',
		activate: (action, trigger) => {
			const unsubscribe = subscribeJoinPart(app, (event) => {
				if (event.type !== 'join') {
					return;
				}

				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel: event.channel,
					user: event.user
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
