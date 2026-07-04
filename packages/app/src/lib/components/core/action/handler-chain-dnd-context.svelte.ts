import { getContext, setContext } from 'svelte';

import type { HandlerDndLayout } from '$lib/core/action/handler-chain-dnd';

export const HANDLER_CHAIN_DND_CONTEXT_KEY = Symbol('handler-chain-dnd');

export type HandlerChainDndContext = {
	layout: () => HandlerDndLayout;
	isDragging: () => boolean;
};

export function setHandlerChainDndContext(context: HandlerChainDndContext): HandlerChainDndContext {
	setContext(HANDLER_CHAIN_DND_CONTEXT_KEY, context);
	return context;
}

export function getHandlerChainDndContext(): HandlerChainDndContext | null {
	return getContext<HandlerChainDndContext | undefined>(HANDLER_CHAIN_DND_CONTEXT_KEY) ?? null;
}
