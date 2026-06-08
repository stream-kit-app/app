import type { ConditionDefinition, FieldValue, HandlerFieldVariable } from '@stream-kit/core';

import { matchText } from '../match-text';

export const messageMatchOperators = [
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'contains', label: 'Contains' },
	{ value: 'equals', label: 'Equals' }
] as const;

export const userMatchOperators = [
	{ value: 'equals', label: 'Equals' },
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'contains', label: 'Contains' }
] as const;

export const roleItems = [
	{ value: 'mod', label: 'Mod' },
	{ value: 'broadcaster', label: 'Broadcaster' },
	{ value: 'vip', label: 'VIP' },
	{ value: 'subscriber', label: 'Subscriber' },
	{ value: 'artist', label: 'Artist' },
	{ value: 'founder', label: 'Founder' }
] as const;

export const subTierItems = [
	{ value: '1000', label: 'Tier 1' },
	{ value: '2000', label: 'Tier 2' },
	{ value: '3000', label: 'Tier 3' },
	{ value: 'Prime', label: 'Prime' }
] as const;

export function messageMatchCondition(
	key = 'match',
	name = 'Message',
	options?: { variables?: HandlerFieldVariable[] }
): ConditionDefinition {
	return {
		type: 'select-text',
		key,
		name,
		placeholder: 'Trigger Value',
		defaultValue: { type: 'contains', value: '' },
		items: [...messageMatchOperators],
		...(options?.variables && options.variables.length > 0 ? { variables: options.variables } : {})
	};
}

export function roleCondition(): ConditionDefinition {
	return {
		type: 'select',
		key: 'role',
		name: 'Role',
		placeholder: 'Role',
		items: [...roleItems]
	};
}

export function userMatchCondition(
	key = 'user',
	name = 'Username',
	placeholder = 'Username (optional)'
): ConditionDefinition {
	return {
		type: 'select-text',
		key,
		name,
		placeholder,
		defaultValue: { type: 'equals', value: '' },
		items: [...userMatchOperators]
	};
}

export function flagCondition(key: string, name: string): ConditionDefinition {
	return {
		type: 'checkbox',
		key,
		name,
		defaultValue: true
	};
}

export function minNumberCondition(key: string, name: string): ConditionDefinition {
	return {
		type: 'text',
		key,
		name,
		placeholder: '0'
	};
}

export function subTierCondition(): ConditionDefinition {
	return {
		type: 'select',
		key: 'tier',
		name: 'Tier',
		placeholder: 'Any tier',
		items: [...subTierItems]
	};
}

export function evaluateMessageMatch(message: string, value: FieldValue): boolean {
	const match = value as { type: string; value: string };
	return matchText(message, match.type, match.value);
}

export function evaluateCommandMatch(command: string | null, value: FieldValue): boolean {
	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	if (!command) {
		return false;
	}

	return matchText(command, match.type, match.value);
}

export function evaluateBooleanFilter(actual: boolean, _value: FieldValue): boolean {
	return actual;
}

export function evaluateUserMatch(username: string, value: FieldValue): boolean {
	if (typeof value === 'string') {
		if (!value.trim()) {
			return true;
		}

		return matchText(username, 'equals', value);
	}

	if (!value || typeof value !== 'object' || !('value' in value)) {
		return true;
	}

	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(username, match.type, match.value);
}

export function evaluateRole(role: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value) {
		return true;
	}

	return role === value;
}

export function evaluateMinNumber(actual: number, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	const min = Number.parseInt(value, 10);

	if (Number.isNaN(min)) {
		return true;
	}

	return actual >= min;
}

export function evaluateRewardId(actual: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	return actual === value.trim();
}

export function evaluateSubTier(actual: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value) {
		return true;
	}

	return actual === value;
}
