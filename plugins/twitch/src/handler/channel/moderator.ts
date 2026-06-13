import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createModAddHandler = (app: PluginAppApi) =>
	({
		name: 'Add Moderator',
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
			const { userName } = resolveUserFromContext(context, fieldUser);

			if (!broadcasterId || !userName) {
				return;
			}

			void getTwitch(app).client?.moderation.addModerator(broadcasterId, userName);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createModRemoveHandler = (app: PluginAppApi) =>
	({
		name: 'Remove Moderator',
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
			const { userName } = resolveUserFromContext(context, fieldUser);

			if (!broadcasterId || !userName) {
				return;
			}

			void getTwitch(app).client?.moderation.removeModerator(broadcasterId, userName);
			next();
		}
	}) satisfies HandlerDefinitionProps;
