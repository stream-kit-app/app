import type {
	SettingsFieldDefinition,
	SettingsFieldInstance,
	SettingsFieldItem,
	SettingsFieldSectionDefinition,
	SettingsFieldValue
} from './field';

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

export function isPersistedSettingsField(definition: SettingsFieldDefinition): boolean {
	return definition.type !== 'button';
}

export function createSettingsFields(
	items: SettingsFieldItem[] | undefined,
	stored?: SettingsFieldInstance[]
): SettingsFieldInstance[] {
	return flattenSettingsFieldItems(items).filter(isPersistedSettingsField).map((definition) => {
		const existing = stored?.find((field) => field.key === definition.key);

		return {
			id: existing?.id ?? crypto.randomUUID(),
			key: definition.key,
			value: existing?.value ?? initSettingsFieldValue(definition)
		};
	});
}

export function initSettingsFieldValue(definition: SettingsFieldDefinition): SettingsFieldValue {
	if (definition.defaultValue !== undefined) {
		return definition.defaultValue;
	}

	if (definition.type === 'text' || definition.type === 'select') {
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
	return flattenSettingsFieldItems(items).find((field) => field.key === key);
}

export function getSettingsFieldValue(
	fields: SettingsFieldInstance[],
	key: string
): SettingsFieldValue | undefined {
	return fields.find((field) => field.key === key)?.value;
}

export function isSettingsFieldValueEmpty(
	definition: SettingsFieldDefinition,
	value: SettingsFieldValue
): boolean {
	if (definition.type === 'button') {
		return false;
	}

	if (definition.type === 'text' || definition.type === 'select') {
		return !String(value ?? '').trim();
	}

	if (definition.type === 'slider') {
		return value === undefined || value === null || Number.isNaN(Number(value));
	}

	return false;
}
