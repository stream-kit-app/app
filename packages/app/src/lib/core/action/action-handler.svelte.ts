import type { HandlerDefinition } from './handler/handler-definition.svelte';
import type { HandlerFieldInstance } from './handler/field';
import type { StoredActionHandler } from './stored-action';

import { createHandlerFields, getHandlerFieldDefinition } from './handler-field';

export type { StoredActionHandler };

export type HandlerBranch = 'then' | 'else';

export class ActionHandler {
	id: string;
	definition: HandlerDefinition;

	fields: HandlerFieldInstance[] = $state([]);
	thenHandlers: ActionHandler[] = $state([]);
	elseHandlers: ActionHandler[] = $state([]);

	constructor(
		definition: HandlerDefinition,
		props?: {
			id?: string;
			fields?: HandlerFieldInstance[];
			thenHandlers?: ActionHandler[];
			elseHandlers?: ActionHandler[];
		}
	) {
		this.id = props?.id ?? crypto.randomUUID();
		this.definition = definition;
		this.fields = createHandlerFields(definition.fields, props?.fields);
		this.thenHandlers = props?.thenHandlers ?? [];
		this.elseHandlers = props?.elseHandlers ?? [];
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

	getBranchHandlers(branch: HandlerBranch): ActionHandler[] {
		return branch === 'then' ? this.thenHandlers : this.elseHandlers;
	}

	setBranchHandlers(branch: HandlerBranch, handlers: ActionHandler[]): void {
		if (branch === 'then') {
			this.thenHandlers = handlers;
			return;
		}

		this.elseHandlers = handlers;
	}

	toStored(): StoredActionHandler {
		const stored: StoredActionHandler = {
			id: this.id,
			handlerTypeId: this.definition.id,
			fields: $state.snapshot(this.fields)
		};

		if (this.thenHandlers.length > 0) {
			stored.thenHandlers = this.thenHandlers.map((handler) => handler.toStored());
		}

		if (this.elseHandlers.length > 0) {
			stored.elseHandlers = this.elseHandlers.map((handler) => handler.toStored());
		}

		return stored;
	}

	static clone(source: ActionHandler): ActionHandler {
		return new ActionHandler(source.definition, {
			fields: structuredClone($state.snapshot(source.fields)),
			thenHandlers: source.thenHandlers.map((handler) => ActionHandler.clone(handler)),
			elseHandlers: source.elseHandlers.map((handler) => ActionHandler.clone(handler))
		});
	}
}

export type HandlerFieldFormErrors = {
	fieldErrors: Record<string, string>;
	missingFields: string[];
};
