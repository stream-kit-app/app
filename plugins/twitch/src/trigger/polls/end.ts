import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribePollEnd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestPollContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createPollEndTrigger = (app: PluginAppApi) =>
	({
		name: 'Poll End',
		activate: (action, trigger) => {
			const unsubscribe = subscribePollEnd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestPollContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
