type WsEventHandler = (context: unknown) => void;

const eventHandlers = new Map<string, Set<WsEventHandler>>();

export function emitWsEvent(eventKey: string, context: unknown): void {
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

export function clearWsEventHandlers(): void {
	eventHandlers.clear();
}
