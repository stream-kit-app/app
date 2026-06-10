import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeChannelFollow } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestFollowContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createFollowTrigger = (app: PluginAppApi) =>
	({
		name: 'New Follower',
		activate: (action, trigger) => {
			const unsubscribe = subscribeChannelFollow(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestFollowContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
