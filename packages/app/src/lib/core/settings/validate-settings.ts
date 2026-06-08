import type { SettingsVisibilityContext } from './context';
import type { SettingsFieldInstance, SettingsFieldItem } from './field';

import { translate } from '$lib/i18n';

import {
	filterVisibleFieldItems,
	flattenSettingsFieldItems,
	isPersistedSettingsField,
	isSettingsFieldValueEmpty
} from './settings-field';

export type SettingsFormErrors = {
	fieldErrors: Record<string, string>;
	missingFields: string[];
};

export function validateSettingsFields(
	fields: SettingsFieldInstance[],
	items: SettingsFieldItem[] | undefined,
	context: SettingsVisibilityContext
): SettingsFormErrors | null {
	const errors: SettingsFormErrors = {
		fieldErrors: {},
		missingFields: []
	};

	const visibleItems = filterVisibleFieldItems(items, context);

	for (const definition of flattenSettingsFieldItems(visibleItems).filter(
		isPersistedSettingsField
	)) {
		const instance = fields.find((field) => field.key === definition.key);

		if (!instance) {
			if (definition.required) {
				errors.missingFields.push(definition.name);
			}

			continue;
		}

		if (definition.required && isSettingsFieldValueEmpty(definition, instance.value)) {
			errors.fieldErrors[instance.id] = translate('{field} is required', {
				field: definition.name
			});
		}
	}

	const hasErrors =
		errors.missingFields.length > 0 || Object.keys(errors.fieldErrors).length > 0;

	return hasErrors ? errors : null;
}
