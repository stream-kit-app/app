import type { ConditionDefinition, FieldValue } from '@stream-kit/core';

import { getValueAtPath } from './json-path';
import { matchText } from './match-text';

export const messageMatchOperators = [
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'contains', label: 'Contains' },
	{ value: 'equals', label: 'Equals' }
] as const;

export function connectionSelectCondition(
	items: () => Promise<Array<{ value: string; label: string }>>
): ConditionDefinition {
	return {
		type: 'select',
		name: 'Connection',
		placeholder: 'Any connection',
		items
	};
}

export function messageMatchCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Message',
		placeholder: 'Message',
		defaultValue: { type: 'contains', value: '' },
		items: [...messageMatchOperators]
	};
}

export function jsonPathCondition(): ConditionDefinition {
	return {
		type: 'text',
		name: 'JSON path',
		placeholder: 'data.type'
	};
}

export function jsonValueMatchCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'JSON value',
		placeholder: 'Value at JSON path',
		defaultValue: { type: 'equals', value: '' },
		items: [...messageMatchOperators]
	};
}

export function evaluateConnectionMatch(actualId: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	return actualId === value.trim();
}

export function evaluateMessageMatch(message: string, value: FieldValue): boolean {
	if (!value || typeof value !== 'object' || !('value' in value)) {
		return true;
	}

	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(message, match.type, match.value);
}

export function evaluateJsonPathMatch(
	isJson: boolean,
	data: unknown,
	jsonPath: FieldValue,
	jsonMatch: FieldValue
): boolean {
	if (typeof jsonPath !== 'string' || !jsonPath.trim()) {
		return true;
	}

	if (!isJson) {
		return false;
	}

	const resolved = getValueAtPath(data, jsonPath);

	if (resolved === undefined) {
		return false;
	}

	return evaluateMessageMatch(resolved, jsonMatch);
}
