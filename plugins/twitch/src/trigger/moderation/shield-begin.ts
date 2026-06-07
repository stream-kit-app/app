import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeShieldModeBegin } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';

export const createShieldModeBeginTrigger = (app: PluginAppApi) =>
	({
		id: 'twitch-mod-shield-begin',
		name: 'Shield Mode Enabled',
		activate: (action, trigger) => {
			const unsubscribe = subscribeShieldModeBegin(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
