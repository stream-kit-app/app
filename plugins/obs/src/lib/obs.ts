import type { PluginAppApi } from '@stream-kit/plugin';
import { OBSWebSocket } from 'obs-websocket-js';

import { invalidateObsCatalog } from './catalog';
import { bindObsWebSocket } from './websocket-setup';

type ObsStateListener = () => void;
type GetValue = (key: string) => string | boolean | number | undefined;

export type ObsPluginApi = {
	readonly isConnected: boolean;
	readonly isConnecting: boolean;
	readonly isWaitingForConnection: boolean;
	readonly connectionError: string | undefined;
	readonly obsVersion: string | undefined;
	readonly client: OBSWebSocket | undefined;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	testConnection(): Promise<boolean>;
	subscribe(listener: ObsStateListener): () => void;
};

const RECONNECT_DELAY_MS = 5_000;

export type ObsPluginController = ObsPluginApi & {
	boot(): Promise<void>;
	reconnectFromSettings(): Promise<void>;
	setGetValue(getValue: GetValue): void;
};

export function isObsConnectionConfigured(
	getValue: (key: string) => string | boolean | number | undefined
): boolean {
	return hasCompleteConnectionSettings(getValue);
}

function hasCompleteConnectionSettings(getValue: GetValue): boolean {
	const host = String(getValue('host') ?? '').trim();
	const port = String(getValue('port') ?? '').trim();
	const password = String(getValue('password') ?? '').trim();

	return Boolean(host && port && password);
}

function readConnectionSettings(getValue: GetValue): { address: string; password: string } | null {
	if (!hasCompleteConnectionSettings(getValue)) {
		return null;
	}

	const host = String(getValue('host') ?? '127.0.0.1').trim() || '127.0.0.1';
	const port = String(getValue('port') ?? '4455').trim() || '4455';
	const password = String(getValue('password') ?? '').trim();

	if (!host) {
		return null;
	}

	if (host.startsWith('ws://') || host.startsWith('wss://')) {
		return { address: host, password };
	}

	return { address: `ws://${host}:${port}`, password };
}

function parseWsAddress(address: string): { host: string; port: number } | null {
	try {
		const url = new URL(address);
		const port = url.port
			? Number(url.port)
			: url.protocol === 'wss:'
				? 443
				: 80;

		if (!url.hostname || !Number.isFinite(port)) {
			return null;
		}

		return { host: url.hostname, port };
	} catch {
		return null;
	}
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
	let autoConnectEnabled = true;

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

		const activeClient = client;
		client = undefined;

		if (activeClient) {
			try {
				await activeClient.disconnect();
			} catch {
				// Ignore disconnect errors when already disconnected.
			}

			activeClient.removeAllListeners();
		}

		setState({
			isConnected: false,
			isConnecting: false,
			obsVersion: undefined
		});
	}

	function scheduleReconnect(): void {
		if (!autoConnectEnabled || reconnectTimer) {
			return;
		}

		reconnectTimer = setTimeout(() => {
			reconnectTimer = undefined;
			void attemptConnect().catch(() => {
				// Errors are handled inside attemptConnect().
			});
		}, RECONNECT_DELAY_MS);
	}

	async function isObsReachable(address: string): Promise<boolean> {
		const parsed = parseWsAddress(address);

		if (!parsed) {
			return true;
		}

		return app.network.isTcpPortReachable(parsed.host, parsed.port, 1_000);
	}

	async function skipConnectUntilObsIsReachable(
		settings: { address: string },
		scheduleRetry: boolean
	): Promise<boolean> {
		const reachable = await isObsReachable(settings.address);

		if (reachable) {
			return false;
		}

		setState({
			isConnected: false,
			isConnecting: false,
			connectionError: undefined
		});

		if (scheduleRetry) {
			scheduleReconnect();
		}

		return true;
	}

	async function attemptConnect(options?: { retryOnFailure?: boolean }): Promise<void> {
		if (isConnecting) {
			return;
		}

		const settings = readConnectionSettings(getValue);

		if (!settings) {
			setState({
				connectionError: 'Host, port, and password are required to connect to OBS.'
			});
			return;
		}

		const willRetryOnFailure = options?.retryOnFailure ?? autoConnectEnabled;

		if (willRetryOnFailure && (await skipConnectUntilObsIsReachable(settings, true))) {
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

			void teardown().catch(() => {
				// Ignore teardown errors during reconnect handling.
			});
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

			if (options?.retryOnFailure ?? autoConnectEnabled) {
				scheduleReconnect();
			}

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
		get isWaitingForConnection() {
			return autoConnectEnabled && !isConnected && !isConnecting;
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
			autoConnectEnabled = true;

			const settings = readConnectionSettings(getValue);

			if (!settings) {
				return;
			}

			await attemptConnect();
		},
		async reconnectFromSettings() {
			if (!autoConnectEnabled && !isConnected) {
				return;
			}

			await attemptConnect();
		},
		async connect() {
			autoConnectEnabled = true;
			await attemptConnect();
		},
		async disconnect() {
			autoConnectEnabled = false;
			await teardown();
			connectionError = undefined;
			notify();
		},
		async testConnection() {
			const shouldResumePolling = autoConnectEnabled && !isConnected;
			const settings = readConnectionSettings(getValue);

			if (!settings) {
				setState({
					connectionError: 'Host, port, and password are required to connect to OBS.'
				});
				return false;
			}

			if (await skipConnectUntilObsIsReachable(settings, shouldResumePolling)) {
				setState({
					connectionError: 'Could not reach OBS Studio on the configured host and port.'
				});
				return false;
			}

			try {
				await attemptConnect({ retryOnFailure: false });
				return true;
			} catch {
				if (shouldResumePolling) {
					scheduleReconnect();
				}

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
