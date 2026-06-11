import type { WebSocketPluginRegistrationApi } from '../../lib/plugin-api';

import type { Connections } from './connections.svelte';

import { getApp } from '$lib/core/registry';

export function getConnectionsService(): Connections {
	const api = getApp().plugins.tryGet<WebSocketPluginRegistrationApi & { connections: Connections }>(
		'websocket'
	);

	if (!api?.connections) {
		throw new Error('WebSocket plugin is not loaded');
	}

	return api.connections;
}

export function tryGetConnectionsService(): Connections | undefined {
	return getApp().plugins.tryGet<WebSocketPluginRegistrationApi & { connections: Connections }>(
		'websocket'
	)?.connections;
}
