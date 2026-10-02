import type { HandlerDefinition } from './handler/handler-definition.svelte';
import { ActionHandler, type HandlerBranch } from './action-handler.svelte';
import { findHandler, findHandlerLocation } from './handler-tree';

/**
 * Where a new handler goes: after `afterId` (in that handler's chain), at the end of a branch, or
 * at the end of the root chain when omitted.
 */
export type HandlerInsertTarget = {
	parentId?: string;
	branch?: HandlerBranch;
	afterId?: string;
};

export function addHandlerToChain(
	handlers: ActionHandler[],
	definition: HandlerDefinition,
	target?: HandlerInsertTarget
): ActionHandler[] {
	const handler = new ActionHandler(definition);
	const afterLocation = target?.afterId ? findHandlerLocation(handlers, target.afterId) : null;

	if (afterLocation) {
		const nextHandlers = [
			...afterLocation.handlers.slice(0, afterLocation.index + 1),
			handler,
			...afterLocation.handlers.slice(afterLocation.index + 1)
		];

		if (afterLocation.parent && afterLocation.branch) {
			afterLocation.parent.setBranchHandlers(afterLocation.branch, nextHandlers);
			return [...handlers];
		}

		return nextHandlers;
	}

	if (!target?.parentId || !target.branch) {
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
