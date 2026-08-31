import type { WsConnectionStateContext } from '../contexts';
import type { BoundConnection } from './pooled-context';

import { WS_EVENTS } from './event-hub';
import { createPooledContext } from './pooled-context';
import { emitWsEvent } from './ws-event-bus';

export { clearWsEventHandlers, emitWsEvent, subscribeWsEvent } from './ws-event-bus';

function parseMessage(raw: string): { message: string; isJson: boolean; data?: unknown } {
	try {
		const data = JSON.parse(raw) as unknown;
		return { message: raw, isJson: true, data };
	} catch {
		return { message: raw, isJson: false };
	}
}

export type { BoundConnection };

const DUPLICATE_MESSAGE_WINDOW_MS = 250;

function emitConnectionState(
	eventKey: string,
	connections: BoundConnection[],
	url: string,
	activeConnectionId?: string
): void {
	const context = createPooledContext(connections, url, activeConnectionId);

	if (context) {
		emitWsEvent(eventKey, context);
	}
}

export function emitWsConnected(
	connections: BoundConnection[],
	url: string,
	activeConnectionId?: string
): void {
	emitConnectionState(WS_EVENTS.CONNECTED, connections, url, activeConnectionId);
}

export function emitWsDisconnected(
	connections: BoundConnection[],
	url: string,
	activeConnectionId?: string
): void {
	emitConnectionState(WS_EVENTS.DISCONNECTED, connections, url, activeConnectionId);
}

/**
 * Attach listeners to an already-open socket. The caller must wait for `open` before binding.
 */
export function bindWebSocket(
	socket: WebSocket,
	connections: BoundConnection[],
	url: string,
	activeConnectionId?: string
): () => void {
	emitWsConnected(connections, url, activeConnectionId);

	const onClose = () => {
		emitWsDisconnected(connections, url, activeConnectionId);
	};

	let lastMessage = '';
	let lastMessageAt = 0;

	const onMessage = (event: MessageEvent) => {
		const raw = typeof event.data === 'string' ? event.data : String(event.data);
		const now = Date.now();

		if (raw === lastMessage && now - lastMessageAt < DUPLICATE_MESSAGE_WINDOW_MS) {
			return;
		}

		lastMessage = raw;
		lastMessageAt = now;

		const parsed = parseMessage(raw);
		const context = createPooledContext(connections, url, activeConnectionId);

		if (!context) {
			return;
		}

		emitWsEvent(WS_EVENTS.MESSAGE, {
			...context,
			message: parsed.message,
			isJson: parsed.isJson,
			data: parsed.data
		});
	};

	socket.addEventListener('close', onClose);
	socket.addEventListener('message', onMessage);

	return () => {
		socket.removeEventListener('close', onClose);
		socket.removeEventListener('message', onMessage);
	};
}
