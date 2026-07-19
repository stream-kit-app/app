export type StreamDeckCoordinates = {
	column?: number;
	row?: number;
};

export type StreamDeckEventType =
	| 'keyDown'
	| 'keyUp'
	| 'dialRotate'
	| 'dialDown'
	| 'dialUp'
	| 'touchTap'
	| 'willAppear'
	| 'willDisappear'
	| 'connected'
	| 'disconnected';

export type StreamDeckEventContext = {
	type: StreamDeckEventType;
	context?: string;
	device?: string;
	action?: string;
	alias?: string;
	coordinates?: StreamDeckCoordinates;
	settings?: Record<string, unknown>;
	isInMultiAction?: boolean;
	ticks?: number;
	pressed?: boolean;
	payload?: Record<string, unknown>;
	lastEventAt?: string;
};
