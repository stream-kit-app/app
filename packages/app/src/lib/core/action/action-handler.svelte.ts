import type { HandlerDefinition } from './handler/handler-definition.svelte';
import type { HandlerFieldInstance } from './handler/field';

import { createHandlerFields, getHandlerFieldDefinition } from './handler-field';

export type StoredActionHandler = {
	id: string;
	handlerTypeId: string;
	fields: HandlerFieldInstance[];
};

export class ActionHandler {
	id: string;
	definition: HandlerDefinition;

	fields: HandlerFieldInstance[] = $state([]);

	constructor(
		definition: HandlerDefinition,
		props?: { id?: string; fields?: HandlerFieldInstance[] }
	) {
		this.id = props?.id ?? crypto.randomUUID();
		this.definition = definition;
		this.fields = createHandlerFields(definition.fields, props?.fields);
	}

	get fieldDefinitions() {
		return this.definition.fields;
	}

	getField(key: string): HandlerFieldInstance | undefined {
		return this.fields.find((field) => field.key === key);
	}

	getFieldDefinition(key: string) {
		return getHandlerFieldDefinition(this.definition.fields, key);
	}

	getFieldError(fieldId: string, errors?: HandlerFieldFormErrors): string | undefined {
		return errors?.fieldErrors[fieldId];
	}

	toStored(): StoredActionHandler {
		return {
			id: this.id,
			handlerTypeId: this.definition.id,
			fields: $state.snapshot(this.fields)
		};
	}
}

export type HandlerFieldFormErrors = {
	fieldErrors: Record<string, string>;
	missingFields: string[];
};
