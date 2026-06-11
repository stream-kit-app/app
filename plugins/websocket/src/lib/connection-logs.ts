export const MAX_LOG_ENTRIES = 500;

export type WsLogDirection = 'in' | 'out' | 'system';

export type WsConnectionLogEntry = {
	id: string;
	connectionId: string;
	direction: WsLogDirection;
	message: string;
	timestamp: number;
};

type LogListener = () => void;

export function createConnectionLogStore() {
	const logs = new Map<string, WsConnectionLogEntry[]>();
	const listeners = new Set<LogListener>();

	function notify(): void {
		for (const listener of listeners) {
			listener();
		}
	}

	return {
		append(connectionId: string, direction: WsLogDirection, message: string): void {
			const entry: WsConnectionLogEntry = {
				id: crypto.randomUUID(),
				connectionId,
				direction,
				message,
				timestamp: Date.now()
			};

			const list = logs.get(connectionId) ?? [];
			list.push(entry);

			if (list.length > MAX_LOG_ENTRIES) {
				list.splice(0, list.length - MAX_LOG_ENTRIES);
			}

			logs.set(connectionId, list);
			notify();
		},
		getLogs(connectionId: string): WsConnectionLogEntry[] {
			return logs.get(connectionId) ?? [];
		},
		clear(connectionId: string): void {
			if (!logs.has(connectionId)) {
				return;
			}

			logs.delete(connectionId);
			notify();
		},
		subscribe(listener: LogListener): () => void {
			listeners.add(listener);

			return () => {
				listeners.delete(listener);
			};
		}
	};
}

export type ConnectionLogStore = ReturnType<typeof createConnectionLogStore>;
