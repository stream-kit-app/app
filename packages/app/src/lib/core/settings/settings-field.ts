import type { SelectItemsSource } from '../action/trigger/condition';
import type { SettingsContext, SettingsVisibilityContext } from './context';
import type {
	SettingsFieldDefinition,
	SettingsFieldInstance,
	SettingsFieldItem,
	SettingsFieldSectionDefinition,
	SettingsFieldValue,
	SettingsSelectItemsSource
} from './field';

import { slugify, uniqueSlug } from '$lib/utils';

export function toSettingsSelectItemsSource(
	items: SettingsSelectItemsSource,
	context: SettingsContext
): SelectItemsSource {
	if (Array.isArray(items)) {
		return items;
	}

	return () => items(context);
}

export function isSettingsFieldSection(
	item: SettingsFieldItem
): item is SettingsFieldSectionDefinition {
	return item.type === 'section';
}

export function flattenSettingsFieldItems(
	items: SettingsFieldItem[] | undefined
): SettingsFieldDefinition[] {
	return (items ?? []).flatMap((item) => (isSettingsFieldSection(item) ? item.fields : [item]));
}

export function withGeneratedSettingsKeys(
	items: unknown[] | undefined,
	scope: string
): SettingsFieldItem[] {
	const used = new Set<string>();

	return (items ?? []).map((item, index) =>
		withGeneratedSettingsItemKey(item, `${scope}.${index}`, used)
	);
}

export function isSettingsFieldVisible(
	definition: SettingsFieldDefinition,
	context: SettingsVisibilityContext
): boolean {
	return definition.visible?.(context) ?? true;
}

export function filterVisibleFieldItems(
	items: SettingsFieldItem[] | undefined,
	context: SettingsVisibilityContext
): SettingsFieldItem[] {
	const visible: SettingsFieldItem[] = [];

	for (const item of items ?? []) {
		if (isSettingsFieldSection(item)) {
			if (item.visible && !item.visible(context)) {
				continue;
			}

			const fields = item.fields.filter((field) => isSettingsFieldVisible(field, context));

			if (fields.length === 0) {
				continue;
			}

			visible.push({ ...item, fields });
			continue;
		}

		if (isSettingsFieldVisible(item, context)) {
			visible.push(item);
		}
	}

	return visible;
}

type NonPersistedSettingsField = Extract<
	SettingsFieldDefinition,
	{ type: 'alert' | 'button' | 'select-values' | 'table' }
>;

export function isPersistedSettingsField(
	definition: SettingsFieldDefinition
): definition is Exclude<SettingsFieldDefinition, NonPersistedSettingsField> {
	return (
		definition.type !== 'alert' &&
		definition.type !== 'button' &&
		definition.type !== 'select-values' &&
		definition.type !== 'table'
	);
}

export function createSettingsFields(
	items: SettingsFieldItem[] | undefined,
	stored?: SettingsFieldInstance[]
): SettingsFieldInstance[] {
	return flattenSettingsFieldItems(items)
		.filter(isPersistedSettingsField)
		.map((definition) => {
			const existing = stored?.find((field) => field.key === definition.key);

			return {
				id: existing?.id ?? crypto.randomUUID(),
				key: definition.key,
				value: existing?.value ?? initSettingsFieldValue(definition)
			};
		});
}

export function initSettingsFieldValue(definition: SettingsFieldDefinition): SettingsFieldValue {
	if (
		definition.type === 'alert' ||
		definition.type === 'button' ||
		definition.type === 'select-values' ||
		definition.type === 'table'
	) {
		return false;
	}

	if (definition.defaultValue !== undefined) {
		return definition.defaultValue;
	}

	if (
		definition.type === 'text' ||
		definition.type === 'select' ||
		definition.type === 'combobox' ||
		definition.type === 'color' ||
		definition.type === 'select-file-or-folder'
	) {
		return '';
	}

	if (definition.type === 'slider') {
		return definition.min ?? 0;
	}

	return false;
}

export function getSettingsFieldDefinition(
	items: SettingsFieldItem[] | undefined,
	key: string
): SettingsFieldDefinition | undefined {
	return flattenSettingsFieldItems(items).find((field) => fieldKeyMatches(field.key, key));
}

