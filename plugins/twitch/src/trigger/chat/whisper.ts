import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { WhisperContext } from '../../contexts';
import { evaluateMessageMatch, messageMatchCondition } from '../../lib/conditions';
import { getBroadcasterId, getBroadcasterName } from '../../lib/broadcaster';
import { subscribeWhispers } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createWhisperTrigger = (app: PluginAppApi) =>
	({
		id: 'twitch-chat-whisper',
		name: 'Whisper',
		conditions: [messageMatchCondition()],
		validate: (conditions, context) => {
			const { message } = context as WhisperContext;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(message, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeWhispers(app, ({ user, message }) => {
				const broadcasterId = getBroadcasterId(app) ?? '';
				const channel = getBroadcasterName(app) ?? '';

				action.fire(trigger, { broadcasterId, channel, user, message });
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
