import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { ModerationContext } from '../../contexts';
import { getBroadcasterId } from '../../lib/broadcaster';
import {
	evaluateMinNumber,
	evaluateUserMatch,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeModeration } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestModerationContext } from '../../lib/test-contexts';

export const createTimeoutTrigger = (app: PluginAppApi) =>
	({
		name: 'User Timed Out',
		conditions: [userMatchCondition(), minNumberCondition('duration', 'Minimum Duration')],
		validate: (conditions, context) => {
			const { user, duration = 0 } = context as ModerationContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value),
				duration: (value) => evaluateMinNumber(duration, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeModeration(app, (event) => {
				if (event.type !== 'timeout') {
					return;
				}

				action.fire(trigger, {
					broadcasterId: getBroadcasterId(app) ?? '',
					channel: event.channel,
					user: event.user,
					duration: event.duration
				});
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestModerationContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
