import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createShoutoutHandler = (app: PluginAppApi) =>
	({
		name: 'Shoutout User',
		fields: [
			{
				type: 'text',
				name: 'Username',
				required: true,
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const user = resolveFieldText(handler.fields, 'user', context);
			const broadcasterId = resolveBroadcasterId(context, app);

			if (typeof user !== 'string' || !user.trim() || !broadcasterId) {
				return;
			}

			void getTwitch(app).client?.chat.shoutoutUser(broadcasterId, user.trim());
		}
	}) satisfies HandlerDefinitionProps;
