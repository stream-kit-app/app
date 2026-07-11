import type {
	HandlerFieldDefinition,
	HandlerFieldInstance,
	HandlerFieldScalarValue,
	HandlerFieldValue,
	OneOfFieldValue,
	ResolvedHandlerFieldDefinition
} from './handler/field';
import type { ConditionGroupNode } from './trigger/condition';
import { isOneOfFieldValue } from '@stream-kit/core';

export function createHandlerFields(
	definitions: ResolvedHandlerFieldDefinition[] | undefined,
	stored?: HandlerFieldInstance[]
): HandlerFieldInstance[] {
	return (definitions ?? []).map((definition) => {
		const existing = stored?.find((field) => field.key === definition.key);

		return {
			id: existing?.id ?? crypto.randomUUID(),
			key: definition.key,
			value:
				coerceLegacyOneOfFieldValue(definition, existing?.value) ??
				migrateOneOfFieldValue(definition, stored) ??
				initHandlerFieldValue(definition)
		};
	});
}

function coerceLegacyOneOfFieldValue(
	definition: ResolvedHandlerFieldDefinition,
	value: HandlerFieldValue | undefined
): HandlerFieldValue | undefined {
	if (value === undefined || definition.type !== 'one-of' || isOneOfFieldValue(value)) {
		return value;
	}

	if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
		return value;
	}

	const defaultVariant = definition.defaultVariant ?? definition.variants[0]?.id ?? '';
	const scalarValue = value as HandlerFieldScalarValue;
	const values: Record<string, HandlerFieldScalarValue> = {};

	for (const variant of definition.variants) {
		values[variant.id] =
			variant.id === defaultVariant ? scalarValue : initInnerHandlerFieldValue(variant.field);
	}

	return {
		variant: defaultVariant,
		values
	} satisfies OneOfFieldValue;
}

function initInnerHandlerFieldValue(
	definition: HandlerFieldDefinition
): HandlerFieldScalarValue {
	if (definition.defaultValue !== undefined) {
		return definition.defaultValue as HandlerFieldScalarValue;
	}

	if (definition.type === 'key-value-list') {
		return [];
	}

	if (definition.type === 'slider') {
		return definition.defaultValue ?? definition.min;
	}

	if (definition.type === 'text-select-text') {
		return { path: '', type: 'equals', value: '', negate: false };
	}

	if (
		definition.type === 'text' ||
		definition.type === 'select' ||
		definition.type === 'combobox' ||
		definition.type === 'select-file-or-folder' ||
		definition.type === 'code' ||
		definition.type === 'json' ||
		definition.type === 'hotkey'
	) {
		return '';
	}

	return false;
}

export function initHandlerFieldValue(
	definition: ResolvedHandlerFieldDefinition
): HandlerFieldValue {
	if (definition.type === 'one-of') {
		const defaultVariant = definition.defaultVariant ?? definition.variants[0]?.id ?? '';
		const values: Record<string, HandlerFieldScalarValue> = {};

		for (const variant of definition.variants) {
			values[variant.id] = initInnerHandlerFieldValue(variant.field);
		}

		return {
			variant: defaultVariant,
			values
		} satisfies OneOfFieldValue;
	}

	return initInnerHandlerFieldValue(definition);
}

function migrateOneOfFieldValue(
	definition: ResolvedHandlerFieldDefinition,
	stored?: HandlerFieldInstance[]
): OneOfFieldValue | undefined {
	if (definition.type !== 'one-of' || !stored?.length || !definition.migrateFrom?.length) {
		return undefined;
	}

	if (stored.some((field) => field.key === definition.key)) {
		return undefined;
	}

	for (const migration of definition.migrateFrom) {
		const legacyValues = new Map<string, HandlerFieldScalarValue>();

		for (const legacyKey of migration.keys) {
			const legacyField = stored.find((field) => field.key === legacyKey);

			if (!legacyField) {
				continue;
			}

			const variantId = migration.variantMap[legacyKey];

			if (!variantId) {
				continue;
			}

			legacyValues.set(variantId, legacyField.value as HandlerFieldScalarValue);
		}

		if (legacyValues.size === 0) {
			continue;
		}

		const defaultVariant = definition.defaultVariant ?? definition.variants[0]?.id ?? '';
		let activeVariant = defaultVariant;

		for (const legacyKey of migration.keys) {
			const variantId = migration.variantMap[legacyKey];
			const legacyField = stored.find((field) => field.key === legacyKey);
			const legacyValue = legacyField?.value;

			if (
				variantId &&
				typeof legacyValue === 'string' &&
				legacyValue.trim() &&
				!isInnerHandlerFieldValueEmpty(
					definition.variants.find((variant) => variant.id === variantId)?.field,
					legacyValue
				)
			) {
				activeVariant = variantId;
				break;
			}
		}

		const values: Record<string, HandlerFieldScalarValue> = {};

		for (const variant of definition.variants) {
			values[variant.id] =
				legacyValues.get(variant.id) ?? initInnerHandlerFieldValue(variant.field);
		}

		return {
			variant: activeVariant,
			values
		};
	}

	return undefined;
}

