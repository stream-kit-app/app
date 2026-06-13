import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeHypeTrainBegin } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestHypeTrainContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createHypeTrainBeginTrigger = (app: PluginAppApi) =>
	({
		name: 'Hype Train Begin',
		activate: (action, trigger) => {
			const unsubscribe = subscribeHypeTrainBegin(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestHypeTrainContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
