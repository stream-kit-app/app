import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeGoalEnd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestGoalContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createGoalEndTrigger = (app: PluginAppApi) =>
	({
		name: 'Goal End',
		activate: (action, trigger) => {
			const unsubscribe = subscribeGoalEnd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestGoalContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
