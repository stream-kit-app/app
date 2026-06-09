import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerFieldDefinition, ResolvedHandlerFieldDefinition } from './field';

export type HandlerDefinitionProps = {
	name: string;
	children?: HandlerDefinitionProps[];
	fields?: HandlerFieldDefinition[];
	execute?: (action: Action, handler: ActionHandler, context: unknown) => void;
};

export type ResolvedHandlerDefinitionProps = Omit<HandlerDefinitionProps, 'children' | 'fields'> & {
	id: string;
	children?: ResolvedHandlerDefinitionProps[];
	fields?: ResolvedHandlerFieldDefinition[];
};
