import type { App } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribePredictionLock } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';

export const createPredictionLockTrigger = (app: App) =>
	({
		id: 'twitch-prediction-lock',
		name: 'Prediction Lock',
		activate: (action, trigger) => {
			const unsubscribe = subscribePredictionLock(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
