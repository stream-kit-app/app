export type ActionQueueEvent =
	| 'paused'
	| 'resumed'
	| 'idle'
	| 'job_enqueued'
	| 'job_started'
	| 'job_completed';

export type ActionQueueJobContext = {
	jobId: string;
	actionId: number | null;
	actionName: string;
};

export type ActionQueueEventContext = {
	queueId: number;
	queueName: string;
	pending: number;
	active: number;
	paused: boolean;
	job?: ActionQueueJobContext;
};

export type {
	ActionQueueDefinition,
	ActionQueueStats,
	QueuedActionEntry,
	QueueJob
} from './action-queues-types';
