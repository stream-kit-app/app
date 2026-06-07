import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeShieldModeEnd } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';

export const createShieldModeEndTrigger = (app: PluginAppApi) =>
	({
		id: 'twitch-mod-shield-end',
		name: 'Shield Mode Disabled',
		activate: (action, trigger) => {
			const unsubscribe = subscribeShieldModeEnd(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
