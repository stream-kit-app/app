import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveUserFromContext } from '../../lib/handler-helpers';
import { TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createVipAddHandler = (app: PluginAppApi) =>
	({
		name: 'Add VIP',
		fields: [
			{
				type: 'text',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userName } = resolveUserFromContext(context, fieldUser);

			if (!broadcasterId || !userName) {
				return;
			}

			void getTwitch(app).client?.channels.addVip(broadcasterId, userName);
		}
	}) satisfies HandlerDefinitionProps;

export const createVipRemoveHandler = (app: PluginAppApi) =>
	({
		name: 'Remove VIP',
		fields: [
			{
				type: 'text',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userName } = resolveUserFromContext(context, fieldUser);

			if (!broadcasterId || !userName) {
				return;
			}

			void getTwitch(app).client?.channels.removeVip(broadcasterId, userName);
		}
	}) satisfies HandlerDefinitionProps;
