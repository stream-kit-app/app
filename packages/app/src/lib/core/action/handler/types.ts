import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerTriggerContext } from '../handler-context';
import type { HandlerFieldDefinition, ResolvedHandlerFieldDefinition } from './field';

export type HandlerNext = () => void;

export type HandlerExecuteFn = (
	action: Action,
	handler: ActionHandler,
	context: HandlerTriggerContext,
	next: HandlerNext
) => void | Promise<void>;

export type HandlerDefinitionProps = {
	id?: string;
	name: string;
	children?: HandlerDefinitionProps[];
	fields?: HandlerFieldDefinition[];
	execute?: HandlerExecuteFn;
};

export type ResolvedHandlerDefinitionProps = Omit<HandlerDefinitionProps, 'children' | 'fields'> & {
	id: string;
	children?: ResolvedHandlerDefinitionProps[];
	fields?: ResolvedHandlerFieldDefinition[];
};
