import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { getYouTube } from '../../lib/plugin-api';
import { USER_TEXT_VARIABLES } from '../../lib/variables';

export const createBanHandler = (app: PluginAppApi) =>
	({
		name: 'Ban / Timeout User',
		fields: [
			{
				type: 'text',
				name: 'User ID',
				placeholder: 'Leave empty or use {userId}',
				variables: [
					...USER_TEXT_VARIABLES,
					{ key: 'userId', label: 'User ID' }
				]
			},
			{
				type: 'text',
				name: 'Duration',
				placeholder: 'Seconds (0 = permanent ban)'
			}
		],
		execute: (_action, handler, context, next) => {
			const fieldUserId = resolveFieldText(handler.fields, 'userId', context);
			const triggerData = context.data as { userId?: string } | undefined;
			const userId =
				(typeof fieldUserId === 'string' && fieldUserId.trim()) ||
				triggerData?.userId ||
				undefined;
			const durationValue = getFieldValue(handler.fields, 'duration');

			if (!userId) {
				return;
			}

			const duration =
				typeof durationValue === 'string' ? Number.parseInt(durationValue, 10) : Number.NaN;
			const timeoutDuration =
				!Number.isNaN(duration) && duration > 0 ? duration : undefined;

			void getYouTube(app).banUser(userId, timeoutDuration);
			next();
		}
	}) satisfies HandlerDefinitionProps;
