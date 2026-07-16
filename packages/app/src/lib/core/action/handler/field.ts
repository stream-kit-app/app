import type { SelectItem, SelectItemsSource } from '../trigger/condition';

/** Key-value pair for key-value-list handler fields. */
export type KeyValueEntry = {
	/** Entry key. */
	key: string;
	/** Entry value. */
	value: string;
};

/** Value shape for text-select-text handler fields. */
export type TextSelectTextFieldValue = {
	/** Selected path or identifier. */
	path: string;
	/** Field or node type. */
	type: string;
	/** Resolved text value. */
	value: string;
	/** When true, inverts match semantics for this value. */
	negate?: boolean;
};

/** Active variant and values for a one-of handler field. */
export type OneOfFieldValue = {
	/** Selected variant key. */
	variant: string;
	/** Values keyed by variant name. */
	values: Record<string, HandlerFieldScalarValue>;
};

/** Scalar handler field values at runtime. */
export type HandlerFieldScalarValue =
	| string
	| number
	| boolean
	| KeyValueEntry[]
	| TextSelectTextFieldValue;

/** Runtime value of a handler field (scalar or one-of). */
export type HandlerFieldValue = HandlerFieldScalarValue | OneOfFieldValue;

/** Context passed to dynamic select item loaders in handler fields. */
export type HandlerFieldItemsContext = {
	/** Read another field value on the same handler instance. */
	getFieldValue: (key: string) => HandlerFieldValue | undefined;
};

/** Static or dynamic select items for combobox handler fields. */
export type HandlerSelectItemsSource =
	| SelectItem[]
	| (() => SelectItem[] | Promise<SelectItem[]>)
	| ((context: HandlerFieldItemsContext) => SelectItem[] | Promise<SelectItem[]>);

/** A variable that can be inserted into a text field as `{key}`. */
export type HandlerFieldVariable = {
	/** Variable key used in `{key}` placeholders. */
	key: string;
	/** Label shown in the variable picker. */
	label: string;
};

type HandlerFieldBase = {
	/** Display label in the handler field editor. */
	name: string;
	/**
	 * Stable lookup key for `getFieldValue(handler.fields, key)` at runtime.
	 * When omitted, derived from `name` (for example `"Message"` → `"message"`).
	 */
	key?: string;
	/** Placeholder text for text inputs. */
	placeholder?: string;
	/** Default value when the field is first added. */
	defaultValue?: HandlerFieldValue;
	/** When true, the field must have a value before saving. */
	required?: boolean;
};

/** File extension filter for select-file-or-folder handler fields. */
export type HandlerFileFilter = {
	/** Filter group label. */
	name: string;
	/** Allowed extensions without dots. */
	extensions: string[];
};

/** Migration rule for converting legacy fields into a one-of field. */
export type HandlerOneOfMigrateFrom = {
	/** Legacy field keys to read values from. */
	keys: string[];
	/** Maps legacy keys to one-of variant ids. */
	variantMap: Record<string, string>;
};

/** Inner field definition used inside a one-of variant. */
export type HandlerOneOfInnerFieldDefinition =
	| (HandlerFieldBase & {
			type: 'text';
			/** Variables available in the text field picker. */
			variables?: HandlerFieldVariable[];
			/** Include trigger context variables in the picker. */
			useContextVariables?: boolean;
	  })
	| (HandlerFieldBase & { type: 'switch' })
	| (HandlerFieldBase & { type: 'hotkey' })
	| (HandlerFieldBase & { type: 'checkbox' })
	| (HandlerFieldBase & {
			type: 'select';
			/** Static or dynamic select items. */
			items: SelectItemsSource;
			/** Placeholder while items are loading. */
			loadingPlaceholder?: string;
	  })
	| (HandlerFieldBase & {
			type: 'combobox';
			/** Static or dynamic combobox items. */
			items?: HandlerSelectItemsSource;
			loadingPlaceholder?: string;
			/** Allow free-text values not in the item list. */
			allowCustomValue?: boolean;
			/** Reload items when another field changes. */
			itemsReloadFromField?: string;
	  })
	| (HandlerFieldBase & {
			type: 'select-file-or-folder';
			/** Pick a file or folder. */
			mode: 'file' | 'folder';
			filters?: HandlerFileFilter[];
	  })
	| (HandlerFieldBase & {
			type: 'code';
			/** Code editor language. */
			language?: 'typescript';
			defaultValue?: string;
	  })
	| (HandlerFieldBase & {
			type: 'json';
			/** Variables available in the editor's variable picker. */
			variables?: HandlerFieldVariable[];
			/** Include trigger context variables in the picker. */
			useContextVariables?: boolean;
			defaultValue?: string;
	  })
	| (HandlerFieldBase & {
			type: 'slider';
			/** Minimum slider value. */
			min: number;
			/** Maximum slider value. */
			max: number;
			/** Step increment. */
			step?: number;
			/** Unit shown next to the value (e.g. `%`, `px`). Empty string for no unit. Defaults to `%`. */
			unit?: string;
			defaultValue?: number;
	  })
	| (HandlerFieldBase & {
			type: 'color';
			/** Default hex color (`#rrggbb`). */
			defaultValue?: string;
	  });

/** One selectable variant inside a one-of handler field. */
export type HandlerOneOfVariantDefinition = {
	/** Stable variant id stored in `OneOfFieldValue.variant`. */
	id: string;
	/** Label shown in the variant picker. */
	label: string;
	/** Field definition shown when this variant is active. */
	field: HandlerOneOfInnerFieldDefinition;
};

/**
 * Configurable field definition for action handlers.
 * Users add these fields when configuring a handler on an action.
 */
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
			/** Default selected variant id. */
			defaultVariant?: string;
			/** Selectable variants with their inner fields. */
			variants: HandlerOneOfVariantDefinition[];
			/** Rules for migrating legacy separate fields into this one-of. */
			migrateFrom?: HandlerOneOfMigrateFrom[];
	  });

/** Handler field definition after a stable `key` is assigned at registration time. */
export type ResolvedHandlerFieldDefinition = HandlerFieldDefinition & {
	key: string;
};

/** A configured field instance on a handler action at runtime. */
export type HandlerFieldInstance = {
	/** Unique instance id in the action editor. */
	id: string;
	/** Field key matching the handler definition. */
	key: string;
	/** Current field value. */
	value: HandlerFieldValue;
};
