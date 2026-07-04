import type { ActionHandler, HandlerBranch } from './action-handler.svelte';
import { isIfHandler } from './if-condition';
import { findHandler } from './handler-tree';

export const HANDLER_DND_ROOT_KEY = 'root';

export type HandlerDndEntry = {
	id: string;
	handler: ActionHandler;
};

export type HandlerDndLayout = Record<string, HandlerDndEntry[]>;

export function branchContainerKey(parentId: string, branch: HandlerBranch): string {
	return `${branch}-${parentId}`;
}

export function parseBranchContainerKey(
	key: string
): { branch: HandlerBranch; parentId: string } | null {
	const match = key.match(/^(then|else)-(.+)$/);

	if (!match) {
		return null;
	}

	return { branch: match[1] as HandlerBranch, parentId: match[2]! };
}

export function buildHandlerDndLayout(
	handlers: ActionHandler[],
	containerKey: string = HANDLER_DND_ROOT_KEY
): HandlerDndLayout {
	const layout: HandlerDndLayout = {
		[containerKey]: handlers.map((handler) => ({ id: handler.id, handler }))
	};

	for (const handler of handlers) {
		if (!isIfHandler(handler)) {
			continue;
		}

		Object.assign(
			layout,
			buildHandlerDndLayout(handler.thenHandlers, branchContainerKey(handler.id, 'then'))
		);
		Object.assign(
			layout,
			buildHandlerDndLayout(handler.elseHandlers, branchContainerKey(handler.id, 'else'))
		);
	}

	return layout;
}

export function findHandlerDndEntry(
	layout: HandlerDndLayout,
	handlerId: string
): { entry: HandlerDndEntry; containerKey: string } | null {
	for (const [containerKey, entries] of Object.entries(layout)) {
		const entry = entries.find((item) => item.id === handlerId);

		if (entry) {
			return { entry, containerKey };
		}
	}

	return null;
}

function isInsideHandlerSubtree(
	handlers: ActionHandler[],
	rootId: string,
	nodeId: string
): boolean {
	if (rootId === nodeId) {
		return true;
	}

	const root = findHandler(handlers, rootId);

	if (!root || !isIfHandler(root)) {
		return false;
	}

	for (const child of [...root.thenHandlers, ...root.elseHandlers]) {
		if (child.id === nodeId) {
			return true;
		}

		if (isIfHandler(child) && isInsideHandlerSubtree(handlers, child.id, nodeId)) {
			return true;
		}
	}

	return false;
}

export function isInvalidHandlerMove(
	handlers: ActionHandler[],
	handlerId: string,
	targetContainerKey: string
): boolean {
	if (targetContainerKey === HANDLER_DND_ROOT_KEY) {
		return false;
	}

	const branchTarget = parseBranchContainerKey(targetContainerKey);

	if (!branchTarget) {
		return false;
	}

	if (handlerId === branchTarget.parentId) {
		return true;
	}

	return isInsideHandlerSubtree(handlers, handlerId, branchTarget.parentId);
}

export function layoutHasInvalidHandlerPlacements(
	handlers: ActionHandler[],
	layout: HandlerDndLayout
): boolean {
	for (const [containerKey, entries] of Object.entries(layout)) {
		if (containerKey === HANDLER_DND_ROOT_KEY) {
			continue;
		}

		for (const entry of entries) {
			if (isInvalidHandlerMove(handlers, entry.id, containerKey)) {
				return true;
			}
		}
	}

	return false;
}

export function applyHandlerDndLayout(
	_layout: ActionHandler[],
	layout: HandlerDndLayout
): ActionHandler[] {
	const rootHandlers = (layout[HANDLER_DND_ROOT_KEY] ?? []).map((entry) => entry.handler);

	function syncIfBranches(handler: ActionHandler): void {
		if (!isIfHandler(handler)) {
			return;
		}

		handler.setBranchHandlers(
			'then',
			(layout[branchContainerKey(handler.id, 'then')] ?? []).map((entry) => entry.handler)
		);
		handler.setBranchHandlers(
			'else',
			(layout[branchContainerKey(handler.id, 'else')] ?? []).map((entry) => entry.handler)
		);

		for (const child of [...handler.thenHandlers, ...handler.elseHandlers]) {
			syncIfBranches(child);
		}
	}

	for (const handler of rootHandlers) {
		syncIfBranches(handler);
	}

	return rootHandlers;
}

export function handlerTreeSignature(handlers: ActionHandler[]): string {
	function serialize(items: ActionHandler[]): unknown[] {
		return items.map((handler) => ({
			id: handler.id,
			...(isIfHandler(handler)
				? {
						then: serialize(handler.thenHandlers),
						else: serialize(handler.elseHandlers)
					}
				: {})
		}));
	}

	return JSON.stringify(serialize(handlers));
}