function isInnerHandlerFieldValueEmpty(
	definition: HandlerFieldDefinition | undefined,
	value: HandlerFieldScalarValue
): boolean {
	if (!definition) {
		return true;
	}

	if (definition.type === 'one-of') {
		return true;
	}

	return isHandlerFieldValueEmpty(
		{ ...definition, key: 'inner' } as ResolvedHandlerFieldDefinition,
		value
	);
}

export function getHandlerFieldDefinition(
	definitions: ResolvedHandlerFieldDefinition[] | undefined,
	key: string
): ResolvedHandlerFieldDefinition | undefined {
	return definitions?.find((field) => field.key === key);
}

export function getHandlerFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => field.key === key)?.value;
}

export function isHandlerFieldValueEmpty(
	definition: ResolvedHandlerFieldDefinition,
	value: HandlerFieldValue
): boolean {
	if (definition.type === 'one-of') {
		if (!value || typeof value !== 'object' || !('variant' in value) || !('values' in value)) {
			return true;
		}

		const oneOf = value as OneOfFieldValue;
		const activeVariant = definition.variants.find((variant) => variant.id === oneOf.variant);

		if (!activeVariant) {
			return true;
		}

		const activeValue = oneOf.values[oneOf.variant];

		return isInnerHandlerFieldValueEmpty(activeVariant.field, activeValue);
	}

	if (definition.type === 'key-value-list') {
		if (!Array.isArray(value) || value.length === 0) {
			return true;
		}

		return value.every((entry) => !entry.key.trim());
	}

	if (definition.type === 'text-select-text') {
		if (!value || typeof value !== 'object' || !('path' in value)) {
			return true;
		}

		const compound = value as { path: string; type: string; value: string };
		const valuelessOperators = definition.valuelessOperators ?? [];

		if (valuelessOperators.includes(compound.type)) {
			return !compound.path.trim();
		}

		return !compound.path.trim() || !compound.value.trim();
	}

	if (
		definition.type === 'text' ||
		definition.type === 'select' ||
		definition.type === 'combobox' ||
		definition.type === 'select-file-or-folder' ||
		definition.type === 'code' ||
		definition.type === 'json' ||
		definition.type === 'hotkey'
	) {
		return !String(value ?? '').trim();
	}

	return false;
}

type LegacyHandlerFieldLeaf = {
	id: string;
	key: string;
	value: string | boolean | { type: string; value: string };
};

function collectLegacyHandlerFields(group: ConditionGroupNode): LegacyHandlerFieldLeaf[] {
	return group.children.flatMap((child) => {
		if (child.kind === 'condition') {
			return [child as LegacyHandlerFieldLeaf];
		}

		return collectLegacyHandlerFields(child);
	});
}

/** Converts legacy handler `config` condition trees to flat field instances. */
export function migrateLegacyHandlerFields(stored: {
	fields?: HandlerFieldInstance[];
	config?: ConditionGroupNode;
}): HandlerFieldInstance[] {
	if (stored.fields) {
		return stored.fields;
	}

	if (!stored.config) {
		return [];
	}

	return collectLegacyHandlerFields(stored.config).map((leaf) => ({
		id: leaf.id,
		key: leaf.key,
		value:
			typeof leaf.value === 'object' && leaf.value !== null && 'value' in leaf.value
				? String(leaf.value.value)
				: (leaf.value as HandlerFieldValue)
	}));
}
