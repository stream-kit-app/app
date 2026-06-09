import type { ResolvedHandlerFieldDefinition } from '../action/handler/field';
import type { HandlerDefinitionProps, ResolvedHandlerDefinitionProps } from '../action/handler';
import type { ConditionDefinition, ResolvedConditionDefinition } from '../action/trigger/condition';
import type { ResolvedTriggerDefinitionProps, TriggerDefinitionProps } from '../action/trigger';
import type { SettingsFieldDefinition, SettingsFieldItem } from '../settings';
import type { RegisterPluginOptions } from './installed-plugin';
import type {
	PluginMenuItemChildDefinition,
	PluginMenuItemDefinition,
	PluginPageDefinition,
	PluginPageFormBlock,
	PluginPageFormField,
	PluginPageFormItem,
	PluginPublicApi,
	PluginRegistration,
	PluginSettingsFieldDefinition,
	PluginSettingsFieldItem
} from './types';

import { createGeneratedId, createScopedId, createUniqueId } from './generated-ids';

const alertVariants = ['default', 'success', 'error', 'warning'] as const;
const badgeVariants = [
	'default',
	'secondary',
	'outline',
	'ghost',
	'destructive',
	'success',
	'warning',
	'link'
] as const;
const buttonVariants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;

export type ResolvedPluginMenuItemChildDefinition = PluginMenuItemChildDefinition & {
	key: string;
	page: PluginPageDefinition;
};

export type ResolvedPluginMenuItemDefinition =
	| (Omit<Extract<PluginMenuItemDefinition, { page: PluginPageDefinition }>, 'page'> & {
			key: string;
			page: PluginPageDefinition;
			children?: never;
	  })
	| (Omit<Extract<PluginMenuItemDefinition, { children: PluginMenuItemChildDefinition[] }>, 'children'> & {
			key: string;
			page?: never;
			children: ResolvedPluginMenuItemChildDefinition[];
	  });

export type ResolvedPluginRegistration<TApi = PluginPublicApi> = Omit<
	PluginRegistration<TApi>,
	'triggers' | 'handlers' | 'menuItems' | 'settings'
> & {
	key: string;
	triggers: ResolvedTriggerDefinitionProps<any>[];
	handlers: ResolvedHandlerDefinitionProps[];
	menuItems: ResolvedPluginMenuItemDefinition[];
	settings: SettingsFieldItem[];
};

export function resolvePluginRegistration<TApi = PluginPublicApi>(
	registration: unknown,
	options: RegisterPluginOptions
): ResolvedPluginRegistration<TApi> | null {
	if (!isPluginRegistration(registration) || !options.key) {
		return null;
	}

	const pluginRegistration = registration as PluginRegistration<TApi>;

	return {
		...pluginRegistration,
		key: options.key,
		triggers: resolveTriggers(options.key, pluginRegistration.triggers ?? []),
		handlers: resolveHandlers(options.key, pluginRegistration.handlers ?? []),
		menuItems: resolveMenuItems(pluginRegistration.menuItems ?? []),
		settings: resolveSettings(pluginRegistration.settings ?? [])
	};
}

function isPluginRegistration(value: unknown): value is PluginRegistration {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const registration = value as Partial<PluginRegistration>;

	return (
		!hasForbiddenKeys(registration, ['key']) &&
		typeof registration.name === 'string' &&
		isArrayOrMissing(registration.triggers, isTrigger) &&
		isArrayOrMissing(registration.handlers, isHandler) &&
		isArrayOrMissing(registration.settings, isSettingsItem) &&
		isArrayOrMissing(registration.menuItems, isMenuItem)
	);
}

function isTrigger(value: unknown): value is TriggerDefinitionProps<any> {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const trigger = value as TriggerDefinitionProps<any>;
	return (
		!hasForbiddenKeys(trigger as Record<string, unknown>, ['id']) &&
		typeof trigger.name === 'string' &&
		isArrayOrMissing(trigger.conditions, isKeylessNamedTypedObject) &&
		isArrayOrMissing(trigger.children, isTrigger)
	);
}

function isHandler(value: unknown): value is HandlerDefinitionProps {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const handler = value as HandlerDefinitionProps;
	return (
		!hasForbiddenKeys(handler as Record<string, unknown>, ['id']) &&
		typeof handler.name === 'string' &&
		isArrayOrMissing(handler.fields, isKeylessNamedTypedObject) &&
		isArrayOrMissing(handler.children, isHandler)
	);
}

function isSettingsItem(value: unknown): value is PluginSettingsFieldItem {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const item = value as Record<string, unknown>;

	if (hasForbiddenKeys(item, ['key'])) {
		return false;
	}

	if (item.type === 'section') {
		return Array.isArray(item.fields) && item.fields.every(isSettingsItem);
	}

	return isNamedTypedObject(value);
}

