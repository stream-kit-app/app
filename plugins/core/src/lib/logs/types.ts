export type ActionLogLevel = 'info' | 'warn' | 'error' | 'debug';

export type ActionLogEntry = {
	id: string;
	timestamp: number;
	level: ActionLogLevel;
	message: string;
	actionId?: number;
	actionName?: string;
	trigger?: string;
};

export type ActionLogAppendInput = {
	level?: ActionLogLevel;
	message: string;
	actionId?: number;
	actionName?: string;
	trigger?: string;
};
