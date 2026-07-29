import { listen, type UnlistenFn } from '@tauri-apps/api/event';

import type { OverlayMessageContext } from './contexts';

type OverlayMessageHandler = (context: OverlayMessageContext) => void;

function normalizePayload(payload: unknown): unknown {
	if (payload === undefined || payload === null) {
		return {};
	}

	return payload;
}

function toMessageString(payload: unknown): string {
	try {
		return JSON.stringify(payload);
	} catch {
		return String(payload);
	}
}

export class OverlayMessageHub {
	private unlisten: UnlistenFn | undefined;
	private listenersReady: Promise<void> | undefined;
	private readonly handlers = new Set<OverlayMessageHandler>();

	onMessage(handler: OverlayMessageHandler): () => void {
		void this.ensureListener();
		this.handlers.add(handler);

		return () => {
			this.handlers.delete(handler);
		};
	}

	private async ensureListener(): Promise<void> {
		if (this.unlisten) {
			return;
		}

		if (!this.listenersReady) {
			this.listenersReady = this.registerListener();
		}

		await this.listenersReady;
	}

	private async registerListener(): Promise<void> {
		this.unlisten = await listen<OverlayMessageContext>('overlay-message', (event) => {
			const payload = normalizePayload(event.payload.payload);
			const context: OverlayMessageContext = {
				overlayId: event.payload.overlayId,
				event: event.payload.event,
				payload,
				message: toMessageString(payload),
				timestamp: event.payload.timestamp
			};

			for (const handler of this.handlers) {
				handler(context);
			}
		});
	}

	/** Deliver a message from a non-Tauri source (e.g. cloud publisher WebSocket). */
	dispatch(context: OverlayMessageContext): void {
		const payload = normalizePayload(context.payload);
		const next: OverlayMessageContext = {
			overlayId: context.overlayId,
			event: context.event,
			payload,
			message: context.message || toMessageString(payload),
			timestamp: context.timestamp || Date.now()
		};

		for (const handler of this.handlers) {
			handler(next);
		}
	}
}
