type Listener<T> = (context: T) => void;

const listeners = new Map<string, Set<Listener<unknown>>>();

export function emitDiscordEvent<T>(key: string, context: T): void {
	const entry = listeners.get(key);

	if (!entry) {
		return;
	}

	for (const listener of entry) {
		listener(context);
	}
}

export function onDiscordEvent<T>(key: string, listener: Listener<T>): () => void {
	let entry = listeners.get(key);

	if (!entry) {
		entry = new Set();
		listeners.set(key, entry);
	}

	entry.add(listener as Listener<unknown>);

	return () => {
		const current = listeners.get(key);

		if (!current) {
			return;
		}

		current.delete(listener as Listener<unknown>);

		if (current.size === 0) {
			listeners.delete(key);
		}
	};
}

export const DISCORD_EVENTS = {
	MESSAGE_RECEIVED: 'discord:message-received',
	ROLE_ADDED: 'discord:role-added',
	ROLE_REMOVED: 'discord:role-removed',
	VOICE_JOIN: 'discord:voice-join',
	VOICE_LEAVE: 'discord:voice-leave',
	VOICE_MOVE: 'discord:voice-move'
} as const;
