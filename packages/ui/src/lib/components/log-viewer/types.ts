export type LogViewerLevel = 'info' | 'warn' | 'error' | 'debug';

export type LogViewerEntry = {
	id: string;
	timestamp: number;
	level: LogViewerLevel;
	message: string;
	actionName?: string;
	trigger?: string;
};
