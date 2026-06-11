import type { WsConnectionStateContext } from '../contexts';

import { normalizeWsUrl, type WsConnection } from './connections';

export type BoundConnection = {
	id: string;
	name: string;
};

export function getConnectionsSharingUrl(
	connections: WsConnection[],
	url: string
): BoundConnection[] {
	const normalizedUrl = normalizeWsUrl(url);

	if (!normalizedUrl) {
		return [];
	}

	return connections
		.filter((connection) => normalizeWsUrl(connection.url) === normalizedUrl)
		.map((connection) => ({
			id: connection.id,
			name: connection.name
		}));
}

export function createPooledContext(
	connections: BoundConnection[],
	url: string,
	activeConnectionId?: string
): WsConnectionStateContext | undefined {
	if (connections.length === 0) {
		return undefined;
	}

	const affectedConnectionIds = connections.map((connection) => connection.id);
	const primary =
		connections.find((connection) => connection.id === activeConnectionId) ?? connections[0];

	return {
		connectionId: primary.id,
		connectionName: primary.name,
		url,
		affectedConnectionIds
	};
}

export function createPooledContextForConnection(
	connections: WsConnection[],
	connection: WsConnection
): WsConnectionStateContext | undefined {
	const url = normalizeWsUrl(connection.url);

	if (!url) {
		return undefined;
	}

	return createPooledContext(getConnectionsSharingUrl(connections, connection.url), url, connection.id);
}
