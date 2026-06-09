import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { MESSAGE_TEXT_VARIABLES, TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createBanHandler = (app: PluginAppApi) =>
	({
		name: 'Ban / Timeout User',
		fields: [
			{
				type: 'text',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			},
			{
				type: 'text',
				name: 'Reason',
				placeholder: 'Optional reason',
				variables: MESSAGE_TEXT_VARIABLES
			},
			{
				type: 'text',
				name: 'Duration (seconds, 0 = permanent ban)',
				placeholder: '0'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const reason = resolveFieldText(handler.fields, 'reason', context);
			const durationValue = getFieldValue(handler.fields, 'duration');
			const { userName } = resolveUserFromContext(
				context,
				typeof fieldUser === 'string' ? fieldUser : undefined
			);

			if (!broadcasterId || !userName) {
				return;
			}

			const duration =
				typeof durationValue === 'string' ? Number.parseInt(durationValue, 10) : Number.NaN;
			const timeoutDuration =
				!Number.isNaN(duration) && duration > 0 ? duration : undefined;

			void getTwitch(app).client?.moderation.banUser(broadcasterId, {
				user: userName,
				duration: timeoutDuration,
				reason: typeof reason === 'string' ? reason : undefined
			});
		}
	}) satisfies HandlerDefinitionProps;
