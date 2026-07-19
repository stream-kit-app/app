import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { getDiscord } from '../../lib/plugin-api';
import { ROLE_TEXT_VARIABLES } from '../../lib/variables';

export const createRemoveRoleHandler = (app: PluginAppApi) =>
	({
		name: 'Remove Role',
		fields: [
			{
				type: 'text',
				name: 'Server ID',
				required: true,
				placeholder: 'Discord guild snowflake',
				variables: ROLE_TEXT_VARIABLES
			},
			{
				type: 'text',
				name: 'User ID',
				required: true,
				placeholder: 'Discord user snowflake',
				variables: ROLE_TEXT_VARIABLES
			},
			{
				type: 'text',
				name: 'Role ID',
				required: true,
				placeholder: 'Discord role snowflake',
				variables: ROLE_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context, next) => {
			const guildId = resolveFieldText(handler.fields, 'server-id', context);
			const userId = resolveFieldText(handler.fields, 'user-id', context);
			const roleId = resolveFieldText(handler.fields, 'role-id', context);

			if (
				typeof guildId !== 'string' ||
				!guildId.trim() ||
				typeof userId !== 'string' ||
				!userId.trim() ||
				typeof roleId !== 'string' ||
				!roleId.trim()
			) {
				return;
			}

			void getDiscord(app).removeRole(guildId.trim(), userId.trim(), roleId.trim());
			next();
		}
	}) satisfies HandlerDefinitionProps;
