import type { ConditionDefinition, FieldValue } from '../../action/trigger/condition';

import { getValueAtPath } from './json-path';
import { matchText } from './match-text';

export const messageMatchOperators = [
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'contains', label: 'Contains' },
	{ value: 'equals', label: 'Equals' }
] as const;

export function overlaySelectCondition(
	items: () => Promise<Array<{ value: string; label: string }>>
): ConditionDefinition {
	return {
		type: 'select',
		name: 'Overlay',
		placeholder: 'Any overlay',
		items
	};
}

export function eventMatchCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Event',
		placeholder: 'Event name',
		defaultValue: { type: 'equals', value: '' },
		items: [...messageMatchOperators]
	};
}

export function jsonFieldCondition(): ConditionDefinition {
	return {
		type: 'text-select-text',
		name: 'JSON field',
		pathPlaceholder: 'id',
		valuePlaceholder: 'follow',
		defaultValue: { path: '', type: 'equals', value: '' },
		items: [...messageMatchOperators]
	};
}

export function evaluateOverlayMatch(actualId: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	return actualId === value.trim();
}

export function evaluateEventMatch(event: string, value: FieldValue): boolean {
	if (!value || typeof value !== 'object' || !('value' in value)) {
		return true;
	}

	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(event, match.type, match.value);
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

export function evaluateJsonFieldMatch(payload: unknown, value: FieldValue): boolean {
	if (!isTextSelectTextValue(value)) {
		return true;
	}

	const path = value.path.trim();

	if (!path) {
		return true;
	}

	const resolved = getValueAtPath(payload, path);

	if (resolved === undefined) {
		return false;
	}

	return evaluateEventMatch(resolved, { type: value.type, value: value.value });
}
