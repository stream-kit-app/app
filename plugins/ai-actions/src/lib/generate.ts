import type {
	ConditionGroupNode,
	ConditionNode,
	HandlerFieldInstance,
	HandlerFieldValue,
	PluginAppApi
} from '@stream-kit/plugin';

import {
	buildCatalog,
	indexCatalog,
	serializeCatalog,
	type CatalogField,
	type CatalogIndex
} from './catalog';

type DraftRecord = Parameters<PluginAppApi['actions']['openDraft']>[0];
type DraftTrigger = DraftRecord['triggers'][number];
type DraftHandler = DraftRecord['handlers'][number];

const GENERATE_ROUTE = '/api/ai/generate-action';
const IF_HANDLER_ID = 'core:core:utility:if';

type GeneratedField = { key: string; valueJson: string };

type GeneratedHandler = {
	id: string;
	handlerTypeId: string;
	fields: GeneratedField[];
	thenHandlers?: GeneratedHandler[];
	elseHandlers?: GeneratedHandler[];
};

type GeneratedAction = {
	name: string;
	group: string;
	triggers: Array<{ id: string; triggerTypeId: string; conditionsJson: string }>;
	handlers: GeneratedHandler[];
	notes: string[];
};

type GenerateResponse = {
	action: GeneratedAction;
	raw: string;
	remaining: number;
};

export type GenerateResult = {
	record: DraftRecord;
	/** What the AI could not build, plus problems that were dropped from the draft. */
	notes: string[];
	remaining: number;
};

type Conversion = {
	record: DraftRecord;
	errors: string[];
};

function parseJson(text: string): unknown {
	try {
		return JSON.parse(text);
	} catch {
		// Models sometimes return a bare string instead of a JSON-encoded one.
		return text;
	}
}

function isConditionGroup(value: unknown): value is ConditionGroupNode {
	return (
		value != null &&
		typeof value === 'object' &&
		(value as { kind?: unknown }).kind === 'group' &&
		Array.isArray((value as { children?: unknown }).children)
	);
}

/** Re-ids nested nodes and drops conditions whose key is not allowed. */
function normalizeConditionGroup(
	value: unknown,
	allowed: CatalogField[],
	path: string,
	errors: string[]
): ConditionGroupNode {
	if (!isConditionGroup(value)) {
		errors.push(`${path}: conditions must be a group node {"kind":"group","id":"root","children":[]}.`);
		return { kind: 'group', id: 'root', children: [] };
	}

	const keys = new Set(allowed.map((condition) => condition.key));

	const normalizeChildren = (children: ConditionNode[], depth: number): ConditionNode[] =>
		children.flatMap((child, index): ConditionNode[] => {
			const operator = index === 0 ? undefined : child.operator === 'or' ? 'or' : 'and';

			if (child.kind === 'group') {
				if (depth > 0) {
					errors.push(`${path}: nested groups are only allowed directly under root.`);
					return [];
				}

				return [
					{
						kind: 'group',
						id: crypto.randomUUID(),
						operator,
						children: normalizeChildren(child.children ?? [], depth + 1)
					}
				];
			}

			if (!keys.has(child.key)) {
				errors.push(
					`${path}: unknown condition key "${child.key}". Allowed: ${[...keys].join(', ') || 'none'}.`
				);
				return [];
			}

			return [
				{
					kind: 'condition',
					id: crypto.randomUUID(),
					key: child.key,
					value: child.value,
					negate: child.negate === true,
					operator
				}
			];
		});

	return { kind: 'group', id: 'root', children: normalizeChildren(value.children, 0) };
}

function isEmptyValue(value: unknown): boolean {
	return value == null || (typeof value === 'string' && !value.trim());
}

