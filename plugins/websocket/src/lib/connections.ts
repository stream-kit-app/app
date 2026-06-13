import type { PluginStore } from '@stream-kit/plugin';

export const CONNECTIONS_STORE_KEY = 'connections';

export type WsConnection = {
	id: string;
	name: string;
	url: string;
	autoConnect: boolean;
	maxConnectRetries?: number;
	reconnectDelaySec?: number;
};

export function createConnectionId(): string {
	return crypto.randomUUID();
}

export function normalizeWsUrl(url: string): string | null {
	const trimmed = url.trim();

	if (!trimmed) {
		return null;
	}

	if (trimmed.startsWith('ws://') || trimmed.startsWith('wss://')) {
		return trimmed;
	}

	return `ws://${trimmed}`;
}

export function isValidWsUrl(url: string): boolean {
	const normalized = normalizeWsUrl(url);

	if (!normalized) {
		return false;
	}

	try {
		const parsed = new URL(normalized);
		return parsed.protocol === 'ws:' || parsed.protocol === 'wss:';
	} catch {
		return false;
	}
}

export async function loadConnections(store: PluginStore): Promise<WsConnection[]> {
	const stored = await store.get<WsConnection[]>(CONNECTIONS_STORE_KEY);
	return Array.isArray(stored) ? stored : [];
}

export async function saveConnections(
	store: PluginStore,
	connections: WsConnection[]
): Promise<void> {
	await store.set(CONNECTIONS_STORE_KEY, connections);
}

export function findDuplicateUrl(
	connections: WsConnection[],
	url: string,
	excludeId?: string
): WsConnection | undefined {
	const normalized = normalizeWsUrl(url);

	if (!normalized) {
		return undefined;
	}

	return connections.find((connection) => {
		if (excludeId && connection.id === excludeId) {
			return false;
		}

		return normalizeWsUrl(connection.url) === normalized;
	});
}
