import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeHypeTrainProgress } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';

export const createHypeTrainProgressTrigger = (app: PluginAppApi) =>
	({
		id: 'twitch-hype-progress',
		name: 'Hype Train Progress',
		activate: (action, trigger) => {
			const unsubscribe = subscribeHypeTrainProgress(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
