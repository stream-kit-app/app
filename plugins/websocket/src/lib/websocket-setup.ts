import type { WsConnectionStateContext } from '../contexts';

import { WS_EVENTS } from './event-hub';
import { createPooledContext, type BoundConnection } from './pooled-context';

type WsEventHandler = (context: unknown) => void;

const eventHandlers = new Map<string, Set<WsEventHandler>>();

function emit(eventKey: string, context: unknown): void {
	const handlers = eventHandlers.get(eventKey);

	if (!handlers) {
		return;
	}

	for (const handler of handlers) {
		handler(context);
	}
}

export function subscribeWsEvent<TContext>(
	eventKey: string,
	handler: (context: TContext) => void
): () => void {
	let handlers = eventHandlers.get(eventKey);

	if (!handlers) {
		handlers = new Set();
		eventHandlers.set(eventKey, handlers);
	}

	const wrapped: WsEventHandler = (context) => {
		handler(context as TContext);
	};

	handlers.add(wrapped);

	return () => {
		handlers?.delete(wrapped);

		if (handlers?.size === 0) {
			eventHandlers.delete(eventKey);
		}
	};
}

function parseMessage(raw: string): { message: string; isJson: boolean; data?: unknown } {
	try {
		const data = JSON.parse(raw) as unknown;
		return { message: raw, isJson: true, data };
	} catch {
		return { message: raw, isJson: false };
	}
}

export type { BoundConnection };

function emitConnectionState(
	eventKey: string,
	connections: BoundConnection[],
	url: string,
	activeConnectionId?: string
): void {
	const context = createPooledContext(connections, url, activeConnectionId);

	if (context) {
		emit(eventKey, context);
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

	const onMessage = (event: MessageEvent) => {
		const raw = typeof event.data === 'string' ? event.data : String(event.data);
		const parsed = parseMessage(raw);
		const context = createPooledContext(connections, url, activeConnectionId);

		if (!context) {
			return;
		}

		emit(WS_EVENTS.MESSAGE, {
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
