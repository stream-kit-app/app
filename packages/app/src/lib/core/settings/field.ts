import type { SelectItemsSource } from '../action/trigger/condition';

import type { SettingsContext } from './context';

export type SettingsFieldValue = string | boolean | number;

export type SettingsFieldDefinition =
	| (SettingsFieldBase & {
			type: 'text';
			inputType?: 'text' | 'password';
	  })
	| (SettingsFieldBase & { type: 'switch' })
	| (SettingsFieldBase & { type: 'checkbox' })
	| (SettingsFieldBase & {
			type: 'select';
			items: SelectItemsSource;
			loadingPlaceholder?: string;
	  })
	| (SettingsFieldBase & { type: 'slider'; min: number; max: number; step?: number })
	| (SettingsFieldBase & {
			type: 'button';
			onClick: (context: SettingsContext) => void | Promise<void>;
	  });

export type SettingsFieldSectionDefinition = {
	type: 'section';
	title?: string;
	description?: string;
	fields: SettingsFieldDefinition[];
};

export type SettingsFieldItem = SettingsFieldDefinition | SettingsFieldSectionDefinition;

export type SettingsFieldInstance = {
	id: string;
	key: string;
	value: SettingsFieldValue;
};

type SettingsFieldBase = {
	key: string;
	name: string;
	placeholder?: string;
	defaultValue?: SettingsFieldValue;
	required?: boolean;
};
