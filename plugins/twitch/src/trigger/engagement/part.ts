import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { getBroadcasterId } from '../../lib/broadcaster';
import { subscribeJoinPart } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestUserJoinPartContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createUserPartTrigger = (app: PluginAppApi) =>
	({
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
		onTest: createOnTest(() => createTestUserJoinPartContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
