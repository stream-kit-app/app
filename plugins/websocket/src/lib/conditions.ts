import type { ConditionDefinition, FieldValue } from '@stream-kit/plugin';

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

export function jsonFieldCondition(): ConditionDefinition {
	return {
		type: 'text-select-text',
		name: 'JSON field',
		pathPlaceholder: 'data.topic',
		valuePlaceholder: 'game.lobby.joined',
		defaultValue: { path: '', type: 'equals', value: '' },
		items: [...messageMatchOperators]
	};
}

export function evaluateConnectionMatch(
	actualId: string,
	value: FieldValue,
	affectedConnectionIds?: string[]
): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	const selected = value.trim();

	if (affectedConnectionIds?.includes(selected)) {
		return true;
	}

	return actualId === selected;
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

function isTextSelectTextValue(
	value: FieldValue
): value is { path: string; type: string; value: string } {
	return (
		typeof value === 'object' &&
		value !== null &&
		'path' in value &&
		'type' in value &&
		'value' in value
	);
}

export function evaluateJsonFieldMatch(isJson: boolean, data: unknown, value: FieldValue): boolean {
	console.log('evaluateJsonFieldMatch', isJson, data, value);

	if (!isTextSelectTextValue(value)) {
		return true;
	}

	const path = value.path.trim();

	if (!path) {
		return true;
	}

	if (!isJson) {
		return false;
	}

	const resolved = getValueAtPath(data, path);

	if (resolved === undefined) {
		return false;
	}

	return evaluateMessageMatch(resolved, { type: value.type, value: value.value });
}
