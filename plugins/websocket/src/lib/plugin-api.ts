import type { PluginAppApi } from '@stream-kit/plugin';

import type { WebSocketPluginApi } from './connection-manager';

export type WebSocketPluginRegistrationApi = {
	websocket: WebSocketPluginApi;
};

export function getWebSocket(app: PluginAppApi): WebSocketPluginApi {
	const api = app.plugins.get<WebSocketPluginRegistrationApi>('websocket');

	if (!api?.websocket) {
		throw new Error('WebSocket plugin is not loaded');
	}

	return api.websocket;
}

export function tryGetWebSocket(app: PluginAppApi): WebSocketPluginApi | undefined {
	return app.plugins.tryGet<WebSocketPluginRegistrationApi>('websocket')?.websocket;
}
