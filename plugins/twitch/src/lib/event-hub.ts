type Listener<T> = (context: T) => void;

type HubEntry = {
	listeners: Set<Listener<unknown>>;
	dispose?: () => void;
};

const entries = new Map<string, HubEntry>();

export function subscribe<T>(
	key: string,
	setup: (emit: (context: T) => void) => () => void,
	listener: Listener<T>
): () => void {
	let entry = entries.get(key);

	if (!entry) {
		const listeners = new Set<Listener<T>>();
		const emit = (context: T) => {
			for (const fn of listeners) {
				fn(context);
			}
		};
		const dispose = setup(emit);

		entry = {
			listeners: listeners as Set<Listener<unknown>>,
			dispose
		};
		entries.set(key, entry);
	}

	entry.listeners.add(listener as Listener<unknown>);

	return () => {
		const current = entries.get(key);

		if (!current) {
			return;
		}

		current.listeners.delete(listener as Listener<unknown>);

		if (current.listeners.size === 0) {
			current.dispose?.();
			entries.delete(key);
		}
	};
}
