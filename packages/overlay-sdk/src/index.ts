export type OverlayHandler<T = unknown> = (payload: T) => void;

export type OverlayContextEnvelope = {
	overlayId: string;
	context: Record<string, unknown>;
};

export type OverlayBroadcastMessage = {
	overlayId: string;
	event: string;
	payload: unknown;
	timestamp: number;
};

export type CreateOverlayOptions = {
	handlers?: Record<string, OverlayHandler>;
	onConnect?: () => void;
	onDisconnect?: () => void;
};

export type OverlayRuntime = {
	context: Record<string, unknown>;
	overlayId: string;
	send: (event: string, payload: unknown) => void;
};

declare global {
	interface Window {
		__OVERLAY_CONTEXT__?: OverlayContextEnvelope;
	}
}

function readEnvelope(): OverlayContextEnvelope {
	const envelope = window.__OVERLAY_CONTEXT__;

	if (!envelope || typeof envelope !== 'object') {
		return { overlayId: '', context: {} };
	}

	return {
		overlayId: typeof envelope.overlayId === 'string' ? envelope.overlayId : '',
		context:
			envelope.context && typeof envelope.context === 'object'
				? (envelope.context as Record<string, unknown>)
				: {}
	};
}

function resolveWebSocketUrl(overlayId: string): string {
	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	const host = window.location.host;
	const params = new URLSearchParams({ overlayId });

	return `${protocol}//${host}/ws?${params.toString()}`;
}

export function createOverlay(options: CreateOverlayOptions = {}): OverlayRuntime {
	const envelope = readEnvelope();
	const overlayId = envelope.overlayId;
	const handlers = options.handlers ?? {};

	let socket: WebSocket | null = null;
	let reconnectAttempt = 0;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	let disposed = false;

	const connect = () => {
		if (disposed || !overlayId) {
			return;
		}

		socket = new WebSocket(resolveWebSocketUrl(overlayId));

		socket.addEventListener('open', () => {
			reconnectAttempt = 0;
			options.onConnect?.();
		});

		socket.addEventListener('message', (event) => {
			try {
				const message = JSON.parse(String(event.data)) as OverlayBroadcastMessage;
				const handler = handlers[message.event];

				if (handler) {
					handler(message.payload);
				}
			} catch {
				// Ignore malformed messages from the overlay server.
			}
		});

		socket.addEventListener('close', () => {
			options.onDisconnect?.();

			if (disposed) {
				return;
			}

			const delay = Math.min(1000 * 2 ** reconnectAttempt, 30_000);
			reconnectAttempt += 1;
			reconnectTimer = setTimeout(connect, delay);
		});
	};

	connect();

	return {
		overlayId,
		context: envelope.context,
		send: (event, payload) => {
			if (!socket || socket.readyState !== WebSocket.OPEN) {
				return;
			}

			socket.send(
				JSON.stringify({
					event,
					payload,
					timestamp: Date.now()
				})
			);
		}
	};
}
