import type {
	ActionHandler,
	HandlerFieldFormErrors,
	HandlerBranch
} from '#lib/core/action/action-handler.svelte.js';
import type { HandlerInsertTarget } from '#lib/core/action/handler-chain-mutations.js';
import type { HandlerDefinition } from '#lib/core/action/handler/handler-definition.svelte.js';

export type HandlerChainFormErrors = {
	handlers?: string;
	handlerErrors: Record<string, HandlerFieldFormErrors>;
};

export type HandlerChainEditorHost = {
	handlers: ActionHandler[];
	addHandler(definition: HandlerDefinition, target?: HandlerInsertTarget): void;
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
