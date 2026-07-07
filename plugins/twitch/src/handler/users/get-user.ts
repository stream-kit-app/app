import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveUserFromContext } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';
import { TARGET_USER_VARIABLES } from '../../lib/variables';

function normalizeQuery(value: string): string {
	return value.trim().replace(/^@/, '');
}

function isNumericId(value: string): boolean {
	return /^\d+$/.test(value);
}

function resolveTargetName(
	fields: Parameters<typeof getFieldValue>[0],
	key: string,
	fallback: string
): string {
	const value = getFieldValue(fields, key);

	if (typeof value === 'string' && value.trim()) {
		return value.trim();
	}

	return fallback;
}

export const createGetUserHandler = (app: PluginAppApi) =>
	({
		name: 'Get User Info',
		fields: [
			{
				type: 'text',
				name: 'User',
				key: 'user',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			},
			{
				type: 'text',
				name: 'Store userId as',
				key: 'userIdVar',
				defaultValue: 'userId'
			},
			{
				type: 'text',
				name: 'Store username as',
				key: 'userNameVar',
				defaultValue: 'userName'
			},
			{
				type: 'text',
				name: 'Store display name as',
				key: 'displayNameVar',
				defaultValue: 'displayName'
			}
		],
		execute: async (_action, handler, context, next) => {
			const client = getTwitch(app).client;

			if (!client) {
				next();
				return;
			}

			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const { userId: contextUserId, userName: contextUserName } = resolveUserFromContext(
				context,
				fieldUser
			);

			const userIdVar = resolveTargetName(handler.fields, 'userIdVar', 'userId');
			const userNameVar = resolveTargetName(handler.fields, 'userNameVar', 'userName');
			const displayNameVar = resolveTargetName(handler.fields, 'displayNameVar', 'displayName');

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			const setEmpty = () => {
				context.actionVariables![userIdVar] = '';
				context.actionVariables![userNameVar] = '';
				context.actionVariables![displayNameVar] = '';
			};

			const setUser = (user: { id: string; name: string; displayName: string }) => {
				context.actionVariables![userIdVar] = user.id;
				context.actionVariables![userNameVar] = user.name;
				context.actionVariables![displayNameVar] = user.displayName;
			};

			const query = fieldUser?.trim()
				? normalizeQuery(fieldUser)
				: contextUserId
					? contextUserId
					: contextUserName
						? normalizeQuery(contextUserName)
						: '';

			if (!query) {
				setEmpty();
				next();
				return;
			}

			try {
				let user = isNumericId(query)
					? await client.users.getUserById(query)
					: await client.users.getUserByName(query);

				if (!user && isNumericId(query)) {
					user = await client.users.getUserByName(query);
				}

				if (!user) {
					setEmpty();
					next();
					return;
				}

				setUser(user);
			} catch (error) {
				console.error('Failed to look up Twitch user', error);
				setEmpty();
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
