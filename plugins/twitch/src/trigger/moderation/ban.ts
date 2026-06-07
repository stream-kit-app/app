import type { App } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { ModerationContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import { evaluateUserMatch, userMatchCondition } from '../../lib/conditions';
import { subscribeModeration } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createBanTrigger = (app: App) =>
	({
		id: 'twitch-mod-ban',
		name: 'User Banned',
		conditions: [userMatchCondition()],
		validate: (conditions, context) => {
			const { user } = context as ModerationContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeModeration(app, (event) => {
				if (event.type !== 'ban') {
					return;
				}

				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel: event.channel,
					user: event.user
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
