import type { ConditionDefinition, FieldValue } from '@stream-kit/plugin';

import type { MapChangedContext, MapCreatedContext, MapLifetime } from './maps/types';
import { matchText } from './match-text';
import { textMatchOperators } from './text-match-operators';

export const mapNameMatchOperators = textMatchOperators;

const LIFETIME_ANY = 'any';

export const lifetimeConditionItems = [
	{ value: LIFETIME_ANY, label: 'Any' },
	{ value: 'session', label: 'Session' },
	{ value: 'persistent', label: 'Persistent' }
] as const;

export const changeTypeConditionItems = [
	{ value: 'any', label: 'Any' },
	{ value: 'set', label: 'Set' },
	{ value: 'update', label: 'Update' },
	{ value: 'delete', label: 'Delete' },
	{ value: 'clear', label: 'Clear' }
] as const;

export function mapNameCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Map name',
		placeholder: 'Map name (e.g. scores)',
		defaultValue: { type: 'equals', value: '' },
		items: [...mapNameMatchOperators],
		variables: [{ key: 'mapName', label: 'Map name' }]
	};
}

export function mapKeyCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Key',
		placeholder: 'Key (leave empty for any)',
		defaultValue: { type: 'equals', value: '' },
		items: [...mapNameMatchOperators],
		variables: [{ key: 'key', label: 'Key' }]
	};
}

export function mapLifetimeCondition(): ConditionDefinition {
	return {
		type: 'select',
		name: 'Lifetime',
		defaultValue: LIFETIME_ANY,
		items: lifetimeConditionItems.map((item) => ({ value: item.value, label: item.label }))
	};
}

export function mapChangeTypeCondition(): ConditionDefinition {
	return {
		type: 'select',
		name: 'Change type',
		defaultValue: 'any',
		items: changeTypeConditionItems.map((item) => ({ value: item.value, label: item.label }))
	};
}

export function mapPreviousValueCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Previous value',
		placeholder: 'Previous value (leave empty for any)',
		defaultValue: { type: 'equals', value: '' },
		items: [...mapNameMatchOperators],
		variables: [{ key: 'previousValue', label: 'Previous value' }]
	};
}

export function mapValueCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Value',
		placeholder: 'Value (leave empty for any)',
		defaultValue: { type: 'equals', value: '' },
		items: [...mapNameMatchOperators],
		variables: [{ key: 'value', label: 'Value' }]
	};
}

function evaluateTextMatch(actual: string | undefined, value: FieldValue): boolean {
	if (!value || typeof value !== 'object' || !('value' in value)) {
		return true;
	}

	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(actual ?? '', match.type, match.value);
}

export function evaluateMapNameMatch(
	ctx: MapCreatedContext | MapChangedContext,
	value: FieldValue
): boolean {
	return evaluateTextMatch(ctx.mapName, value);
}

export function evaluateMapKeyMatch(ctx: MapChangedContext, value: FieldValue): boolean {
	return evaluateTextMatch(ctx.key, value);
}

export function evaluateMapLifetimeMatch(
	ctx: MapCreatedContext | MapChangedContext,
	value: FieldValue
): boolean {
	if (typeof value !== 'string' || value === LIFETIME_ANY || !value.trim()) {
		return true;
	}

	return ctx.lifetime === (value as MapLifetime);
}

export function evaluateMapChangeTypeMatch(ctx: MapChangedContext, value: FieldValue): boolean {
	if (typeof value !== 'string' || value === 'any' || !value.trim()) {
		return true;
	}

	return ctx.changeType === value;
}

export function evaluateMapPreviousValueMatch(ctx: MapChangedContext, value: FieldValue): boolean {
	return evaluateTextMatch(ctx.previousValue, value);
}

export function evaluateMapValueMatch(ctx: MapChangedContext, value: FieldValue): boolean {
	return evaluateTextMatch(ctx.value, value);
}
