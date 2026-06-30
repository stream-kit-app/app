import type {
	ActionHandler,
	HandlerFieldFormErrors,
	HandlerBranch
} from '$lib/core/action/action-handler.svelte';
import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';

export type HandlerChainFormErrors = {
	handlers?: string;
	handlerErrors: Record<string, HandlerFieldFormErrors>;
};

export type HandlerChainEditorHost = {
	handlers: ActionHandler[];
	addHandler(
		definition: HandlerDefinition,
		target?: { parentId: string; branch: HandlerBranch }
	): void;
	removeHandler(handlerId: string): void;
	cloneHandler(handlerId: string): void;
	reorderHandlers(handlers: ActionHandler[]): void;
	reorderBranchHandlers(
		parentId: string,
		branch: HandlerBranch,
		handlers: ActionHandler[]
	): void;
	formErrors?: HandlerChainFormErrors | null;
	execution?: {
		state: {
			activeHandlerId?: string | null;
			completedHandlerIds: string[];
		};
	};
};
