import { getOneOfFieldValue, interpolateVariables } from '@stream-kit/core';
import type { HandlerFieldDefinition, HandlerFieldInstance } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { contextToVariables } from './get-field-value';
import { extractPlatform, resolveUserIdentity } from './extract-user';
import type { RankingsPlatform } from './types';

export type ResolvedUserTarget = {
	userId: string;
	username: string;
	platform: RankingsPlatform;
};

export function createUserTargetField(rankings: RankingsService): HandlerFieldDefinition {
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
				id: 'select',
				label: 'Select user',
				field: {
					type: 'combobox',
					name: 'Ranked user',
					placeholder: 'Select a user',
					loadingPlaceholder: 'Loading users…',
					required: true,
					allowCustomValue: false,
					items: () =>
						rankings.users
							.slice()
							.sort((left, right) => left.username.localeCompare(right.username))
							.map((user) => ({
								value: user.userId,
								label: `${user.username} (${user.totalPoints} pts)`
							}))
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

function resolveUserFromText(
	text: string,
	context: unknown,
	rankings: RankingsService
): ResolvedUserTarget | null {
	const trimmed = text.trim();

	if (!trimmed) {
		return null;
	}

	const knownById = rankings.getUser(trimmed);

	if (knownById) {
		return {
			userId: knownById.userId,
			username: knownById.username,
			platform: knownById.platform
		};
	}

	const knownByName = rankings.users.find(
		(user) => user.username.toLowerCase() === trimmed.toLowerCase()
	);

	if (knownByName) {
		return {
			userId: knownByName.userId,
			username: knownByName.username,
			platform: knownByName.platform
		};
	}

	const platform = extractPlatform(context);

	return resolveUserIdentity({
		...(typeof context === 'object' && context != null ? context : {}),
		user: trimmed,
		username: trimmed,
		platform
	});
}

export function resolveUserTarget(
	fields: HandlerFieldInstance[],
	context: unknown,
	rankings: RankingsService
): ResolvedUserTarget | null {
	const oneOf = getOneOfFieldValue(fields, 'user');

	if (!oneOf || oneOf.variant === 'trigger') {
		return resolveUserIdentity(context);
	}

	if (oneOf.variant === 'select') {
		if (typeof oneOf.value !== 'string' || !oneOf.value.trim()) {
			return null;
		}

		return resolveUserFromText(oneOf.value, context, rankings);
	}

	if (oneOf.variant === 'variable') {
		if (typeof oneOf.value !== 'string') {
			return null;
		}

		const resolved = interpolateVariables(oneOf.value, contextToVariables(context));

		return resolveUserFromText(resolved, context, rankings);
	}

	return resolveUserIdentity(context);
}

export function userTargetFailureDescription(
	fields: HandlerFieldInstance[]
): string {
	const oneOf = getOneOfFieldValue(fields, 'user');

	if (oneOf?.variant === 'select') {
		return 'Select a ranked user.';
	}

	if (oneOf?.variant === 'variable') {
		return 'Enter a username, user ID, or variable that resolves to one.';
	}

	return 'No user found in trigger context.';
}
