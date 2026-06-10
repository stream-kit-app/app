import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeShieldModeBegin } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestEventSubModerationContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createShieldModeBeginTrigger = (app: PluginAppApi) =>
	({
		name: 'Shield Mode Enabled',
		activate: (action, trigger) => {
			const unsubscribe = subscribeShieldModeBegin(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestEventSubModerationContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
