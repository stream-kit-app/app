import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';

export const createShoutoutHandler = (app: App) =>
	({
		id: 'twitch-chat-shoutout',
		name: 'Shoutout User',
		fields: [
			{
				type: 'text',
				key: 'user',
				name: 'Username',
				required: true,
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const user = resolveFieldText(handler.fields, 'user', context);
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (typeof user !== 'string' || !user.trim() || !broadcasterId) {
				return;
			}

			void app.twitch.client?.chat.shoutoutUser(broadcasterId, user.trim());
		}
	}) satisfies HandlerDefinitionProps;
