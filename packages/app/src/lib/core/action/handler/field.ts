import type { SelectItem, SelectItemsSource } from '../trigger/condition';

export type KeyValueEntry = {
	key: string;
	value: string;
};

export type TextSelectTextFieldValue = {
	path: string;
	type: string;
	value: string;
	negate?: boolean;
};

export type OneOfFieldValue = {
	variant: string;
	values: Record<string, HandlerFieldScalarValue>;
};

export type HandlerFieldScalarValue =
	| string
	| number
	| boolean
	| KeyValueEntry[]
	| TextSelectTextFieldValue;

export type HandlerFieldValue = HandlerFieldScalarValue | OneOfFieldValue;

export type HandlerFieldItemsContext = {
	getFieldValue: (key: string) => HandlerFieldValue | undefined;
};

export type HandlerSelectItemsSource =
	| SelectItem[]
	| (() => SelectItem[] | Promise<SelectItem[]>)
	| ((context: HandlerFieldItemsContext) => SelectItem[] | Promise<SelectItem[]>);

/** A variable that can be inserted into a text field as `{key}`. */
export type HandlerFieldVariable = {
	key: string;
	label: string;
};

type HandlerFieldBase = {
	name: string;
	placeholder?: string;
	defaultValue?: HandlerFieldValue;
	required?: boolean;
};

export type HandlerFileFilter = {
	name: string;
	extensions: string[];
};

export type HandlerOneOfMigrateFrom = {
	keys: string[];
	variantMap: Record<string, string>;
};

export type HandlerOneOfInnerFieldDefinition =
	| (HandlerFieldBase & {
			type: 'text';
			variables?: HandlerFieldVariable[];
			useContextVariables?: boolean;
	  })
	| (HandlerFieldBase & { type: 'switch' })
	| (HandlerFieldBase & { type: 'checkbox' })
	| (HandlerFieldBase & {
			type: 'select';
			items: SelectItemsSource;
			loadingPlaceholder?: string;
	  })
	| (HandlerFieldBase & {
			type: 'combobox';
			items?: HandlerSelectItemsSource;
			loadingPlaceholder?: string;
			allowCustomValue?: boolean;
			itemsReloadFromField?: string;
	  })
	| (HandlerFieldBase & {
			type: 'select-file-or-folder';
			mode: 'file' | 'folder';
			filters?: HandlerFileFilter[];
	  })
	| (HandlerFieldBase & {
			type: 'code';
			language?: 'typescript';
			defaultValue?: string;
	  })
	| (HandlerFieldBase & {
			type: 'slider';
			min: number;
			max: number;
			step?: number;
			defaultValue?: number;
	  });

export type HandlerOneOfVariantDefinition = {
	id: string;
	label: string;
	field: HandlerOneOfInnerFieldDefinition;
};

/** A selectable field definition for the Add Field dropdown on handlers. */
export type HandlerFieldDefinition =
	| HandlerOneOfInnerFieldDefinition
	| (HandlerFieldBase & {
			type: 'key-value-list';
			keyPlaceholder?: string;
			valuePlaceholder?: string;
	  })
	| (HandlerFieldBase & {
			type: 'text-select-text';
			items: SelectItemsSource;
			pathPlaceholder?: string;
			valuePlaceholder?: string;
			useContextVariables?: boolean;
			allowNegate?: boolean;
			valuelessOperators?: readonly string[];
			defaultValue?: TextSelectTextFieldValue;
	  })
	| (HandlerFieldBase & {
			type: 'one-of';
			defaultVariant?: string;
			variants: HandlerOneOfVariantDefinition[];
			migrateFrom?: HandlerOneOfMigrateFrom[];
	  });

export type ResolvedHandlerFieldDefinition = HandlerFieldDefinition & {
	key: string;
};

/** A configured field instance on a handler action. */
export type HandlerFieldInstance = {
	id: string;
	key: string;
	value: HandlerFieldValue;
};
