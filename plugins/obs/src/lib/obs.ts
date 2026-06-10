import type { PluginAppApi } from '@stream-kit/app/api';
import { OBSWebSocket } from 'obs-websocket-js';

import { invalidateObsCatalog } from './catalog';
import { bindObsWebSocket } from './websocket-setup';

type ObsStateListener = () => void;
type GetValue = (key: string) => string | boolean | number | undefined;

export type ObsPluginApi = {
	readonly isConnected: boolean;
	readonly isConnecting: boolean;
	readonly connectionError: string | undefined;
	readonly obsVersion: string | undefined;
	readonly client: OBSWebSocket | undefined;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	testConnection(): Promise<boolean>;
	subscribe(listener: ObsStateListener): () => void;
};

export type ObsPluginController = ObsPluginApi & {
	boot(): Promise<void>;
	reconnectFromSettings(): Promise<void>;
	setGetValue(getValue: GetValue): void;
};

function readConnectionSettings(getValue: GetValue): { address: string; password: string } | null {
	const host = String(getValue('host') ?? '127.0.0.1').trim() || '127.0.0.1';
	const port = String(getValue('port') ?? '4455').trim() || '4455';
	const password = String(getValue('password') ?? '');

	if (!host) {
		return null;
	}

	if (host.startsWith('ws://') || host.startsWith('wss://')) {
		return { address: host, password };
	}

	return { address: `ws://${host}:${port}`, password };
}

export function createObsPluginApi(app: PluginAppApi): ObsPluginController {
	const listeners = new Set<ObsStateListener>();
	let getValue: GetValue = () => undefined;
	let isConnected = false;
	let isConnecting = false;
	let connectionError: string | undefined;
	let obsVersion: string | undefined;
	let client: OBSWebSocket | undefined;
	let unbindEvents: (() => void) | undefined;
	let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

	function notify(): void {
		for (const listener of listeners) {
			listener();
		}
	}

	function setState(partial: {
		isConnected?: boolean;
		isConnecting?: boolean;
		connectionError?: string;
		obsVersion?: string;
	}): void {
		if (partial.isConnected !== undefined) {
			isConnected = partial.isConnected;
		}

		if (partial.isConnecting !== undefined) {
			isConnecting = partial.isConnecting;
		}

		if (partial.connectionError !== undefined) {
			connectionError = partial.connectionError;
		}

		if (partial.obsVersion !== undefined) {
			obsVersion = partial.obsVersion;
		}

		notify();
	}

	async function teardown(): Promise<void> {
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = undefined;
		}

		invalidateObsCatalog();

		unbindEvents?.();
		unbindEvents = undefined;

		if (client) {
			try {
				await client.disconnect();
			} catch {
				// Ignore disconnect errors when already disconnected.
			}

			client.removeAllListeners();
			client = undefined;
		}

		setState({
			isConnected: false,
			isConnecting: false,
			obsVersion: undefined
		});
	}

	function scheduleReconnect(): void {
		if (reconnectTimer) {
			return;
		}

		reconnectTimer = setTimeout(() => {
			reconnectTimer = undefined;
			void connect();
		}, 5_000);
	}

	async function connect(): Promise<void> {
		if (isConnecting) {
			return;
		}

		const settings = readConnectionSettings(getValue);

		if (!settings) {
			setState({
				connectionError: 'Host is required to connect to OBS.'
			});
			return;
		}

		await teardown();

		isConnecting = true;
		connectionError = undefined;
		notify();

		const nextClient = new OBSWebSocket();

		nextClient.on('ConnectionClosed', () => {
			if (client !== nextClient) {
				return;
			}

			void teardown();
			scheduleReconnect();
		});

		try {
			const hello = await nextClient.connect(settings.address, settings.password);
			client = nextClient;
			unbindEvents = bindObsWebSocket(nextClient);

			setState({
				isConnected: true,
				isConnecting: false,
				connectionError: undefined,
				obsVersion: hello.obsWebSocketVersion
			});
		} catch (error) {
			await teardown();

			const message =
				error instanceof Error ? error.message : 'Failed to connect to OBS WebSocket.';

			setState({
				isConnected: false,
				isConnecting: false,
				connectionError: message
			});

			throw error;
		}
	}

	return {
		get isConnected() {
			return isConnected;
		},
		get isConnecting() {
			return isConnecting;
		},
		get connectionError() {
			return connectionError;
		},
		get obsVersion() {
			return obsVersion;
		},
		get client() {
			return client;
		},
		setGetValue(nextGetValue) {
			getValue = nextGetValue;
		},
		async boot() {
			const settings = readConnectionSettings(getValue);

			if (!settings) {
				return;
			}

			try {
				await connect();
			} catch (error) {
				console.warn('OBS plugin failed to connect on boot', error);
			}
		},
		async reconnectFromSettings() {
			if (!isConnected) {
				return;
			}

			try {
				await connect();
			} catch (error) {
				console.warn('OBS plugin failed to reconnect after settings save', error);
			}
		},
		connect,
		async disconnect() {
			await teardown();
			connectionError = undefined;
			notify();
		},
		async testConnection() {
			try {
				await connect();
				return true;
			} catch {
				return false;
			}
		},
		subscribe(listener) {
			listeners.add(listener);

			return () => {
				listeners.delete(listener);
			};
		}
	};
}
