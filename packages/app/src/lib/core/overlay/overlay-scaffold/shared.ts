import { DEFAULT_OVERLAY_PORT } from '../types';

export function viteWsProxyConfig(): string {
	return `		proxy: {
			'/ws': {
				target: 'http://127.0.0.1:${DEFAULT_OVERLAY_PORT}',
				ws: true,
				changeOrigin: true
			}
		}`;
}

/** Relative asset paths so OBS can load overlays from /o/<id>/ */
export function viteBuildConfig(): string {
	return `	base: './',
	build: {
		outDir: 'dist',
		emptyOutDir: true
	},`;
}

export function overlayTsContent(overlayId: string): string {
	return `const overlayId = import.meta.env.VITE_OVERLAY_ID ?? '${overlayId}';

type OverlayHandler = (payload: unknown) => void;

export function connectOverlay(handlers: Record<string, OverlayHandler> = {}): {
	send(event: string, payload?: unknown): void;
} {
	const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
	let reconnectAttempt = 0;
	let socket: WebSocket | null = null;

	const connect = () => {
		const ws = new WebSocket(\`\${protocol}//\${location.host}/ws?overlayId=\${overlayId}\`);
		socket = ws;

		ws.onmessage = (event) => {
			try {
				const message = JSON.parse(String(event.data)) as {
					event: string;
					payload: unknown;
				};
				handlers[message.event]?.(message.payload);
			} catch {
				// Ignore malformed messages.
			}
		};

		ws.onclose = () => {
			socket = null;
			const delay = Math.min(1000 * 2 ** reconnectAttempt, 30_000);
			reconnectAttempt += 1;
			setTimeout(connect, delay);
		};

		ws.onopen = () => {
			reconnectAttempt = 0;
		};
	};

	connect();

	return {
		send(event: string, payload: unknown = {}) {
			if (!event.trim()) {
				return;
			}

			if (!socket || socket.readyState !== WebSocket.OPEN) {
				console.warn('[overlay] WebSocket is not connected; message not sent:', event);
				return;
			}

			socket.send(JSON.stringify({ event: event.trim(), payload }));
		}
	};
}
`;
}
