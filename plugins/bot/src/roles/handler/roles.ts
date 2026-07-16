import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { Roles } from '../app/lib/roles.svelte';
import { getFieldValue } from '../lib/get-field-value';
import {
	createRoleSelectField,
	createUserTargetField,
	resolveRoleId,
	resolveUserTarget,
	userTargetFailureDescription
} from '../lib/user-target-field';

function resolveOutputVar(
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

export function createAddUserToRoleHandler(app: PluginAppApi, roles: Roles) {
	return {
		name: 'Add user to role',
		fields: [createUserTargetField(), createRoleSelectField(roles)],
		execute: async (_action, handler, context, next) => {
			const identity = resolveUserTarget(handler.fields, context.data);
			const roleId = resolveRoleId(roles, handler.fields, context.data);

			if (!identity || !roleId) {
				app.toast.create({
					title: 'Add user to role failed',
					description: !roleId
						? 'Select a valid role.'
						: userTargetFailureDescription(handler.fields),
					variant: 'warning'
				});
				next();
				return;
			}

			roles.addMember(roleId, identity);
			next();
		}
	} satisfies HandlerDefinitionProps;
}

export function createRemoveUserFromRoleHandler(app: PluginAppApi, roles: Roles) {
	return {
		name: 'Remove user from role',
		fields: [createUserTargetField(), createRoleSelectField(roles)],
		execute: async (_action, handler, context, next) => {
			const identity = resolveUserTarget(handler.fields, context.data);
			const roleId = resolveRoleId(roles, handler.fields, context.data);

			if (!identity || !roleId) {
				app.toast.create({
					title: 'Remove user from role failed',
					description: !roleId
						? 'Select a valid role.'
						: userTargetFailureDescription(handler.fields),
					variant: 'warning'
				});
				next();
				return;
			}

			roles.removeMember(roleId, identity.userId);
			next();
		}
	} satisfies HandlerDefinitionProps;
}

export function createUserInRoleHandler(app: PluginAppApi, roles: Roles) {
	return {
		name: 'User in role',
		fields: [
			createUserTargetField(),
			createRoleSelectField(roles),
			{
				type: 'text' as const,
				name: 'Store result as',
				key: 'resultVar',
				defaultValue: 'inRole'
			}
		],
		execute: async (_action, handler, context, next) => {
			const resultVar = resolveOutputVar(handler.fields, 'resultVar', 'inRole');
			const identity = resolveUserTarget(handler.fields, context.data);
			const roleId = resolveRoleId(roles, handler.fields, context.data);

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			if (!identity || !roleId) {
				app.toast.create({
					title: 'User in role failed',
					description: !roleId
						? 'Select a valid role.'
						: userTargetFailureDescription(handler.fields),
					variant: 'warning'
				});
				context.actionVariables[resultVar] = 'false';
				next();
				return;
			}

			context.actionVariables[resultVar] = roles.isMember(roleId, identity)
				? 'true'
				: 'false';
			next();
		}
	} satisfies HandlerDefinitionProps;
}
