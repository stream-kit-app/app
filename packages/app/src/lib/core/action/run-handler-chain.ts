import type { ActionHandler } from './action-handler.svelte';
import type { Action } from './action.svelte';
import type { HandlerTriggerContext } from './handler-context';

export type HandlerChainCallbacks = {
	onHandlerStart?: (handler: ActionHandler, index: number) => void;
	onHandlerComplete?: (handler: ActionHandler, index: number) => void;
	onHandlerError?: (handler: ActionHandler, index: number, error: unknown) => void;
};

export async function runHandlerChain(
	handlers: ActionHandler[],
	action: Action,
	context: HandlerTriggerContext,
	callbacks?: HandlerChainCallbacks
): Promise<void> {
	// Non-blocking handlers run alongside the rest of the chain; the chain only
	// resolves once they have settled too, so queues and run state stay accurate.
	const detached: Promise<void>[] = [];

	const runDetached = async (
		handler: ActionHandler,
		index: number,
		execute: NonNullable<ActionHandler['definition']['execute']>
	): Promise<void> => {
		let called = false;
		let resolveNext: (() => void) | undefined;

		const complete = (): void => {
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

		try {
			const result = execute(action, handler, context, complete);

			if (result instanceof Promise) {
				await result;
			}

			// The chain already moved on, so a handler that never calls `next()`
			// has nothing left to stop; treat a settled result as done.
			if (!called) {
				complete();
				return;
			}

			await nextPromise;
		} catch (error) {
			complete();
			callbacks?.onHandlerError?.(handler, index, error);
			console.error('Handler execution failed', error);
		}
	};

	const run = async (index: number): Promise<void> => {
		if (index >= handlers.length) {
			return;
		}

		const handler = handlers[index];

		if (!handler.definition.isAvailable || !handler.definition.execute) {
			await run(index + 1);
			return;
		}

		callbacks?.onHandlerStart?.(handler, index);

		if (!handler.blocking && index < handlers.length - 1) {
			detached.push(runDetached(handler, index, handler.definition.execute));
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
			// A thrown handler is an unexpected failure (handlers signal an
			// intentional stop by not calling `next()`), so log it and continue
			// with the remaining handlers instead of aborting the whole chain.
			callbacks?.onHandlerComplete?.(handler, index);
			callbacks?.onHandlerError?.(handler, index, error);
			console.error('Handler execution failed', error);
			await run(index + 1);
		}
	};

	await run(0);
	await Promise.allSettled(detached);
}
