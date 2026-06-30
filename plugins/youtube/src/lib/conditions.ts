import type { ConditionDefinition, FieldValue, HandlerFieldVariable } from '@stream-kit/plugin';

import {
	hasCommandArgPlaceholders,
	matchCommandPattern,
	parseCommand
} from '@stream-kit/core';

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
	{ value: 'owner', label: 'Owner' },
	{ value: 'moderator', label: 'Moderator' },
	{ value: 'sponsor', label: 'Member' },
	{ value: 'viewer', label: 'Viewer' }
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

export function minNumberCondition(key: string, name: string): ConditionDefinition {
	return {
		type: 'text',
		key,
		name,
		placeholder: '0'
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

export function evaluateCommandMessageMatch(
	message: string,
	prefix: string,
	value: FieldValue
): boolean {
	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	if (hasCommandArgPlaceholders(match.value)) {
		return matchCommandPattern(match.value, message, prefix) !== null;
	}

	return evaluateCommandMatch(parseCommand(message, prefix), value);
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

export function evaluateMinTier(actual: number, value: FieldValue): boolean {
	return evaluateMinNumber(actual, value);
}
