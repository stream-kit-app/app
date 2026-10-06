import type { ActionHandler } from './action-handler.svelte';
import type { HandlerTriggerContext } from './handler-context';

/** How long a handler may run before it is aborted, unless its definition says otherwise. */
export const DEFAULT_HANDLER_TIMEOUT_MS = 120_000;

/**
 * Max run time in ms for a handler. `null` disables the limit (for handlers that run a
 * nested chain whose handlers time out on their own). A function can derive the limit
 * from field values, e.g. a delay's duration.
 */
export type HandlerTimeout =
	| number
	| null
	| ((handler: ActionHandler, context: HandlerTriggerContext) => number | null | undefined);

/** Abort reason when a handler exceeds its timeout. */
export class HandlerTimeoutError extends Error {
	readonly handlerName: string;
	readonly timeoutMs: number;

	constructor(handlerName: string, timeoutMs: number) {
		super(`Handler "${handlerName}" did not finish within ${Math.round(timeoutMs / 1000)}s`);
		this.name = 'HandlerTimeoutError';
		this.handlerName = handlerName;
		this.timeoutMs = timeoutMs;
	}
}

export function resolveHandlerTimeout(
	timeout: HandlerTimeout | undefined,
	handler: ActionHandler,
	context: HandlerTriggerContext
): number | null {
	const value = typeof timeout === 'function' ? timeout(handler, context) : timeout;

	if (value === null) {
		return null;
	}

	return typeof value === 'number' && Number.isFinite(value) && value > 0
		? value
		: DEFAULT_HANDLER_TIMEOUT_MS;
}

function abortReason(signal: AbortSignal): unknown {
	return signal.reason ?? new DOMException('The operation was aborted.', 'AbortError');
}

/** Resolves after `ms`, or rejects with the signal's reason when it aborts first. */
export function abortableDelay(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(abortReason(signal));
			return;
		}

		const onAbort = (): void => {
			clearTimeout(timer);
			reject(abortReason(signal!));
		};
		const timer = setTimeout(() => {
			signal?.removeEventListener('abort', onAbort);
			resolve();
		}, ms);

		signal?.addEventListener('abort', onAbort, { once: true });
	});
}

/** Settles like `promise`, or rejects with the signal's reason when it aborts first. */
export function raceAbort<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
	if (!signal) {
		return promise;
	}

	if (signal.aborted) {
		promise.catch(() => undefined);
		return Promise.reject(abortReason(signal));
	}

	return new Promise<T>((resolve, reject) => {
		const onAbort = (): void => reject(abortReason(signal));
		signal.addEventListener('abort', onAbort, { once: true });
		promise.then(
			(value) => {
				signal.removeEventListener('abort', onAbort);
				resolve(value);
			},
			(error: unknown) => {
				signal.removeEventListener('abort', onAbort);
				reject(error);
			}
		);
	});
}
