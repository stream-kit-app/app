import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { parseListField, parsePositiveInt } from '../../lib/parse-list';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createPollStartHandler = (app: PluginAppApi) =>
	({
		name: 'Start Poll',
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
				name: 'Choices',
				required: true,
				placeholder: 'Yes, No, Maybe (comma or newline separated, 2–5 choices)'
			},
			{
				type: 'text',
				name: 'Duration (seconds)',
				required: true,
				placeholder: '60'
			},
			{
				type: 'text',
				name: 'Channel points per vote',
				placeholder: 'Leave empty to disable point voting'
			}
		],
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const title = resolveFieldText(handler.fields, 'title', context);
			const choices = parseListField(getFieldValue(handler.fields, 'choices'));
			const duration = parsePositiveInt(getFieldValue(handler.fields, 'duration'));
			const channelPointsRaw = getFieldValue(handler.fields, 'channelPointsPerVote');
			const channelPointsPerVote = parsePositiveInt(channelPointsRaw);

			if (
				!broadcasterId ||
				!title?.trim() ||
				choices.length < 2 ||
				choices.length > 5 ||
				!duration
			) {
				return;
			}

			void getTwitch(app).client?.polls.createPoll(broadcasterId, {
				title: title.trim(),
				choices,
				duration,
				...(channelPointsPerVote != null ? { channelPointsPerVote } : {})
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;
