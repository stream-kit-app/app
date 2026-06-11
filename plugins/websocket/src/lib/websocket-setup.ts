import type { WsConnectionStateContext, WsMessageContext } from '../contexts';
import { WS_EVENTS } from './event-hub';

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

export type BoundConnection = {
	id: string;
	name: string;
};

export function emitWsConnected(connections: BoundConnection[], url: string): void {
	for (const connection of connections) {
		const context: WsConnectionStateContext = {
			connectionId: connection.id,
			connectionName: connection.name,
			url
		};

		emit(WS_EVENTS.CONNECTED, context);
	}
}

export function emitWsDisconnected(connections: BoundConnection[], url: string): void {
	for (const connection of connections) {
		const context: WsConnectionStateContext = {
			connectionId: connection.id,
			connectionName: connection.name,
			url
		};

		emit(WS_EVENTS.DISCONNECTED, context);
	}
}

export function bindWebSocket(
	socket: WebSocket,
	connections: BoundConnection[],
	url: string
): () => void {
	const onOpen = () => {
		emitWsConnected(connections, url);
	};

	const onClose = () => {
		emitWsDisconnected(connections, url);
	};

	const onMessage = (event: MessageEvent) => {
		const raw = typeof event.data === 'string' ? event.data : String(event.data);
		const parsed = parseMessage(raw);

		for (const connection of connections) {
			const context: WsMessageContext = {
				connectionId: connection.id,
				connectionName: connection.name,
				url,
				message: parsed.message,
				isJson: parsed.isJson,
				data: parsed.data
			};

			emit(WS_EVENTS.MESSAGE, context);
		}
	};

	socket.addEventListener('open', onOpen);
	socket.addEventListener('close', onClose);
	socket.addEventListener('message', onMessage);

	if (socket.readyState === WebSocket.OPEN) {
		onOpen();
	}

	return () => {
		socket.removeEventListener('open', onOpen);
		socket.removeEventListener('close', onClose);
		socket.removeEventListener('message', onMessage);
	};
}
