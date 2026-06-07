import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createVipAddHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-channel-vip-add',
		name: 'Add VIP',
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

			void getTwitch(app).client?.channels.addVip(broadcasterId, userName);
		}
	}) satisfies HandlerDefinitionProps;

export const createVipRemoveHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-channel-vip-remove',
		name: 'Remove VIP',
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

			void getTwitch(app).client?.channels.removeVip(broadcasterId, userName);
		}
	}) satisfies HandlerDefinitionProps;
