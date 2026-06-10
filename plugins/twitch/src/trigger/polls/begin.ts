import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribePollBegin } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestPollContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createPollBeginTrigger = (app: PluginAppApi) =>
	({
		name: 'Poll Begin',
		activate: (action, trigger) => {
			const unsubscribe = subscribePollBegin(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestPollContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
