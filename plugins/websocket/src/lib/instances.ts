import type { Connections } from '../app/lib/connections.svelte';

let connectionsService: Connections | undefined;

export function setConnectionsService(service: Connections): void {
	connectionsService = service;
}

export function getConnectionsService(): Connections {
	if (!connectionsService) {
		throw new Error('WebSocket plugin is not loaded');
	}

	return connectionsService;
}

export function tryGetConnectionsService(): Connections | undefined {
	return connectionsService;
}
