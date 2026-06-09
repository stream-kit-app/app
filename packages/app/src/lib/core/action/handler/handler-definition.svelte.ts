import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerTriggerContext } from '../handler-context';
import type { HandlerFieldDefinition, ResolvedHandlerFieldDefinition } from './field';
import type { HandlerDefinitionProps } from './types';

import { scopedSlug, slugify, uniqueSlug } from '$lib/utils';

type HandlerDefinitionInput = HandlerDefinitionProps & { id?: string };
type HandlerDefinitionAddOptions = {
	idScope?: string;
};

export class HandlerDefinitions {
	items: HandlerDefinition[] = $state.raw([]);

	add(props: HandlerDefinitionInput, options: HandlerDefinitionAddOptions = {}): HandlerDefinition {
		const normalizedProps = {
			...props,
			id: props.id ?? createGeneratedDefinitionId(props.name, this.items.length, options.idScope),
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
	execute?: (action: Action, handler: ActionHandler, context: HandlerTriggerContext) => void;

	children = new HandlerDefinitions();

	constructor(props: HandlerDefinitionInput & { id: string }) {
		this.id = props.id;
		this.name = props.name;
		this.fields = resolveFieldDefinitions(props.fields);
		this.execute = props.execute;

		props.children?.forEach((child) => this.children.add(child, { idScope: this.id }));
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
		return {
			...field,
			key:
				'key' in field && typeof field.key === 'string'
					? field.key
					: uniqueSlug(field.name, usedKeys, 'field')
		};
	});
}

function createGeneratedDefinitionId(name: string, index: number, scope?: string): string {
	const id = `${slugify(name, 'handler')}-${index + 1}`;
	return scope ? scopedSlug(scope, [id], 'handler') : id;
}
