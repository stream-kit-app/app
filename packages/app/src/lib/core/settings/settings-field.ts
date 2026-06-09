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

type NonPersistedSettingsField = Extract<SettingsFieldDefinition, { type: 'alert' | 'button' }>;

export function isPersistedSettingsField(
	definition: SettingsFieldDefinition
): definition is Exclude<SettingsFieldDefinition, NonPersistedSettingsField> {
	return definition.type !== 'alert' && definition.type !== 'button';
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
	if (definition.type === 'alert' || definition.type === 'button') {
		return false;
	}

	if (definition.defaultValue !== undefined) {
		return definition.defaultValue;
	}

	if (
		definition.type === 'text' ||
		definition.type === 'select' ||
		definition.type === 'combobox'
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
	return flattenSettingsFieldItems(items).find((field) => isMatchingKey(field.key, key));
}

export function getSettingsFieldValue(
	fields: SettingsFieldInstance[],
	key: string
): SettingsFieldValue | undefined {
	return fields.find((field) => isMatchingKey(field.key, key))?.value;
}

export function isSettingsFieldValueEmpty(
	definition: SettingsFieldDefinition,
	value: SettingsFieldValue
): boolean {
	if (definition.type === 'alert' || definition.type === 'button') {
		return false;
	}

	if (
		definition.type === 'text' ||
		definition.type === 'select' ||
		definition.type === 'combobox'
	) {
		return !String(value ?? '').trim();
	}

	if (definition.type === 'slider') {
		return value === undefined || value === null || Number.isNaN(Number(value));
	}

	return false;
}

function isMatchingKey(left: string, right: string): boolean {
	return normalizeLookupKey(left) === normalizeLookupKey(right);
}

function normalizeLookupKey(value: string): string {
	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
