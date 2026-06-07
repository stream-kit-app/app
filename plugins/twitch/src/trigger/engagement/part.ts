import type { App } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { getBroadcasterId } from '../../lib/broadcaster';
import { subscribeJoinPart } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';

export const createUserPartTrigger = (app: App) =>
	({
		id: 'twitch-user-part',
		name: 'User Part',
		activate: (action, trigger) => {
			const unsubscribe = subscribeJoinPart(app, (event) => {
				if (event.type !== 'part') {
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
