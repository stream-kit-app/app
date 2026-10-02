import type { PluginAppApi, SelectItem } from '@stream-kit/plugin';

type HandlerDefinition = ReturnType<PluginAppApi['actions']['getHandlers']>[number];
type TriggerDefinition = ReturnType<PluginAppApi['actions']['getTriggers']>[number];
type HandlerField = NonNullable<HandlerDefinition['fields']>[number];
type TriggerCondition = NonNullable<TriggerDefinition['conditions']>[number];

const ITEMS_TIMEOUT_MS = 3000;
const MAX_ITEMS = 50;

export type CatalogField = {
	key: string;
	name: string;
	type: string;
	required?: boolean;
	default?: unknown;
	/** Allowed values for select-like fields; `null` when they could not be loaded. */
	items?: string[] | null;
	conditions?: CatalogField[];
	variants?: Array<{ id: string; field: CatalogField }>;
};

export type CatalogTrigger = {
	id: string;
	name: string;
	conditions: CatalogField[];
	variables: string[];
};

export type CatalogHandler = {
	id: string;
	name: string;
	fields: CatalogField[];
	outputs: string[];
};

export type Catalog = {
	triggers: CatalogTrigger[];
	handlers: CatalogHandler[];
};

/** Definition ids and field keys the model may use, for validating its output. */
export type CatalogIndex = {
	triggers: Map<string, CatalogTrigger>;
	handlers: Map<string, CatalogHandler>;
};

type ItemsSource =
	| SelectItem[]
	| ((...args: never[]) => SelectItem[] | Promise<SelectItem[]>)
	| undefined;

async function resolveItems(source: ItemsSource): Promise<string[] | null> {
	if (!source) {
		return null;
	}

	try {
		const items =
			typeof source === 'function'
				? await Promise.race([
						Promise.resolve(
							(source as (context: unknown) => SelectItem[] | Promise<SelectItem[]>)({
								getFieldValue: () => undefined
							})
						),
						new Promise<null>((resolve) => setTimeout(() => resolve(null), ITEMS_TIMEOUT_MS))
					])
				: source;

		if (!items) {
			return null;
		}

		return items
			.filter((item) => !item.disabled)
			.slice(0, MAX_ITEMS)
			.map((item) => item.value);
	} catch {
		return null;
	}
}

async function describeCondition(condition: TriggerCondition): Promise<CatalogField> {
	const field: CatalogField = {
		key: condition.key,
		name: condition.name,
		type: condition.type
	};

	if (condition.required) {
		field.required = true;
	}

	if ('items' in condition) {
		field.items = await resolveItems(condition.items as ItemsSource);
	}

	return field;
}

async function describeField(definition: HandlerField): Promise<CatalogField> {
	const field: CatalogField = {
		key: definition.key ?? '',
		name: definition.name,
		type: definition.type
	};

	if (definition.required) {
		field.required = true;
	}

	if (definition.defaultValue !== undefined) {
		field.default = definition.defaultValue;
	}

	if (definition.type === 'select' || definition.type === 'combobox' || definition.type === 'text-select-text') {
		field.items = await resolveItems(definition.items as ItemsSource);
	}

	if (definition.type === 'condition-group') {
		// Condition keys are resolved when the handler definition is registered.
		field.conditions = await Promise.all(
			definition.conditions.map((condition) => describeCondition(condition as TriggerCondition))
		);
	}

	if (definition.type === 'one-of') {
		field.variants = await Promise.all(
			definition.variants.map(async (variant) => ({
				id: variant.id,
				field: await describeField({
					...variant.field,
					key: variant.field.key ?? variant.id
				} as HandlerField)
			}))
		);
	}

	return field;
}

function listOutputs(definition: HandlerDefinition): string[] {
	try {
		const outputs =
			typeof definition.outputs === 'function'
				? definition.outputs({ getFieldValue: () => undefined })
				: (definition.outputs ?? []);

		return outputs.map((output) => output.key).filter(Boolean);
	} catch {
		return [];
	}
}

function listVariables(definition: TriggerDefinition): string[] {
	// Function sources need a trigger instance; the model falls back to the catalog notes.
	if (!Array.isArray(definition.variables)) {
		return [];
	}

	return definition.variables.map((variable) => variable.key).filter(Boolean);
}

function flatten<T extends { children: { items: T[] }; isAvailable: boolean }>(items: T[]): T[] {
	return items.flatMap((item) => {
		if (!item.isAvailable) {
			return [];
		}

		return item.children.items.length > 0 ? flatten(item.children.items) : [item];
	});
}

const byId = (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id);

/**
 * Leaf triggers and handlers of enabled plugins, sorted by id so the serialized
 * catalog stays byte-stable (it is the prompt-cache prefix on the server).
 */
export async function buildCatalog(app: PluginAppApi): Promise<Catalog> {
	const triggers = await Promise.all(
		flatten(app.actions.getTriggers()).map(async (definition) => ({
			id: definition.id,
			name: definition.name,
			conditions: await Promise.all((definition.conditions ?? []).map(describeCondition)),
			variables: listVariables(definition)
		}))
	);

	const handlers = await Promise.all(
		flatten(app.actions.getHandlers()).map(async (definition) => ({
			id: definition.id,
			name: definition.name,
			fields: await Promise.all((definition.fields ?? []).map(describeField)),
			outputs: listOutputs(definition)
		}))
	);

	return {
		triggers: triggers.sort(byId),
		handlers: handlers.sort(byId)
	};
}

export function serializeCatalog(catalog: Catalog): string {
	return JSON.stringify(catalog);
}

export function indexCatalog(catalog: Catalog): CatalogIndex {
	return {
		triggers: new Map(catalog.triggers.map((trigger) => [trigger.id, trigger])),
		handlers: new Map(catalog.handlers.map((handler) => [handler.id, handler]))
	};
}
