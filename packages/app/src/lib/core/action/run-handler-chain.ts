import type { Action } from './action.svelte';
import type { ActionHandler } from './action-handler.svelte';
import type { HandlerTriggerContext } from './handler-context';

export function runHandlerChain(
	handlers: ActionHandler[],
	action: Action,
	context: HandlerTriggerContext
): void {
	const run = (index: number): void => {
		if (index >= handlers.length) {
			return;
		}

		const handler = handlers[index];

		if (!handler.definition.isAvailable || !handler.definition.execute) {
			run(index + 1);
			return;
		}

		let called = false;
		const next = (): void => {
			if (called) {
				return;
			}

			called = true;
			run(index + 1);
		};

		try {
			const result = handler.definition.execute(action, handler, context, next);

			if (result instanceof Promise) {
				void result.catch((error: unknown) => {
					console.error('Handler execution failed', error);
				});
			}
		} catch (error) {
			console.error('Handler execution failed', error);
		}
	};

	run(0);
}
