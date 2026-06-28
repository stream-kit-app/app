/** Stored on `action_queues.concurrency` when jobs may run in parallel. */
export const QUEUE_CONCURRENCY_UNLIMITED = 0;

/** Stored when the queue runs strictly one action at a time. */
export const QUEUE_CONCURRENCY_BLOCKING = 1;

export function isQueueBlocking(concurrency: number): boolean {
	return concurrency === QUEUE_CONCURRENCY_BLOCKING;
}

export function concurrencyFromBlocking(blocking: boolean): number {
	return blocking ? QUEUE_CONCURRENCY_BLOCKING : QUEUE_CONCURRENCY_UNLIMITED;
}
