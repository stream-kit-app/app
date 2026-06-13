import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeHypeTrainEnd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestHypeTrainContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createHypeTrainEndTrigger = (app: PluginAppApi) =>
	({
		name: 'Hype Train End',
		activate: (action, trigger) => {
			const unsubscribe = subscribeHypeTrainEnd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestHypeTrainContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
