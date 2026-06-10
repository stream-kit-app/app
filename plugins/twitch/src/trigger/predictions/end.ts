import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribePredictionEnd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestPredictionContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createPredictionEndTrigger = (app: PluginAppApi) =>
	({
		name: 'Prediction End',
		activate: (action, trigger) => {
			const unsubscribe = subscribePredictionEnd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestPredictionContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
