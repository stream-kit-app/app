import type { StreamDeckEventContext, StreamDeckEventType } from './types';

type EventHandler = (context: StreamDeckEventContext) => void;

const handlers = new Map<StreamDeckEventType, Set<EventHandler>>();

export function subscribeStreamDeckEvent(
	eventType: StreamDeckEventType,
	handler: (context: StreamDeckEventContext) => void
): () => void {
	let set = handlers.get(eventType);

	if (!set) {
		set = new Set();
		handlers.set(eventType, set);
	}

	set.add(handler);

	return () => {
		set?.delete(handler);

		if (set?.size === 0) {
			handlers.delete(eventType);
		}
	};
}

export function emitStreamDeckEvent(context: StreamDeckEventContext): void {
	const set = handlers.get(context.type);

	if (!set) {
		return;
	}

	for (const handler of set) {
		handler(context);
	}
}
