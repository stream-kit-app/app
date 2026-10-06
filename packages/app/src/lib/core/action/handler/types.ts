import type { Action } from '../action.svelte';
import type { ActionHandler } from '../action-handler.svelte';
import type { HandlerTriggerContext } from '../handler-context';
import type { HandlerTimeout } from '../handler-timeout';
import type {
	HandlerFieldDefinition,
	HandlerFieldItemsContext,
	ResolvedHandlerFieldDefinition,
	VariableDefinition
} from './field';

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
 * Variables a handler makes available to later handlers. Use a function when the variable key
 * depends on a field value (for example a user-chosen target name).
 *
 * @example
 * ```ts
 * outputs: ({ getFieldValue }) => [{ key: String(getFieldValue('target-name') ?? '') }]
 * ```
 */
export type HandlerOutputsSource =
	| VariableDefinition[]
	| ((context: HandlerFieldItemsContext) => VariableDefinition[]);

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
	/** Variables this handler sets for later handlers; shown in variable autocomplete. */
	outputs?: HandlerOutputsSource;
	/**
	 * Max run time in ms before the handler is aborted (default 2 minutes). Handlers that
	 * wait on purpose (delays, media playback) return a longer limit; `null` disables it.
	 *
	 * @example
	 * ```ts
	 * timeout: (handler) => Number(getFieldValue(handler.fields, 'duration')) + 5_000
	 * ```
	 */
	timeout?: HandlerTimeout;
};

/** Handler definition after ids and field keys are resolved at registration time. */
export type ResolvedHandlerDefinitionProps = Omit<HandlerDefinitionProps, 'children' | 'fields'> & {
	id: string;
	children?: ResolvedHandlerDefinitionProps[];
	fields?: ResolvedHandlerFieldDefinition[];
};
