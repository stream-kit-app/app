import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

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
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userName, userId } = resolveUserFromContext(context, fieldUser);
			const target = userId ?? userName;

			if (!broadcasterId || !target) {
				return;
			}

			void getTwitch(app).client?.moderation.unbanUser(broadcasterId, target);
			next();
		}
	}) satisfies HandlerDefinitionProps;
