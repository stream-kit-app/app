import type { Action } from './action.svelte';
import type { ActionHandler } from './action-handler.svelte';
import type { HandlerTriggerContext } from './handler-context';

export type HandlerChainCallbacks = {
	onHandlerStart?: (handler: ActionHandler, index: number) => void;
	onHandlerComplete?: (handler: ActionHandler, index: number) => void;
};

export async function runHandlerChain(
	handlers: ActionHandler[],
	action: Action,
	context: HandlerTriggerContext,
	callbacks?: HandlerChainCallbacks
): Promise<void> {
	const run = async (index: number): Promise<void> => {
		if (index >= handlers.length) {
			return;
		}

		const handler = handlers[index];

		if (!handler.definition.isAvailable || !handler.definition.execute) {
			await run(index + 1);
			return;
		}

		let called = false;
		let resolveNext: (() => void) | undefined;

		const next = (): void => {
			if (called) {
				return;
			}

			called = true;
			callbacks?.onHandlerComplete?.(handler, index);
			resolveNext?.();
		};

		const nextPromise = new Promise<void>((resolve) => {
			resolveNext = resolve;
		});

		callbacks?.onHandlerStart?.(handler, index);

		try {
			const result = handler.definition.execute(action, handler, context, next);

			if (result instanceof Promise) {
				await result;
			}

			if (!called) {
				callbacks?.onHandlerComplete?.(handler, index);
				return;
			}

			await nextPromise;
			await run(index + 1);
		} catch (error) {
			callbacks?.onHandlerComplete?.(handler, index);
			console.error('Handler execution failed', error);
		}
	};

	await run(0);
}
