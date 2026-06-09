import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createUnbanHandler = (app: PluginAppApi) =>
	({
		name: 'Unban User',
		fields: [
			{
				type: 'text',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userName, userId } = resolveUserFromContext(
				context as { user?: string; userId?: string },
				fieldUser
			);
			const target = userId ?? userName;

			if (!broadcasterId || !target) {
				return;
			}

			void getTwitch(app).client?.moderation.unbanUser(broadcasterId, target);
		}
	}) satisfies HandlerDefinitionProps;
