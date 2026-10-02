import type { ActionHandler } from '$lib/core/action/action-handler.svelte';

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';

import { findHandler, flattenActionHandlers } from '$lib/core/action/handler-tree';

const HANDLER_CHAIN_EDITOR_STATE_KEY = Symbol('handler-chain-editor-state');

/** Selection and collapse state for the handler outline + detail editor. */
export class HandlerChainEditorState {
	selectedId: string | null = $state(null);
	/** IF handlers whose branches are collapsed in the outline. */
	collapsed = new SvelteSet<string>();
	/** Narrow layouts show either the outline or the detail panel. */
	showDetailOnNarrow = $state(false);

	#getHandlers: () => ActionHandler[];

	constructor(getHandlers: () => ActionHandler[]) {
		this.#getHandlers = getHandlers;
		this.selectedId = getHandlers()[0]?.id ?? null;
	}

	get selected(): ActionHandler | undefined {
		return this.selectedId ? findHandler(this.#getHandlers(), this.selectedId) : undefined;
	}

	/** Handler ids in outline order, skipping children of collapsed IF handlers. */
	get visibleIds(): string[] {
		const ids: string[] = [];
		const walk = (handlers: ActionHandler[]) => {
			for (const handler of handlers) {
				ids.push(handler.id);

				if (!this.collapsed.has(handler.id)) {
					walk(handler.thenHandlers);
					walk(handler.elseHandlers);
				}
			}
		};

		walk(this.#getHandlers());

		return ids;
	}

	select(id: string, options: { openDetail?: boolean } = {}): void {
		this.selectedId = id;
		this.expandAncestors(id);

		if (options.openDetail) {
			this.showDetailOnNarrow = true;
		}
	}

	toggle(id: string): void {
		if (this.collapsed.has(id)) {
			this.collapsed.delete(id);
		} else {
			this.collapsed.add(id);
		}
	}

	selectNext(): void {
		this.#selectOffset(1);
	}

	selectPrevious(): void {
		this.#selectOffset(-1);
	}

	#selectOffset(offset: number): void {
		const ids = this.visibleIds;

		if (ids.length === 0) {
			return;
		}

		const index = this.selectedId ? ids.indexOf(this.selectedId) : -1;
		const next = ids[Math.min(Math.max(index + offset, 0), ids.length - 1)];

		if (next) {
			this.selectedId = next;
		}
	}

	/** Uncollapses every IF handler that contains `id`, so it is visible in the outline. */
	expandAncestors(id: string): void {
		const path = findAncestorIds(this.#getHandlers(), id);

		for (const ancestorId of path ?? []) {
			this.collapsed.delete(ancestorId);
		}
	}

	/** Selects the first handler (in execution order) that has validation errors. */
	revealFirstError(handlerErrorIds: Iterable<string>): void {
		const withErrors = new Set(handlerErrorIds);
		const first = flattenActionHandlers(this.#getHandlers()).find((handler) =>
			withErrors.has(handler.id)
		);

		if (first) {
			this.select(first.id, { openDetail: true });
		}
	}

	/**
	 * Keeps the selection valid after the tree changes: selects a newly added handler, or a
	 * neighbour when the selected handler was removed.
	 */
	syncSelection(previousIds: string[]): void {
		const handlers = this.#getHandlers();
		const currentIds = flattenActionHandlers(handlers).map((handler) => handler.id);
		const previous = new Set(previousIds);
		const added = currentIds.find((id) => !previous.has(id));

		if (added) {
			this.select(added, { openDetail: true });
			return;
		}

		if (this.selectedId && currentIds.includes(this.selectedId)) {
			return;
		}

		if (currentIds.length === 0) {
			this.selectedId = null;
			this.showDetailOnNarrow = false;
			return;
		}

		const removedIndex = this.selectedId ? previousIds.indexOf(this.selectedId) : -1;
		const neighbour =
			removedIndex > 0
				? previousIds
						.slice(0, removedIndex)
						.reverse()
						.find((id) => currentIds.includes(id))
				: undefined;

		this.selectedId = neighbour ?? currentIds[0] ?? null;
	}
}

function findAncestorIds(
	handlers: ActionHandler[],
	id: string,
	ancestors: string[] = []
): string[] | null {
	for (const handler of handlers) {
		if (handler.id === id) {
			return ancestors;
		}

		const nested =
			findAncestorIds(handler.thenHandlers, id, [...ancestors, handler.id]) ??
			findAncestorIds(handler.elseHandlers, id, [...ancestors, handler.id]);

		if (nested) {
			return nested;
		}
	}

	return null;
}

export function setHandlerChainEditorState(
	state: HandlerChainEditorState
): HandlerChainEditorState {
	setContext(HANDLER_CHAIN_EDITOR_STATE_KEY, state);
	return state;
}

export function getHandlerChainEditorState(): HandlerChainEditorState {
	const state = getContext<HandlerChainEditorState | undefined>(HANDLER_CHAIN_EDITOR_STATE_KEY);

	if (!state) {
		throw new Error('HandlerChainEditorState context is missing');
	}

	return state;
}