function isMenuItem(value: unknown): value is PluginMenuItemDefinition {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const item = value as Record<string, unknown>;
	const children = item.children;

	if (hasForbiddenKeys(item, ['key']) || typeof item.title !== 'string' || typeof item.icon !== 'string') {
		return false;
	}

	if ('component' in item || 'props' in item || 'html' in item) {
		return false;
	}

	if (Array.isArray(children) && children.length > 0) {
		return !('page' in item) && children.every(isMenuChild);
	}

	return isPage(item.page);
}

function isMenuChild(value: unknown): value is PluginMenuItemChildDefinition {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const child = value as Record<string, unknown>;

	return (
		!hasForbiddenKeys(child, ['key']) &&
		typeof child.title === 'string' &&
		!('children' in child) &&
		!('component' in child) &&
		!('props' in child) &&
		isPage(child.page)
	);
}

function isPage(value: unknown): value is PluginPageDefinition {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const page = value as PluginPageDefinition;
	return Array.isArray(page.blocks) && page.blocks.every(isBlock);
}

function isBlock(value: unknown): boolean {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const block = value as Record<string, unknown>;

	if (
		typeof block.type !== 'string' ||
		hasForbiddenKeys(block, ['key']) ||
		'html' in block ||
		'component' in block ||
		'action' in block
	) {
		return false;
	}

	switch (block.type) {
		case 'heading':
			return typeof block.title === 'string' && isOneOfOrMissing(block.level, [1, 2, 3, 4, 5, 6]);
		case 'text':
			return typeof block.text === 'string';
		case 'alert':
			return isOneOfOrMissing(block.variant, alertVariants);
		case 'badge':
			return typeof block.label === 'string' && isOneOfOrMissing(block.variant, badgeVariants);
		case 'card':
		case 'stack':
			return Array.isArray(block.blocks) && block.blocks.every(isBlock);
		case 'grid':
			return (
				isOneOfOrMissing(block.columns, [1, 2, 3]) &&
				Array.isArray(block.blocks) &&
				block.blocks.every(isBlock)
			);
		case 'button':
			return (
				typeof block.label === 'string' &&
				typeof block.onClick === 'function' &&
				isOneOfOrMissing(block.variant, buttonVariants)
			);
		case 'form':
			return Array.isArray(block.fields) && block.fields.every(isFormItem);
		default:
			return false;
	}
}

function isFormItem(value: unknown): boolean {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const item = value as Record<string, unknown>;

	if (hasForbiddenKeys(item, ['key'])) {
		return false;
	}

	if (item.type === 'section') {
		return Array.isArray(item.fields) && item.fields.every(isFormItem);
	}

	if (!isNamedTypedObject(value)) {
		return false;
	}

	switch (item.type) {
		case 'text':
			return isOneOfOrMissing(item.inputType, ['text', 'password']);
		case 'switch':
		case 'checkbox':
			return true;
		case 'select':
		case 'combobox':
			return Array.isArray(item.items) && item.items.every(isSelectItem);
		case 'slider':
			return typeof item.min === 'number' && typeof item.max === 'number';
		case 'alert':
			return isOneOfOrMissing(item.variant, alertVariants);
		default:
			return false;
	}
}

function isSelectItem(value: unknown): boolean {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const item = value as Record<string, unknown>;
	return typeof item.value === 'string' && typeof item.label === 'string';
}

function isNamedTypedObject(value: unknown): value is { type: string; name: string } {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const item = value as Record<string, unknown>;
	return typeof item.type === 'string' && typeof item.name === 'string';
}

function isKeylessNamedTypedObject(value: unknown): value is { type: string; name: string } {
	return (
		typeof value === 'object' &&
		value !== null &&
		!hasForbiddenKeys(value as Record<string, unknown>, ['key']) &&
		isNamedTypedObject(value)
	);
}

function isOneOfOrMissing<T>(value: unknown, options: readonly T[]): boolean {
	return value === undefined || options.includes(value as T);
}

function hasForbiddenKeys(value: Record<string, unknown>, keys: string[]): boolean {
	return keys.some((key) => key in value);
}

function isArrayOrMissing<T>(
	value: unknown,
	guard: (item: unknown) => item is T
): value is T[] | undefined {
	return value === undefined || (Array.isArray(value) && value.every(guard));
}

function resolveTriggers(
	pluginKey: string,
	definitions: TriggerDefinitionProps<any>[],
	parentPath: string[] = []
): ResolvedTriggerDefinitionProps<any>[] {
	const used = new Set<string>();

	return definitions.map((definition) => {
		const localId = createUniqueId(createGeneratedId(definition.name), used);
		const path = [...parentPath, localId];

		return {
			...definition,
			id: createScopedId(pluginKey, path),
			conditions: resolveConditions(definition.conditions),
			children: definition.children ? resolveTriggers(pluginKey, definition.children, path) : undefined
		};
	});
}

