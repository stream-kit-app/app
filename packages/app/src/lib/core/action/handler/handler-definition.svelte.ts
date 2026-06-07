import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerFieldDefinition } from './field';
import type { HandlerDefinitionProps } from './types';

export class HandlerDefinitions {
	items: HandlerDefinition[] = $state.raw([]);

	add(props: HandlerDefinitionProps): HandlerDefinition {
		if (this.find(props.id)) {
			throw new Error(`Handler definition with id ${props.id} already exists`);
		}

		const definition = new HandlerDefinition(props);
		this.items = [...this.items, definition];

		return definition;
	}

	find(id: string): HandlerDefinition | undefined {
		for (const definition of this.items) {
			const found = definition.find(id);
			if (found) {
				return found;
			}
		}

		return undefined;
	}
}

export class HandlerDefinition {
	id: string;
	name: string;
	isAvailable: boolean = $state(true);

	fields?: HandlerFieldDefinition[];
	execute?: (action: Action, handler: ActionHandler, context: unknown) => void;

	children = new HandlerDefinitions();

	constructor(props: HandlerDefinitionProps) {
		this.id = props.id;
		this.name = props.name;
		this.fields = props.fields;
		this.execute = props.execute;

		props.children?.forEach((child) => this.children.add(child));
	}

	get isGroup(): boolean {
		return this.children.items.length > 0;
	}

	find(id: string): HandlerDefinition | undefined {
		if (this.id === id) {
			return this;
		}

		return this.children.find(id);
	}
}
