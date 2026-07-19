import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeAdBreakBegin } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestAdBreakContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createAdBreakBeginTrigger = (app: PluginAppApi) =>
	({
		name: 'Ad Break Begin',
		activate: (action, trigger) => {
			const unsubscribe = subscribeAdBreakBegin(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestAdBreakContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