function convertFields(
	handler: GeneratedHandler,
	fields: CatalogField[],
	path: string,
	errors: string[]
): HandlerFieldInstance[] {
	const byKey = new Map(fields.map((field) => [field.key, field]));
	const instances: HandlerFieldInstance[] = [];

	for (const generated of handler.fields ?? []) {
		const definition = byKey.get(generated.key);

		if (!definition) {
			errors.push(
				`${path}: unknown field key "${generated.key}". Allowed: ${[...byKey.keys()].join(', ') || 'none'}.`
			);
			continue;
		}

		let value = parseJson(generated.valueJson) as HandlerFieldValue;

		if (definition.type === 'condition-group') {
			value = normalizeConditionGroup(value, definition.conditions ?? [], `${path} field "${generated.key}"`, errors);
		}

		if (
			definition.type === 'select' &&
			definition.items &&
			typeof value === 'string' &&
			!definition.items.includes(value)
		) {
			errors.push(
				`${path} field "${generated.key}": "${value}" is not one of ${definition.items.join(', ')}.`
			);
			continue;
		}

		instances.push({ id: crypto.randomUUID(), key: generated.key, value });
	}

	for (const definition of fields) {
		if (!definition.required) {
			continue;
		}

		const instance = instances.find((field) => field.key === definition.key);
		if (isEmptyValue(instance?.value ?? definition.default)) {
			errors.push(`${path}: required field "${definition.key}" is empty.`);
		}
	}

	return instances;
}

function convertHandlers(
	handlers: GeneratedHandler[] | undefined,
	index: CatalogIndex,
	path: string,
	errors: string[]
): DraftHandler[] {
	return (handlers ?? []).flatMap((handler, position): DraftHandler[] => {
		const handlerPath = `${path}[${position}] (${handler.handlerTypeId})`;
		const definition = index.handlers.get(handler.handlerTypeId);

		if (!definition) {
			errors.push(`${handlerPath}: unknown handlerTypeId. Use an id from the catalog.`);
			return [];
		}

		const stored: DraftHandler = {
			id: crypto.randomUUID(),
			handlerTypeId: definition.id,
			fields: convertFields(handler, definition.fields, handlerPath, errors)
		};

		const hasBranches = (handler.thenHandlers?.length ?? 0) + (handler.elseHandlers?.length ?? 0) > 0;

		if (definition.id === IF_HANDLER_ID) {
			stored.thenHandlers = convertHandlers(handler.thenHandlers, index, `${handlerPath}.then`, errors);
			stored.elseHandlers = convertHandlers(handler.elseHandlers, index, `${handlerPath}.else`, errors);
		} else if (hasBranches) {
			errors.push(`${handlerPath}: only ${IF_HANDLER_ID} may have thenHandlers/elseHandlers.`);
		}

		return [stored];
	});
}

/** Converts model output to a draft record and collects every validation problem. */
function convert(action: GeneratedAction, index: CatalogIndex): Conversion {
	const errors: string[] = [];

	const triggers = (action.triggers ?? []).flatMap((trigger, position): DraftTrigger[] => {
		const path = `triggers[${position}] (${trigger.triggerTypeId})`;
		const definition = index.triggers.get(trigger.triggerTypeId);

		if (!definition) {
			errors.push(`${path}: unknown triggerTypeId. Use an id from the catalog.`);
			return [];
		}

		return [
			{
				id: crypto.randomUUID(),
				triggerTypeId: definition.id,
				conditions: normalizeConditionGroup(
					parseJson(trigger.conditionsJson || '{}'),
					definition.conditions,
					path,
					errors
				)
			}
		];
	});

	const handlers = convertHandlers(action.handlers, index, 'handlers', errors);

	if (triggers.length === 0) {
		errors.push('The action needs at least one trigger.');
	}

	if (handlers.length === 0) {
		errors.push('The action needs at least one handler.');
	}

	return {
		record: {
			name: action.name?.trim() || 'AI action',
			group: action.group?.trim() || undefined,
			triggers,
			handlers
		},
		errors
	};
}

/**
 * Generates a draft action from a description: builds the catalog of installed
 * triggers/handlers, asks the cloud route, validates the result against the
 * catalog and does one repair round when it does not validate.
 */
export async function generateAction(
	app: PluginAppApi,
	prompt: string,
	signal?: AbortSignal
): Promise<GenerateResult> {
	const catalog = await buildCatalog(app);
	const index = indexCatalog(catalog);
	const body = { prompt, catalog: serializeCatalog(catalog) };

	let response = await app.auth.send<GenerateResponse>(GENERATE_ROUTE, {
		method: 'POST',
		body,
		signal
	});
	let conversion = convert(response.action, index);

	if (conversion.errors.length > 0) {
		response = await app.auth.send<GenerateResponse>(GENERATE_ROUTE, {
			method: 'POST',
			body: { ...body, previousAttempt: response.raw, errors: conversion.errors },
			signal
		});
		conversion = convert(response.action, index);
	}

	return {
		record: conversion.record,
		notes: [...(response.action.notes ?? []), ...conversion.errors],
		remaining: response.remaining
	};
}
