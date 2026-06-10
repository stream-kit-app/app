import type { SelectItem } from '../action/trigger/condition';
import type { SettingsContext } from './context';

export type SettingsSelectItemsSource =
	| SelectItem[]
	| ((context: SettingsContext) => SelectItem[] | Promise<SelectItem[]>);

export type SettingsFieldValue = string | boolean | number;

export type SettingsButtonVariant =
	| 'default'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'destructive'
	| 'link';

export type SettingsAlertVariant = 'default' | 'success' | 'error' | 'warning';

export type SettingsFieldDefinition =
	| (SettingsFieldBase & {
			type: 'text';
			inputType?: 'text' | 'password';
	  })
	| (SettingsFieldBase & { type: 'switch' })
	| (SettingsFieldBase & { type: 'checkbox' })
	| (SettingsFieldBase & {
			type: 'select';
			items: SettingsSelectItemsSource;
			itemsReload?: (context: SettingsContext) => unknown;
			loadingPlaceholder?: string;
	  })
	| (SettingsFieldBase & {
			type: 'combobox';
			items: SettingsSelectItemsSource;
			itemsReload?: (context: SettingsContext) => unknown;
			loadingPlaceholder?: string;
	  })
	| (SettingsFieldBase & { type: 'slider'; min: number; max: number; step?: number })
	| {
			type: 'button';
			key: string;
			name: string;
			variant?: SettingsButtonVariant;
			visible?: (context: SettingsContext) => boolean;
			onClick: (context: SettingsContext) => void | Promise<void>;
	  }
	| {
			type: 'alert';
			key: string;
			name: string;
			description?: string;
			variant?: SettingsAlertVariant;
			visible?: (context: SettingsContext) => boolean;
	  }
	| {
			type: 'select-values';
			key: string;
			name: string;
			description?: string;
			buttonLabel?: string;
			dialogTitle?: string;
			searchPlaceholder?: string;
			loadingPlaceholder?: string;
			emptySelectedLabel?: string;
			visible?: (context: SettingsContext) => boolean;
			items: SettingsSelectItemsSource;
			itemsReload?: (context: SettingsContext) => unknown;
			selectedItems?: SettingsSelectItemsSource;
			selectedReload?: (context: SettingsContext) => unknown;
			isChecked?: (context: SettingsContext, value: string) => boolean;
			onCheck: (context: SettingsContext, value: string) => void | Promise<void>;
			onUncheck?: (context: SettingsContext, value: string) => void | Promise<void>;
	  };

export type SettingsFieldSectionDefinition = {
	type: 'section';
	title?: string;
	description?: string;
	visible?: (context: SettingsContext) => boolean;
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
	visible?: (context: SettingsContext) => boolean;
};
