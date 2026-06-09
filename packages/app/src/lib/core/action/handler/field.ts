import type { SelectItemsSource } from '../trigger/condition';

export type HandlerFieldValue = string | boolean;

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

/** A selectable field definition for the Add Field dropdown on handlers. */
export type HandlerFieldDefinition =
	| (HandlerFieldBase & { type: 'text'; variables?: HandlerFieldVariable[] })
	| (HandlerFieldBase & { type: 'switch' })
	| (HandlerFieldBase & { type: 'checkbox' })
	| (HandlerFieldBase & {
			type: 'select';
			items: SelectItemsSource;
			loadingPlaceholder?: string;
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
