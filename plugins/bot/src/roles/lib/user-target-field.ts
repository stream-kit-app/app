import { getOneOfFieldValue, interpolateVariables } from '@stream-kit/core';
import type { HandlerFieldDefinition, HandlerFieldInstance } from '@stream-kit/plugin';

import type { Roles } from '../app/lib/roles.svelte';
import type { RolePlatform } from '../app/lib/stored-role';
import { contextToVariables } from './get-field-value';
import {
	extractPlatform,
	formatPlatformUserId,
	parsePlatformFromUserId,
	resolveUserIdentity
} from './extract-user';

export type ResolvedUserTarget = {
	userId: string;
	username: string;
	platform: RolePlatform;
};

export function createUserTargetField(): HandlerFieldDefinition {
	return {
		type: 'one-of',
		name: 'User',
		key: 'user',
		required: true,
		defaultVariant: 'trigger',
		variants: [
			{
				id: 'trigger',
				label: 'From trigger',
				field: {
					type: 'switch',
					name: 'Use trigger user',
					defaultValue: true
				}
			},
			{
				id: 'variable',
				label: 'Variable',
				field: {
					type: 'text',
					name: 'Username or user ID',
					placeholder: '{user}',
					required: true,
					useContextVariables: true
				}
			}
		]
	};
}

function resolveUserFromText(text: string, context: unknown): ResolvedUserTarget | null {
	const interpolated = interpolateVariables(text, contextToVariables(context)).trim();

	if (!interpolated) {
		return null;
	}

	if (interpolated.includes(':')) {
		const platform = parsePlatformFromUserId(interpolated);
		const local = interpolated.slice(interpolated.indexOf(':') + 1);

		return {
			userId: interpolated,
			username: local,
			platform
		};
	}

	const platform = extractPlatform(context) || 'twitch';

	return {
		userId: formatPlatformUserId(platform, interpolated.toLowerCase()),
		username: interpolated,
		platform
	};
}

export function resolveUserTarget(
	fields: HandlerFieldInstance[],
	context: unknown
): ResolvedUserTarget | null {
	const oneOf = getOneOfFieldValue(fields, 'user');

	if (!oneOf || oneOf.variant === 'trigger' || oneOf.value === true || oneOf.value == null) {
		return resolveUserIdentity(context);
	}

	if (typeof oneOf.value === 'string') {
		return resolveUserFromText(oneOf.value, context);
	}

	return resolveUserIdentity(context);
}

export function userTargetFailureDescription(fields: HandlerFieldInstance[]): string {
	const oneOf = getOneOfFieldValue(fields, 'user');

	if (oneOf?.variant === 'variable') {
		return 'Could not resolve the username or user ID variable.';
	}

	return 'Trigger data did not include a user.';
}

export function createRoleSelectField(roles: Roles): HandlerFieldDefinition {
	return {
		type: 'combobox',
		name: 'Role',
		key: 'role',
		required: true,
		placeholder: 'Select a role',
		loadingPlaceholder: 'Loading roles…',
		allowCustomValue: true,
		items: () =>
			roles.roles
				.slice()
				.sort((left, right) => left.name.localeCompare(right.name))
				.map((role) => ({
					value: role.id,
					label: role.name
				}))
	};
}

export function resolveRoleId(
	roles: Roles,
	fields: HandlerFieldInstance[],
	context: unknown
): string | null {
	const raw =
		fields.find((field) => field.key === 'role')?.value ??
		fields.find((field) => field.key === 'group')?.value;

	if (typeof raw !== 'string' || !raw.trim()) {
		return null;
	}

	const value = interpolateVariables(raw, contextToVariables(context)).trim();

	if (!value) {
		return null;
	}

	if (roles.roles.some((role) => role.id === value)) {
		return value;
	}

	return roles.findByName(value)?.id ?? null;
}
