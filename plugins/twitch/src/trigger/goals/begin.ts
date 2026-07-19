import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeGoalBegin } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestGoalContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createGoalBeginTrigger = (app: PluginAppApi) =>
	({
		name: 'Goal Begin',
		activate: (action, trigger) => {
			const unsubscribe = subscribeGoalBegin(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestGoalContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
