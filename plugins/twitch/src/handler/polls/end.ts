import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { PollContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createPollEndHandler = (app: PluginAppApi) =>
	({
		name: 'End Poll',
		fields: [
			{
				type: 'text',
				name: 'Poll ID',
				placeholder: 'Leave empty to use trigger poll'
			},
			{
				type: 'switch',
				name: 'Show result'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const fieldPollId = getFieldValue(handler.fields, 'pollId');
			const showResult = getFieldValue(handler.fields, 'showResult') === true;
			const pollId =
				(typeof fieldPollId === 'string' && fieldPollId.trim()) ||
				(context.data as PollContext).pollId;

			if (!broadcasterId || !pollId) {
				return;
			}

			void getTwitch(app).client?.polls.endPoll(broadcasterId, pollId, showResult);
		}
	}) satisfies HandlerDefinitionProps;