function resolveConditions(
	conditions: ConditionDefinition[] | undefined
): ResolvedConditionDefinition[] | undefined {
	const used = new Set<string>();

	return conditions?.map((condition) => ({
		...condition,
		key: createUniqueId(createGeneratedId(condition.name), used)
	})) as ResolvedConditionDefinition[] | undefined;
}

function resolveHandlers(
	pluginKey: string,
	definitions: HandlerDefinitionProps[],
	parentPath: string[] = []
): ResolvedHandlerDefinitionProps[] {
	const used = new Set<string>();

	return definitions.map((definition) => {
		const localId = createUniqueId(createGeneratedId(definition.name), used);
		const path = [...parentPath, localId];

		return {
			...definition,
			id: createScopedId(pluginKey, path),
			fields: resolveHandlerFields(definition.fields),
			children: definition.children ? resolveHandlers(pluginKey, definition.children, path) : undefined
		};
	});
}

function resolveHandlerFields(
	fields: HandlerDefinitionProps['fields']
): ResolvedHandlerFieldDefinition[] | undefined {
	const used = new Set<string>();

	return fields?.map((field) => ({
		...field,
		key: createUniqueId(createGeneratedId(field.name), used)
	})) as ResolvedHandlerFieldDefinition[] | undefined;
}

function resolveSettings(items: PluginSettingsFieldItem[]): SettingsFieldItem[] {
	const used = new Set<string>();

	return items.map((item, index) => resolveSettingsItem(item, `${index}`, used));
}

function resolveSettingsItem(
	item: PluginSettingsFieldItem,
	scope: string,
	used: Set<string>
): SettingsFieldItem {
	if (item.type === 'section') {
		return {
			...item,
			fields: item.fields.map((field, index) =>
				resolveSettingsField(field, `${scope}.${item.title ?? 'section'}.${index}`, used)
			)
		};
	}

	return resolveSettingsField(item, scope, used);
}

function resolveSettingsField(
	field: PluginSettingsFieldDefinition,
	scope: string,
	used: Set<string>
): SettingsFieldDefinition {
	return {
		...field,
		key: createUniqueId(createGeneratedId(field.name, scope), used)
	} as unknown as SettingsFieldDefinition;
}

function resolveMenuItems(definitions: PluginMenuItemDefinition[]): ResolvedPluginMenuItemDefinition[] {
	const used = new Set<string>();

	return definitions.map((definition) => {
		const itemKey = createUniqueId(createGeneratedId(definition.title), used);

		if ('children' in definition && definition.children) {
			const childKeys = new Set<string>();

			return {
				...definition,
				key: itemKey,
				children: definition.children.map((child) => ({
					...child,
					key: createUniqueId(createGeneratedId(child.title), childKeys),
					page: resolvePage(child.page, itemKey)
				}))
			};
		}

		return {
			...definition,
			key: itemKey,
			page: resolvePage(definition.page, itemKey)
		};
	});
}

function resolvePage(page: PluginPageDefinition, scope: string, usedForms = new Set<string>()): PluginPageDefinition {
	return {
		...page,
		blocks: page.blocks.map((block, index) => {
			if (block.type === 'card' || block.type === 'stack' || block.type === 'grid') {
				return {
					...block,
					blocks: resolvePage({ blocks: block.blocks }, `${scope}.${block.type}.${index}`, usedForms).blocks
				};
			}

			if (block.type === 'form') {
				return resolvePageForm(block, `${scope}.${index}`, usedForms);
			}

			return block;
		})
	};
}

function resolvePageForm(
	block: PluginPageFormBlock,
	scope: string,
	usedForms: Set<string>
): PluginPageFormBlock {
	const formKey = createUniqueId(createGeneratedId(block.title, scope), usedForms);
	const usedFields = new Set<string>();

	return {
		...block,
		fields: block.fields.map((field, index) =>
			resolvePageFormItem(field, `${formKey}.${index}`, formKey, usedFields)
		)
	};
}

function resolvePageFormItem(
	item: PluginPageFormItem,
	scope: string,
	formKey: string,
	used: Set<string>
): PluginPageFormItem {
	if (item.type === 'section') {
		return {
			...item,
			fields: item.fields.map((field, index) =>
				resolvePageFormField(field, `${scope}.${item.title ?? 'section'}.${index}`, formKey, used)
			)
		};
	}

	return resolvePageFormField(item, scope, formKey, used);
}

function resolvePageFormField(
	field: PluginPageFormField,
	scope: string,
	formKey: string,
	used: Set<string>
): PluginPageFormField {
	return {
		...field,
		key: `${createGeneratedId(formKey)}.${createUniqueId(createGeneratedId(field.name, scope), used)}`
	} as unknown as PluginPageFormField;
}
