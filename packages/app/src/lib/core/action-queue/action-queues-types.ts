export type ActionQueueDefinition = {
	id: number;
	name: string;
	concurrency: number;
	maxLength: number | null;
	sortOrder: number;
};

export type ActionQueueStats = {
	pending: number;
	active: number;
	paused: boolean;
	pendingActions: QueuedActionEntry[];
	activeActions: QueuedActionEntry[];
};

export type QueuedActionEntry = {
	jobId: string;
	actionId: number | null;
	actionName: string;
};

export type QueueJob = {
	jobId: string;
	actionId: number | null;
	actionName: string;
	/** Aborted when the job exceeds the queue's safety limit; pass it to the handler chain. */
	run: (signal: AbortSignal) => Promise<void>;
};
