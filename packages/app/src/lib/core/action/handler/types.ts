import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerTriggerContext } from '../handler-context';
import type { HandlerFieldDefinition, ResolvedHandlerFieldDefinition } from './field';

/** Continue to the next handler in the action chain. */
export type HandlerNext = () => void;

/**
 * Handler execution function. Receives the action, handler instance, trigger context, and `next`.
 *
 * Call `next()` to continue the chain, or omit it to stop after this handler.
 *
 * @example
 * ```ts
 * execute: async (action, handler, context, next) => {
 *   const message = getFieldValue(handler.fields, 'message');
 *   app.toast.create({ title: String(message) });
 *   next();
 * }
 * ```
 */
export type HandlerExecuteFn = (
	action: Action,
	handler: ActionHandler,
	context: HandlerTriggerContext,
	next: HandlerNext
) => void | Promise<void>;

/**
 * Definition of an action handler type that users can add to actions.
 */
export type HandlerDefinitionProps = {
	/** Stable handler id. Auto-generated from plugin key and name when omitted. */
	id?: string;
	/** Display name in the handler picker. */
	name: string;
	/** Nested sub-handlers shown as a group in the picker. */
	children?: HandlerDefinitionProps[];
	/** Configurable fields shown when the handler is added to an action. */
	fields?: HandlerFieldDefinition[];
	/** Runtime logic invoked when the action runs. */
	execute?: HandlerExecuteFn;
};

/** Handler definition after ids and field keys are resolved at registration time. */
export type ResolvedHandlerDefinitionProps = Omit<HandlerDefinitionProps, 'children' | 'fields'> & {
	id: string;
	children?: ResolvedHandlerDefinitionProps[];
	fields?: ResolvedHandlerFieldDefinition[];
};
