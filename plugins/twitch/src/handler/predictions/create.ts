import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { parsePositiveInt } from '../../lib/parse-list';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createPredictionStartHandler = (app: PluginAppApi) =>
	({
		name: 'Start Prediction',
		fields: [
			{
				type: 'text',
				name: 'Title',
				required: true,
				placeholder: 'Will {username} win?',
				variables: CHAT_TEXT_VARIABLES
			},
			{
				type: 'text',
				name: 'Outcome 1',
				required: true,
				placeholder: 'Yes'
			},
			{
				type: 'text',
				name: 'Outcome 2',
				required: true,
				placeholder: 'No'
			},
			{
				type: 'text',
				name: 'Auto-lock after (seconds)',
				required: true,
				placeholder: '120'
			}
		],
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
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

			void getTwitch(app).client?.predictions.createPrediction(broadcasterId, {
				title: title.trim(),
				outcomes: [outcome1.trim(), outcome2.trim()],
				autoLockAfter
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;
