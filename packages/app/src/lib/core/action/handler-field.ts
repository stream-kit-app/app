import type { ConditionGroupNode } from './trigger/condition';
import type {
	HandlerFieldDefinition,
	HandlerFieldInstance,
	HandlerFieldValue
} from './handler/field';

export function createHandlerFields(
	definitions: HandlerFieldDefinition[] | undefined,
	stored?: HandlerFieldInstance[]
): HandlerFieldInstance[] {
	return (definitions ?? []).map((definition) => {
		const existing = stored?.find((field) => field.key === definition.key);

		return {
			id: existing?.id ?? crypto.randomUUID(),
			key: definition.key,
			value: existing?.value ?? initHandlerFieldValue(definition)
		};
	});
}

export function initHandlerFieldValue(definition: HandlerFieldDefinition): HandlerFieldValue {
	if (definition.defaultValue !== undefined) {
		return definition.defaultValue;
	}

	if (definition.type === 'text' || definition.type === 'select') {
		return '';
	}

	return false;
}

export function getHandlerFieldDefinition(
	definitions: HandlerFieldDefinition[] | undefined,
	key: string
): HandlerFieldDefinition | undefined {
	return definitions?.find((field) => field.key === key);
}

export function getHandlerFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => field.key === key)?.value;
}

export function isHandlerFieldValueEmpty(
	definition: HandlerFieldDefinition,
	value: HandlerFieldValue
): boolean {
	if (definition.type === 'text' || definition.type === 'select') {
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
export function migrateLegacyHandlerFields(
	stored: { fields?: HandlerFieldInstance[]; config?: ConditionGroupNode }
): HandlerFieldInstance[] {
	if (stored.fields) {
		return stored.fields;
	}

	if (!stored.config) {
		return [];
	}

	return collectLegacyHandlerFields(stored.config).map((leaf) => ({
		id: leaf.id,
		key: leaf.key,
		value: typeof leaf.value === 'object' && leaf.value !== null && 'value' in leaf.value
			? String(leaf.value.value)
			: (leaf.value as HandlerFieldValue)
	}));
}
