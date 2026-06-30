import type {
	ConditionGroupNode,
	ConditionLeafNode,
	FieldValue
} from '$lib/core/action/trigger/condition';
import type {
	HandlerFieldInstance,
	HandlerFieldScalarValue,
	HandlerFieldValue
} from '$lib/core/action/handler/field';
import type { StoredActionHandler, StoredActionTrigger } from '$lib/core/action/stored-action';

const DEFINITION_ID_REPLACEMENTS: ReadonlyArray<[string, string]> = [
	['core:core:map:map-value-changed', 'core:core:collection:collection-value-changed'],
	['core:core:map:map-created', 'core:core:collection:collection-created'],
	['core:core:map:create-map', 'core:core:collection:create-collection'],
	['core:core:map:clear-map', 'core:core:collection:clear-collection'],
	['core:core:map:delete-map', 'core:core:collection:delete-collection'],
	['core:core:map:', 'core:core:collection:'],
	['core:core.map.map-value-changed', 'core:core.collection.collection-value-changed'],
	['core:core.map.map-created', 'core:core.collection.collection-created'],
	['core:core.map.create-map', 'core:core.collection.create-collection'],
	['core:core.map.clear-map', 'core:core.collection.clear-collection'],
	['core:core.map.delete-map', 'core:core.collection.delete-collection'],
	['core:core.map.', 'core:core.collection.'],
	['core:maps', 'core:collections']
];

function migrateDefinitionId(id: string): string {
	let result = id;

	for (const [from, to] of DEFINITION_ID_REPLACEMENTS) {
		result = result.replaceAll(from, to);
	}

	return result;
}

function migrateFieldKey(key: string): string {
	return key === 'map-name' ? 'collection-name' : key;
}

function migrateInterpolatedText(value: string): string {
	return value.replaceAll('{mapName}', '{collectionName}');
}

function migrateFieldScalarValue(value: HandlerFieldScalarValue): HandlerFieldScalarValue {
	if (typeof value === 'string') {
		return migrateInterpolatedText(value);
	}

	if (typeof value === 'number' || typeof value === 'boolean') {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((entry) => ({
			key: migrateInterpolatedText(entry.key),
			value: migrateInterpolatedText(entry.value)
		}));
	}

	return {
		...value,
		path: migrateInterpolatedText(value.path),
		value: migrateInterpolatedText(value.value)
	};
}

function migrateFieldValue(value: HandlerFieldValue): HandlerFieldValue {
	if (typeof value === 'object' && value !== null && 'variant' in value && 'values' in value) {
		const nextValues: Record<string, HandlerFieldScalarValue> = {};

		for (const [key, nestedValue] of Object.entries(value.values)) {
			nextValues[migrateFieldKey(key)] = migrateFieldScalarValue(nestedValue);
		}

		return {
			variant: value.variant,
			values: nextValues
		};
	}

	return migrateFieldScalarValue(value);
}

function migrateConditionFieldValue(value: FieldValue): FieldValue {
	if (typeof value === 'string') {
		return migrateInterpolatedText(value);
	}

	if (typeof value === 'boolean') {
		return value;
	}

	if ('path' in value) {
		return {
			...value,
			path: migrateInterpolatedText(value.path),
			value: migrateInterpolatedText(value.value)
		};
	}

	return {
		...value,
		value: migrateInterpolatedText(value.value)
	};
}

function migrateHandlerField(field: HandlerFieldInstance): HandlerFieldInstance {
	return {
		...field,
		key: migrateFieldKey(field.key),
		value: migrateFieldValue(field.value)
	};
}

function migrateConditionLeafNode(node: ConditionLeafNode): ConditionLeafNode {
	return {
		...node,
		key: migrateFieldKey(node.key),
		value: migrateConditionFieldValue(node.value)
	};
}

function migrateConditionGroupNode(node: ConditionGroupNode): ConditionGroupNode {
	return {
		...node,
		children: node.children.map((child) =>
			child.kind === 'group' ? migrateConditionGroupNode(child) : migrateConditionLeafNode(child)
		)
	};
}

function migrateHandler(stored: StoredActionHandler): StoredActionHandler {
	return {
		...stored,
		handlerTypeId: migrateDefinitionId(stored.handlerTypeId),
		fields: stored.fields.map(migrateHandlerField),
		config: stored.config ? migrateConditionGroupNode(stored.config) : undefined
	};
}

function migrateTrigger(stored: StoredActionTrigger): StoredActionTrigger {
	return {
		...stored,
		triggerTypeId: migrateDefinitionId(stored.triggerTypeId),
		conditions: migrateConditionGroupNode(stored.conditions)
	};
}

export function migrateStoredActionHandlers(raw: string): string {
	return migrateStoredJsonArray(raw, migrateHandler);
}

export function migrateStoredActionTriggers(raw: string): string {
	return migrateStoredJsonArray(raw, migrateTrigger);
}

function migrateStoredJsonArray<T>(raw: string, migrateItem: (item: T) => T): string {
	if (!raw.includes('map')) {
		return raw;
	}

	let parsed: T[];

	try {
		parsed = JSON.parse(raw) as T[];
	} catch {
		return raw;
	}

	if (!Array.isArray(parsed)) {
		return raw;
	}

	return JSON.stringify(parsed.map(migrateItem));
}

export type PluginStoreMapsMigrationResult = {
	migrated: boolean;
	collectionCount: number;
};

export function migratePluginStoreMapsKey(
	store: Record<string, unknown> | null | undefined
): PluginStoreMapsMigrationResult {
	if (!store || typeof store !== 'object') {
		return { migrated: false, collectionCount: 0 };
	}

	if (!Object.hasOwn(store, 'maps')) {
		return {
			migrated: false,
			collectionCount: Object.hasOwn(store, 'collections')
				? Object.keys(store.collections as Record<string, unknown>).length
				: 0
		};
	}

	const maps = store.maps;

	if (maps && typeof maps === 'object' && !Object.hasOwn(store, 'collections')) {
		store.collections = maps;
	}

	delete store.maps;

	return {
		migrated: true,
		collectionCount:
			store.collections && typeof store.collections === 'object'
				? Object.keys(store.collections as Record<string, unknown>).length
				: 0
	};
}
