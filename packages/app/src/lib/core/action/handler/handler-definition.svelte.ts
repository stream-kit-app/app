import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerFieldDefinition, ResolvedHandlerFieldDefinition } from './field';
import type { HandlerDefinitionProps } from './types';

type HandlerDefinitionInput = HandlerDefinitionProps & { id?: string };

export class HandlerDefinitions {
	items: HandlerDefinition[] = $state.raw([]);

	add(props: HandlerDefinitionInput): HandlerDefinition {
		const normalizedProps = {
			...props,
			id: props.id ?? createGeneratedDefinitionId(props.name, this.items.length),
			fields: resolveFieldDefinitions(props.fields)
		};

		if (this.find(normalizedProps.id)) {
			throw new Error(`Handler definition with id ${normalizedProps.id} already exists`);
		}

		const definition = new HandlerDefinition(normalizedProps);
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

	fields?: ResolvedHandlerFieldDefinition[];
	execute?: (action: Action, handler: ActionHandler, context: unknown) => void;

	children = new HandlerDefinitions();

	constructor(props: HandlerDefinitionInput & { id: string }) {
		this.id = props.id;
		this.name = props.name;
		this.fields = resolveFieldDefinitions(props.fields);
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

	setAvailable(available: boolean): void {
		this.isAvailable = available;

		for (const child of this.children.items) {
			child.setAvailable(available);
		}
	}
}

function resolveFieldDefinitions(
	fields: HandlerFieldDefinition[] | ResolvedHandlerFieldDefinition[] | undefined
): ResolvedHandlerFieldDefinition[] | undefined {
	const usedKeys = new Set<string>();

	return fields?.map((field) => {
		const baseKey =
			'key' in field && typeof field.key === 'string'
				? field.key
				: createGeneratedDefinitionId(field.name, usedKeys.size);
		let key = baseKey;
		let suffix = 2;

		while (usedKeys.has(key)) {
			key = `${baseKey}-${suffix}`;
			suffix += 1;
		}

		usedKeys.add(key);

		return {
			...field,
			key
		};
	});
}

function createGeneratedDefinitionId(name: string, index: number): string {
	const slug = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return `${slug || 'handler'}-${index + 1}`;
}
