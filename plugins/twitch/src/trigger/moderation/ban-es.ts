import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { EventSubModerationContext } from '../../contexts';
import { evaluateUserMatch, userMatchCondition } from '../../lib/conditions';
import { subscribeChannelBan } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createChannelBanTrigger = (app: PluginAppApi) =>
	({
		name: 'User Banned (EventSub)',
		conditions: [userMatchCondition()],
		validate: (conditions, context) => {
			const { user } = context as EventSubModerationContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeChannelBan(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
