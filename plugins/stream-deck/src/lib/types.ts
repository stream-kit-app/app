import type {
	StreamDeckCoordinates,
	StreamDeckEventContext,
	StreamDeckEventType
} from '../contexts';

export type { StreamDeckCoordinates, StreamDeckEventContext, StreamDeckEventType };

export const STREAM_DECK_EVENT_TYPES = [
	'keyDown',
	'keyUp',
	'dialRotate',
	'dialDown',
	'dialUp',
	'touchTap',
	'willAppear',
	'willDisappear',
	'connected',
	'disconnected'
] as const satisfies readonly StreamDeckEventType[];

export type RegisteredButton = {
	context: string;
	device?: string;
	actionUUID?: string;
	alias?: string;
	coordinates?: StreamDeckCoordinates;
	settings?: Record<string, unknown>;
	updatedAt: string;
};

export type StreamDeckStatus = {
	pluginConnected: boolean;
	buttonCount: number;
	lastEventAt: string | null;
	lastEventType: StreamDeckEventType | null;
	lastContext: string | null;
	lastAlias: string | null;
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
