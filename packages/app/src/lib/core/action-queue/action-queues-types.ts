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
	run: () => Promise<void>;
};
