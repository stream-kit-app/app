import type { HandlerDefinition } from './handler/handler-definition.svelte';
import type { HandlerDefinitions } from './handler/handler-definition.svelte';
import { ActionHandler, type HandlerBranch } from './action-handler.svelte';
import type { StoredActionHandler } from './stored-action';
import { migrateLegacyHandlerFields } from './handler-field';
import { resolveHandlerDefinition } from './definition-id';

export type HandlerLocation = {
	handlers: ActionHandler[];
	index: number;
	parent: ActionHandler | null;
	branch: HandlerBranch | null;
};

export function findHandlerDefinition(
	definitions: HandlerDefinition[],
	id: string
): HandlerDefinition | undefined {
	for (const definition of definitions) {
		if (definition.id === id) {
			return definition;
		}

		const found = findHandlerDefinition(definition.children.items, id);

		if (found) {
			return found;
		}
	}

	return undefined;
}

export function findHandler(
	handlers: ActionHandler[],
	handlerId: string
): ActionHandler | undefined {
	for (const handler of handlers) {
		if (handler.id === handlerId) {
			return handler;
		}

		const inThen = findHandler(handler.thenHandlers, handlerId);

		if (inThen) {
			return inThen;
		}

		const inElse = findHandler(handler.elseHandlers, handlerId);

		if (inElse) {
			return inElse;
		}
	}

	return undefined;
}

export function findHandlerLocation(
	handlers: ActionHandler[],
	handlerId: string,
	parent: ActionHandler | null = null,
	branch: HandlerBranch | null = null
): HandlerLocation | null {
	for (let index = 0; index < handlers.length; index += 1) {
		const handler = handlers[index]!;

		if (handler.id === handlerId) {
			return { handlers, index, parent, branch };
		}

		const thenLocation = findHandlerLocation(handler.thenHandlers, handlerId, handler, 'then');

		if (thenLocation) {
			return thenLocation;
		}

		const elseLocation = findHandlerLocation(handler.elseHandlers, handlerId, handler, 'else');

		if (elseLocation) {
			return elseLocation;
		}
	}

	return null;
}

export function handlerFromStored(
	stored: StoredActionHandler,
	registry: HandlerDefinitions,
	createUnavailable: (id: string) => HandlerDefinition
): ActionHandler {
	return handlerFromStoredWithResolver(
		stored,
		(id) => resolveHandlerDefinition(registry, id),
		createUnavailable
	);
}

export function handlerFromStoredWithResolver(
	stored: StoredActionHandler,
	resolveDefinition: (handlerTypeId: string) => HandlerDefinition | undefined,
	createUnavailable: (id: string) => HandlerDefinition
): ActionHandler {
	const definition =
		resolveDefinition(stored.handlerTypeId) ?? createUnavailable(stored.handlerTypeId);

	return new ActionHandler(definition, {
		id: stored.id,
		fields: migrateLegacyHandlerFields(stored),
		thenHandlers: (stored.thenHandlers ?? []).map((item) =>
			handlerFromStoredWithResolver(item, resolveDefinition, createUnavailable)
		),
		elseHandlers: (stored.elseHandlers ?? []).map((item) =>
			handlerFromStoredWithResolver(item, resolveDefinition, createUnavailable)
		)
	});
}

export function flattenActionHandlers(handlers: ActionHandler[]): ActionHandler[] {
	return handlers.flatMap((handler) => [
		handler,
		...flattenActionHandlers(handler.thenHandlers),
		...flattenActionHandlers(handler.elseHandlers)
	]);
}