export function getSettingsFieldInstance(
	fields: SettingsFieldInstance[],
	key: string
): SettingsFieldInstance | undefined {
	return fields.find((field) => fieldKeyMatches(field.key, key));
}

export function getSettingsFieldValue(
	fields: SettingsFieldInstance[],
	key: string
): SettingsFieldValue | undefined {
	return getSettingsFieldInstance(fields, key)?.value;
}

export function isSettingsFieldValueEmpty(
	definition: SettingsFieldDefinition,
	value: SettingsFieldValue
): boolean {
	if (
		definition.type === 'alert' ||
		definition.type === 'button' ||
		definition.type === 'select-values' ||
		definition.type === 'table'
	) {
		return false;
	}

	if (
		definition.type === 'text' ||
		definition.type === 'select' ||
		definition.type === 'combobox' ||
		definition.type === 'color' ||
		definition.type === 'select-file-or-folder'
	) {
		return !String(value ?? '').trim();
	}

	if (definition.type === 'slider') {
		return value === undefined || value === null || Number.isNaN(Number(value));
	}

	return false;
}

function fieldKeyMatches(fieldKey: string, lookupKey: string): boolean {
	const normalizedFieldKey = normalizeLookupKey(fieldKey);
	const normalizedLookupKey = normalizeLookupKey(lookupKey);

	if (normalizedFieldKey === normalizedLookupKey) {
		return true;
	}

	// Generated keys are `<scope>.<name>`. Match the trailing name segment exactly
	// (anchored on the scope separator) instead of any hyphen suffix, so a short
	// lookup like "token" doesn't accidentally match "auth-token".
	const separatorIndex = fieldKey.lastIndexOf('.');

	if (separatorIndex === -1) {
		return false;
	}

	const nameSegment = fieldKey.slice(separatorIndex + 1);

	return nameSegment !== '' && normalizeLookupKey(nameSegment) === normalizedLookupKey;
}

function normalizeLookupKey(value: string): string {
	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function withGeneratedSettingsItemKey(
	item: unknown,
	scope: string,
	used: Set<string>
): SettingsFieldItem {
	const definition = item as Record<string, unknown>;

	if (definition.type === 'section') {
		return {
			...definition,
			fields: ((definition.fields as unknown[] | undefined) ?? []).map((field, index) =>
				withGeneratedSettingsFieldKey(
					field,
					`${scope}.${String(definition.title ?? 'section')}.${index}`,
					used
				)
			)
		} as SettingsFieldItem;
	}

	return withGeneratedSettingsFieldKey(item, scope, used);
}

function withGeneratedSettingsFieldKey(
	field: unknown,
	scope: string,
	used: Set<string>
): SettingsFieldDefinition {
	const definition = field as Record<string, unknown>;
	const explicitKey = typeof definition.key === 'string' ? definition.key.trim() : '';
	const isPassword =
		definition.type === 'text' && definition.inputType === 'password';
	const sync =
		definition.sync === 'account' || definition.sync === 'device'
			? definition.sync
			: isPassword || definition.secret === true
				? 'device'
				: 'account';
	const secret = definition.secret === true || isPassword;

	if (explicitKey) {
		uniqueSlug(explicitKey, used, explicitKey);

		return {
			...definition,
			key: explicitKey,
			sync,
			secret
		} as SettingsFieldDefinition;
	}

	// Stable key from field name only (no settings-array index) so multi-PC sync
	// does not accumulate stale obs-4.host / obs-5.host keys across edits.
	const nameSlug = uniqueSlug(String(definition.name ?? 'field'), used);
	const pluginScope = scope.split('.')[0] ?? scope;

	return {
		...definition,
		key: `${slugify(pluginScope)}.${nameSlug}`,
		sync,
		secret
	} as SettingsFieldDefinition;
}

/** Resolve sync scope for a persisted settings field definition. */
export function getSettingsFieldSyncScope(
	definition: SettingsFieldDefinition
): 'account' | 'device' {
	if (
		definition.type === 'alert' ||
		definition.type === 'button' ||
		definition.type === 'select-values' ||
		definition.type === 'table'
	) {
		return 'device';
	}

	if (definition.secret === true) {
		return 'device';
	}

	if (definition.type === 'text' && definition.inputType === 'password') {
		return 'device';
	}

	return definition.sync ?? 'account';
}
