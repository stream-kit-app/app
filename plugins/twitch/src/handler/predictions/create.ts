import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { parsePositiveInt } from '../../lib/parse-list';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';

export const createPredictionStartHandler = (app: App) =>
	({
		id: 'twitch-prediction-start',
		name: 'Start Prediction',
		fields: [
			{
				type: 'text',
				key: 'title',
				name: 'Title',
				required: true,
				placeholder: 'Will {username} win?',
				variables: CHAT_TEXT_VARIABLES
			},
			{
				type: 'text',
				key: 'outcome1',
				name: 'Outcome 1',
				required: true,
				placeholder: 'Yes'
			},
			{
				type: 'text',
				key: 'outcome2',
				name: 'Outcome 2',
				required: true,
				placeholder: 'No'
			},
			{
				type: 'text',
				key: 'autoLockAfter',
				name: 'Auto-lock after (seconds)',
				required: true,
				placeholder: '120'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const title = resolveFieldText(handler.fields, 'title', context);
			const outcome1 = getFieldValue(handler.fields, 'outcome1');
			const outcome2 = getFieldValue(handler.fields, 'outcome2');
			const autoLockAfter = parsePositiveInt(getFieldValue(handler.fields, 'autoLockAfter'));

			if (
				!broadcasterId ||
				!title?.trim() ||
				typeof outcome1 !== 'string' ||
				!outcome1.trim() ||
				typeof outcome2 !== 'string' ||
				!outcome2.trim() ||
				!autoLockAfter
			) {
				return;
			}

			void app.twitch.client?.predictions.createPrediction(broadcasterId, {
				title: title.trim(),
				outcomes: [outcome1.trim(), outcome2.trim()],
				autoLockAfter
			});
		}
	}) satisfies HandlerDefinitionProps;
