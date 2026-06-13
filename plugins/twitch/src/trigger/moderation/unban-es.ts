import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { EventSubModerationContext } from '../../contexts';
import { evaluateUserMatch, userMatchCondition } from '../../lib/conditions';
import { subscribeChannelUnban } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestEventSubModerationContext } from '../../lib/test-contexts';

export const createChannelUnbanTrigger = (app: PluginAppApi) =>
	({
		name: 'User Unbanned (EventSub)',
		conditions: [userMatchCondition()],
		validate: (conditions, context) => {
			const { user } = context as EventSubModerationContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeChannelUnban(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestEventSubModerationContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
