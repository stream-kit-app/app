import type { ActionHandler } from './action-handler.svelte';
import type { Action } from './action.svelte';
import type { HandlerTriggerContext } from './handler-context';

import { HandlerTimeoutError, raceAbort, resolveHandlerTimeout } from './handler-timeout';

export type HandlerChainCallbacks = {
	onHandlerStart?: (handler: ActionHandler, index: number) => void;
	onHandlerComplete?: (handler: ActionHandler, index: number) => void;
	onHandlerError?: (handler: ActionHandler, index: number, error: unknown) => void;
};

/**
 * - `next`: the handler called `next()`, continue with the following handler
 * - `stop`: the handler finished without `next()`, an intentional stop
 * - `error`: the handler threw; log it and continue
 * - `aborted`: the handler timed out or the chain was aborted; stop the chain
 */
type HandlerOutcome = 'next' | 'stop' | 'error' | 'aborted';

/**
 * Runs handlers in order. Each handler gets its own `context.signal`, aborted when the
 * handler exceeds its timeout or when `context.signal` (the parent run) aborts, so one
 * hung handler can't block an action queue forever.
 */
export async function runHandlerChain(
	handlers: ActionHandler[],
	action: Action,
	context: HandlerTriggerContext,
	callbacks?: HandlerChainCallbacks
): Promise<void> {
	// Handlers get their own context copy (for their signal) but share these variables.
	context.actionVariables ??= {};
	const chainSignal = context.signal;

	// Non-blocking handlers run alongside the rest of the chain; the chain only
	// resolves once they have settled too, so queues and run state stay accurate.
	const detached: Promise<HandlerOutcome>[] = [];

	const executeHandler = async (
		handler: ActionHandler,
		index: number
	): Promise<HandlerOutcome> => {
		const execute = handler.definition.execute!;
		const controller = new AbortController();
		const forwardAbort = (): void => controller.abort(chainSignal?.reason);

		if (chainSignal?.aborted) {
			return 'aborted';
		}
		chainSignal?.addEventListener('abort', forwardAbort, { once: true });

		const handlerContext: HandlerTriggerContext = { ...context, signal: controller.signal };
		const timeoutMs = resolveHandlerTimeout(handler.definition.timeout, handler, handlerContext);
		const timer =
			timeoutMs === null
				? undefined
				: setTimeout(
						() => controller.abort(new HandlerTimeoutError(handler.definition.name, timeoutMs)),
						timeoutMs
					);

		let completed = false;
		const complete = (): void => {
			if (!completed) {
				completed = true;
				callbacks?.onHandlerComplete?.(handler, index);
			}
		};

		let called = false;
		let resolveNext: (() => void) | undefined;
		const nextPromise = new Promise<void>((resolve) => {
			resolveNext = resolve;
		});
		const next = (): void => {
			// Late `next()` calls from an aborted handler must not resume the chain.
			if (called || controller.signal.aborted) {
				return;
			}
			called = true;
			complete();
			resolveNext?.();
		};

		try {
			await raceAbort(
				Promise.resolve(execute(action, handler, handlerContext, next)),
				controller.signal
			);

			if (!called) {
				complete();
				return 'stop';
			}

			await raceAbort(nextPromise, controller.signal);
			return 'next';
		} catch (error) {
			complete();

			if (controller.signal.aborted) {
				const reason: unknown = controller.signal.reason;
				if (reason instanceof HandlerTimeoutError) {
					callbacks?.onHandlerError?.(handler, index, reason);
					console.warn(reason.message);
				}
				return 'aborted';
			}

			// A thrown handler is an unexpected failure (handlers signal an intentional
			// stop by not calling `next()`), so log it and let the chain continue.
			callbacks?.onHandlerError?.(handler, index, error);
			console.error('Handler execution failed', error);
			return 'error';
		} finally {
			clearTimeout(timer);
			chainSignal?.removeEventListener('abort', forwardAbort);
		}
	};

	for (let index = 0; index < handlers.length; index++) {
		const handler = handlers[index];

		if (!handler.definition.isAvailable || !handler.definition.execute) {
			continue;
		}

		if (chainSignal?.aborted) {
			break;
		}

		callbacks?.onHandlerStart?.(handler, index);

		if (!handler.blocking && index < handlers.length - 1) {
			detached.push(executeHandler(handler, index));
			continue;
		}

		const outcome = await executeHandler(handler, index);
		if (outcome === 'stop' || outcome === 'aborted') {
			break;
		}
	}

	await Promise.allSettled(detached);
}
