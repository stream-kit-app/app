import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeShieldModeEnd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestEventSubModerationContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createShieldModeEndTrigger = (app: PluginAppApi) =>
	({
		name: 'Shield Mode Disabled',
		activate: (action, trigger) => {
			const unsubscribe = subscribeShieldModeEnd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestEventSubModerationContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
