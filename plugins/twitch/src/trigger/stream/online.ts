import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeStreamOnline } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestStreamContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createStreamOnlineTrigger = (app: PluginAppApi) =>
	({
		name: 'Stream Online',
		activate: (action, trigger) => {
			const unsubscribe = subscribeStreamOnline(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestStreamContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
