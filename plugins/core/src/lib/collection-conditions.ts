import type { ConditionDefinition, FieldValue } from '@stream-kit/plugin';

import type { CollectionChangedContext, CollectionCreatedContext, CollectionLifetime } from './collections/types';
import { matchText } from './match-text';
import { textMatchOperators } from './text-match-operators';

export const collectionNameMatchOperators = textMatchOperators;

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

export function collectionNameCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Collection name',
		placeholder: 'Collection name (e.g. scores)',
		defaultValue: { type: 'equals', value: '' },
		items: [...collectionNameMatchOperators],
		variables: [{ key: 'collectionName', label: 'Collection name' }]
	};
}

export function collectionKeyCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Key',
		placeholder: 'Key (leave empty for any)',
		defaultValue: { type: 'equals', value: '' },
		items: [...collectionNameMatchOperators],
		variables: [{ key: 'key', label: 'Key' }]
	};
}

export function collectionLifetimeCondition(): ConditionDefinition {
	return {
		type: 'select',
		name: 'Lifetime',
		defaultValue: LIFETIME_ANY,
		items: lifetimeConditionItems.map((item) => ({ value: item.value, label: item.label }))
	};
}

export function collectionChangeTypeCondition(): ConditionDefinition {
	return {
		type: 'select',
		name: 'Change type',
		defaultValue: 'any',
		items: changeTypeConditionItems.map((item) => ({ value: item.value, label: item.label }))
	};
}

export function collectionPreviousValueCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Previous value',
		placeholder: 'Previous value (leave empty for any)',
		defaultValue: { type: 'equals', value: '' },
		items: [...collectionNameMatchOperators],
		variables: [{ key: 'previousValue', label: 'Previous value' }]
	};
}

export function collectionValueCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Value',
		placeholder: 'Value (leave empty for any)',
		defaultValue: { type: 'equals', value: '' },
		items: [...collectionNameMatchOperators],
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

export function evaluateCollectionNameMatch(
	ctx: CollectionCreatedContext | CollectionChangedContext,
	value: FieldValue
): boolean {
	return evaluateTextMatch(ctx.collectionName, value);
}

export function evaluateCollectionKeyMatch(
	ctx: CollectionChangedContext,
	value: FieldValue
): boolean {
	return evaluateTextMatch(ctx.key, value);
}

export function evaluateCollectionLifetimeMatch(
	ctx: CollectionCreatedContext | CollectionChangedContext,
	value: FieldValue
): boolean {
	if (typeof value !== 'string' || value === LIFETIME_ANY || !value.trim()) {
		return true;
	}

	return ctx.lifetime === (value as CollectionLifetime);
}

export function evaluateCollectionChangeTypeMatch(
	ctx: CollectionChangedContext,
	value: FieldValue
): boolean {
	if (typeof value !== 'string' || value === 'any' || !value.trim()) {
		return true;
	}

	return ctx.changeType === value;
}

export function evaluateCollectionPreviousValueMatch(
	ctx: CollectionChangedContext,
	value: FieldValue
): boolean {
	return evaluateTextMatch(ctx.previousValue, value);
}

export function evaluateCollectionValueMatch(
	ctx: CollectionChangedContext,
	value: FieldValue
): boolean {
	return evaluateTextMatch(ctx.value, value);
}
