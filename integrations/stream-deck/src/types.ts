export type GlobalConnectionSettings = {
	host?: string;
	port?: string | number;
	token?: string;
	autoReconnect?: boolean;
};

export type ActionSettings = {
	alias?: string;
	actionId?: string | number;
	/** Toggle only: action id for the off → on press */
	actionIdOn?: string | number;
	/** Toggle only: action id for the on → off press */
	actionIdOff?: string | number;
	/** Dial: also run this action on rotate, with ticks in data */
	runActionOnRotate?: boolean;
};

export type StreamKitActionSummary = {
	id: number;
	name: string;
};

export type FeedbackEventName =
	| 'setTitle'
	| 'setImage'
	| 'setState'
	| 'showOk'
	| 'showAlert'
	| 'setSettings';

export type FeedbackPayload = {
	context?: string;
	alias?: string;
	title?: string;
	image?: string;
	state?: number;
	settings?: Record<string, unknown>;
};

export type ReportEventInput = {
	type: string;
	context?: string;
	device?: string;
	action?: string;
	alias?: string;
	coordinates?: { column?: number; row?: number };
	settings?: Record<string, unknown>;
	isInMultiAction?: boolean;
	ticks?: number;
	pressed?: boolean;
	payload?: Record<string, unknown>;
};
