import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';

export const createModAddHandler = (app: App) =>
	({
		id: 'twitch-channel-mod-add',
		name: 'Add Moderator',
		fields: [
			{
				type: 'text',
				key: 'user',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userName } = resolveUserFromContext(context as { user?: string }, fieldUser);

			if (!broadcasterId || !userName) {
				return;
			}

			void app.twitch.client?.moderation.addModerator(broadcasterId, userName);
		}
	}) satisfies HandlerDefinitionProps;

export const createModRemoveHandler = (app: App) =>
	({
		id: 'twitch-channel-mod-remove',
		name: 'Remove Moderator',
		fields: [
			{
				type: 'text',
				key: 'user',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userName } = resolveUserFromContext(context as { user?: string }, fieldUser);

			if (!broadcasterId || !userName) {
				return;
			}

			void app.twitch.client?.moderation.removeModerator(broadcasterId, userName);
		}
	}) satisfies HandlerDefinitionProps;
