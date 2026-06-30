import type { HandlerDefinition } from './handler/handler-definition.svelte';
import { ActionHandler, type HandlerBranch } from './action-handler.svelte';
import { findHandler, findHandlerLocation } from './handler-tree';

export function addHandlerToChain(
	handlers: ActionHandler[],
	definition: HandlerDefinition,
	target?: { parentId: string; branch: HandlerBranch }
): ActionHandler[] {
	const handler = new ActionHandler(definition);

	if (!target) {
		return [...handlers, handler];
	}

	const parent = findHandler(handlers, target.parentId);

	if (!parent) {
		return handlers;
	}

	const branchHandlers = parent.getBranchHandlers(target.branch);
	parent.setBranchHandlers(target.branch, [...branchHandlers, handler]);

	return [...handlers];
}

export function removeHandlerFromChain(
	handlers: ActionHandler[],
	handlerId: string
): ActionHandler[] {
	const location = findHandlerLocation(handlers, handlerId);

	if (!location) {
		return handlers;
	}

	const nextHandlers = location.handlers.filter((handler) => handler.id !== handlerId);

	if (location.parent && location.branch) {
		location.parent.setBranchHandlers(location.branch, nextHandlers);
		return [...handlers];
	}

	return nextHandlers;
}

export function cloneHandlerInChain(
	handlers: ActionHandler[],
	handlerId: string
): ActionHandler[] {
	const location = findHandlerLocation(handlers, handlerId);

	if (!location) {
		return handlers;
	}

	const clone = ActionHandler.clone(location.handlers[location.index]!);
	const nextHandlers = [
		...location.handlers.slice(0, location.index + 1),
		clone,
		...location.handlers.slice(location.index + 1)
	];

	if (location.parent && location.branch) {
		location.parent.setBranchHandlers(location.branch, nextHandlers);
		return [...handlers];
	}

	return nextHandlers;
}

export function reorderBranchHandlersInChain(
	handlers: ActionHandler[],
	parentId: string,
	branch: HandlerBranch,
	branchHandlers: ActionHandler[]
): ActionHandler[] {
	const parent = findHandler(handlers, parentId);

	if (!parent) {
		return handlers;
	}

	parent.setBranchHandlers(branch, branchHandlers);

	return [...handlers];
}
