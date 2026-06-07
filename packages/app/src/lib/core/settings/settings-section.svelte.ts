import type { LazyStore } from '@tauri-apps/plugin-store';

import type { App } from '../app.svelte';

import type { SettingsContext } from './context';
import type { SettingsFieldDefinition, SettingsFieldInstance, SettingsFieldItem } from './field';
import type { SettingsSectionProps } from './types';
import type { SettingsFormErrors } from './validate-settings';

import {
	createSettingsFields,
	flattenSettingsFieldItems,
	getSettingsFieldDefinition,
	getSettingsFieldValue,
	isPersistedSettingsField
} from './settings-field';

import { validateSettingsFields } from './validate-settings';

export class SettingsSection {
	key: string;
	title: string;
	store: LazyStore;
	description?: string;
	fieldItems: SettingsFieldItem[];
	fields: SettingsFieldInstance[] = $state([]);
	formErrors: SettingsFormErrors | null = $state(null);
	onSave?: SettingsSectionProps['onSave'];
	onLoad?: SettingsSectionProps['onLoad'];

	constructor(props: SettingsSectionProps, store: LazyStore) {
		this.key = props.key;
		this.title = props.title;
		this.store = store;
		this.description = props.description;
		this.fieldItems = props.fields ?? [];
		this.onSave = props.onSave;
		this.onLoad = props.onLoad;
		this.fields = createSettingsFields(this.fieldItems);
	}

	get persistedDefinitions(): SettingsFieldDefinition[] {
		return flattenSettingsFieldItems(this.fieldItems).filter(isPersistedSettingsField);
	}

	getField(key: string): SettingsFieldInstance | undefined {
		return this.fields.find((field) => field.key === key);
	}

	getFieldDefinition(key: string): SettingsFieldDefinition | undefined {
		return getSettingsFieldDefinition(this.fieldItems, key);
	}

	getFieldError(fieldId: string, errors?: SettingsFormErrors | null): string | undefined {
		return errors?.fieldErrors[fieldId];
	}

	createContext(app: App): SettingsContext {
		return {
			app,
			settings: this.store,
			getValue: (key) => getSettingsFieldValue(this.fields, key)
		};
	}

	async load(): Promise<void> {
		const stored: SettingsFieldInstance[] = [];

		for (const definition of this.persistedDefinitions) {
			const value = await this.store.get<SettingsFieldInstance['value']>(definition.key);

			if (value !== undefined && value !== null) {
				stored.push({
					id: crypto.randomUUID(),
					key: definition.key,
					value
				});
			}
		}

		this.fields = createSettingsFields(this.fieldItems, stored);
	}

	async save(): Promise<void> {
		for (const field of this.fields) {
			await this.store.set(field.key, field.value);
		}
	}

	validate(app: App): boolean {
		this.formErrors = validateSettingsFields(
			this.fields,
			this.fieldItems,
			this.createContext(app)
		);

		return this.formErrors === null;
	}
}
