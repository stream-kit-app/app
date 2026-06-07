import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { PollContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createPollEndHandler = (app: App) =>
	({
		id: 'twitch-poll-end',
		name: 'End Poll',
		fields: [
			{
				type: 'text',
				key: 'pollId',
				name: 'Poll ID',
				placeholder: 'Leave empty to use trigger poll'
			},
			{
				type: 'switch',
				key: 'showResult',
				name: 'Show result'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldPollId = getFieldValue(handler.fields, 'pollId');
			const showResult = getFieldValue(handler.fields, 'showResult') === true;
			const pollId =
				(typeof fieldPollId === 'string' && fieldPollId.trim()) ||
				(context as PollContext).pollId;

			if (!broadcasterId || !pollId) {
				return;
			}

			void app.twitch.client?.polls.endPoll(broadcasterId, pollId, showResult);
		}
	}) satisfies HandlerDefinitionProps;
