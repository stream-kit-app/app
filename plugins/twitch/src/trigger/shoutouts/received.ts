import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeShoutoutReceive } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestShoutoutReceivedContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createShoutoutReceivedTrigger = (app: PluginAppApi) =>
	({
		name: 'Shoutout Received',
		activate: (action, trigger) => {
			const unsubscribe = subscribeShoutoutReceive(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestShoutoutReceivedContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
