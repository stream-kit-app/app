import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { MESSAGE_TEXT_VARIABLES, TARGET_USER_VARIABLES } from '../../lib/variables';

export const createWarnHandler = (app: App) =>
	({
		id: 'twitch-mod-warn',
		name: 'Warn User',
		fields: [
			{
				type: 'text',
				key: 'user',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			},
			{
				type: 'text',
				key: 'reason',
				name: 'Reason',
				required: true,
				placeholder: 'Warning reason',
				variables: MESSAGE_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const reason = resolveFieldText(handler.fields, 'reason', context);
			const { userName, userId } = resolveUserFromContext(
				context as { user?: string; userId?: string },
				typeof fieldUser === 'string' ? fieldUser : undefined
			);
			const target = userId ?? userName;

			if (!broadcasterId || !target || typeof reason !== 'string' || !reason.trim()) {
				return;
			}

			void app.twitch.client?.moderation.warnUser(broadcasterId, target, reason.trim());
		}
	}) satisfies HandlerDefinitionProps;
