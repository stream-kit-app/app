import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { MESSAGE_TEXT_VARIABLES, TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createWarnHandler = (app: PluginAppApi) =>
	({
		name: 'Warn User',
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
				required: true,
				placeholder: 'Warning reason',
				variables: MESSAGE_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const reason = resolveFieldText(handler.fields, 'reason', context);
			const { userName, userId } = resolveUserFromContext(
				context,
				typeof fieldUser === 'string' ? fieldUser : undefined
			);
			const target = userId ?? userName;

			if (!broadcasterId || !target || typeof reason !== 'string' || !reason.trim()) {
				return;
			}

			void getTwitch(app).client?.moderation.warnUser(broadcasterId, target, reason.trim());
			next();
		}
	}) satisfies HandlerDefinitionProps;
