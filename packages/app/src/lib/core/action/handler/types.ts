import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerFieldDefinition } from './field';

export type HandlerDefinitionProps = {
	id: string;
	name: string;
	children?: HandlerDefinitionProps[];
	fields?: HandlerFieldDefinition[];
	execute?: (action: Action, handler: ActionHandler, context: unknown) => void;
};
