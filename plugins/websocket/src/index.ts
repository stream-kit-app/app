import type { Plugin, PluginPageDefinition } from '@stream-kit/app/api';

import { Connection } from './app/lib/connection.svelte';
import { Connections } from './app/lib/connections.svelte';
import ConnectionsPage from './app/ui/connections-page.svelte';
import { createSendMessageHandler } from './handler/send-message';
import {
	createWebSocketPluginController,
	type WebSocketPluginApi,
	type WebSocketPluginController
} from './lib/connection-manager';
import { loadConnections } from './lib/connections';
import { createConnectedTrigger } from './trigger/connected';
import { createDisconnectedTrigger } from './trigger/disconnected';
import { createMessageReceivedTrigger } from './trigger/message-received';
import { configureFieldValueResolver } from './get-field-value';

export type { WsMessageContext, WsConnectionStateContext } from './contexts';
export type { WebSocketPluginApi } from './lib/connection-manager';
export type { WsConnection } from './lib/connections';

const connectionsPage: PluginPageDefinition = {
	customView: 'connections',
	title: 'WebSocket Connections',
	description: 'Manage saved WebSocket connections.'
};

const plugin: Plugin = (app) => {
	configureFieldValueResolver(app);
	let controller: WebSocketPluginController | undefined;
	let connectionsService: Connections | undefined;

	const publicApi: WebSocketPluginApi = {
		getConnections() {
			return controller?.getConnections() ?? [];
		},
		getConnectionStatus(id) {
			return controller?.getConnectionStatus(id) ?? 'disconnected';
		},
		getConnectionError(id) {
			return controller?.getConnectionError(id);
		},
		getConnectionAttempts(id) {
			return controller?.getConnectionAttempts(id) ?? 0;
		},
		getReconnectSettings(id) {
			return controller?.getReconnectSettings(id) ?? {
				maxConnectRetries: 5,
				reconnectDelaySec: 5
			};
		},
		getMaxConnectRetries(id) {
			return controller?.getMaxConnectRetries(id) ?? 5;
		},
		connect(id) {
			return controller?.connect(id) ?? Promise.resolve();
		},
		disconnect(id) {
			return controller?.disconnect(id) ?? Promise.resolve();
		},
		send(id, message) {
			if (!controller) {
				return Promise.reject(new Error('WebSocket plugin is not loaded'));
			}

			return controller.send(id, message);
		},
		ensureConnected(id) {
			if (!controller) {
				return Promise.reject(new Error('WebSocket plugin is not loaded'));
			}

			return controller.ensureConnected(id);
		},
		addTriggerRef(id) {
			controller?.addTriggerRef(id);
		},
		removeTriggerRef(id) {
			controller?.removeTriggerRef(id);
		},
		subscribe(listener) {
			return controller?.subscribe(listener) ?? (() => {});
		},
		getLogs(id) {
			return controller?.getLogs(id) ?? [];
		},
		clearLogs(id) {
			controller?.clearLogs(id);
		},
		subscribeLogs(listener) {
			return controller?.subscribeLogs(listener) ?? (() => {});
		},
		connectAutoConnect() {
			return controller?.connectAutoConnect() ?? Promise.resolve();
		}
	};

	return {
		name: 'WebSocket',
		description: 'Receive and send WebSocket messages with persistent connections.',
		icon: 'ri:links-line',
		isConfigured: () => (controller?.getConnections().length ?? 0) > 0,
		api: {
			websocket: publicApi,
			get connections() {
				return connectionsService;
			}
		},
		customViews: {
			connections: ConnectionsPage
		},
		menuItems: [
			{
				title: 'WebSocket',
				icon: 'ri:links-line',
				page: connectionsPage
			}
		],
		triggers: [
			{
				name: 'WebSocket',
				children: [
					createMessageReceivedTrigger(app),
					createConnectedTrigger(app),
					createDisconnectedTrigger(app)
				]
			}
		],
		handlers: [
			{
				name: 'WebSocket',
				children: [createSendMessageHandler(app)]
			}
		],
		onBoot: async ({ store }) => {
			controller = createWebSocketPluginController(app);
			connectionsService = new Connections(store, controller, app);
			await controller.boot(store);
			await connectionsService.load();
		},
		onReady: async () => {
			await controller?.connectAutoConnect();
		},
		onEnable: async () => {
			await controller?.connectAutoConnect();
		},
		onDisable: async () => {
			await controller?.disconnectAll();
		},
		onSave: async ({ store }) => {
			if (!connectionsService) {
				return;
			}

			const saved = await loadConnections(store);
			await controller?.syncConnections(saved);
			connectionsService.items = saved.map((record) => Connection.fromRecord(record));
		}
	};
};

export default plugin;
