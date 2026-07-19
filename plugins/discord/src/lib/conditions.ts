import type { ConditionDefinition, FieldValue, HandlerFieldVariable } from '@stream-kit/plugin';

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

export function messageMatchCondition(
	options?: { variables?: HandlerFieldVariable[] }
): ConditionDefinition {
	return {
		type: 'select-text',
		key: 'match',
		name: 'Message',
		placeholder: 'Trigger value',
		defaultValue: { type: 'contains', value: '' },
		items: [...messageMatchOperators],
		...(options?.variables && options.variables.length > 0
			? { variables: options.variables }
			: {})
	} as ConditionDefinition;
}

export function userMatchCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		key: 'user',
		name: 'Username',
		placeholder: 'Username (optional)',
		defaultValue: { type: 'equals', value: '' },
		items: [...userMatchOperators]
	} as ConditionDefinition;
}

export function textEqualsCondition(
	key: string,
	name: string,
	placeholder: string
): ConditionDefinition {
	return {
		type: 'text',
		key,
		name,
		placeholder
	} as ConditionDefinition;
}

export function evaluateMessageMatch(message: string, value: FieldValue): boolean {
	const match = value as { type: string; value: string };
	return matchText(message, match.type, match.value);
}

export function evaluateUserMatch(user: string, value: FieldValue): boolean {
	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(user, match.type, match.value);
}

export function evaluateOptionalEquals(actual: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	return actual.toLowerCase() === value.trim().toLowerCase() || actual === value.trim();
}
