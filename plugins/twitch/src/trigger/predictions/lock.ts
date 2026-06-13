import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribePredictionLock } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestPredictionContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createPredictionLockTrigger = (app: PluginAppApi) =>
	({
		name: 'Prediction Lock',
		activate: (action, trigger) => {
			const unsubscribe = subscribePredictionLock(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestPredictionContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
