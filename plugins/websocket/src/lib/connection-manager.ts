import type { PluginAppApi } from '@stream-kit/plugin';

import type { WsConnectionStateContext, WsMessageContext } from '../contexts';
import {
	normalizeWsUrl,
	type WsConnection
} from './connections';
import { createConnectionLogStore, type WsConnectionLogEntry } from './connection-logs';
import { WS_EVENTS } from './event-hub';
import type { BoundConnection } from './pooled-context';
import { getConnectionReconnectSettings, type WsReconnectSettings } from './settings';
import { bindWebSocket, emitWsDisconnected, subscribeWsEvent } from './websocket-setup';

type StateListener = () => void;

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

type PoolEntry = {
	url: string;
	socket: WebSocket | undefined;
	connectionIds: Set<string>;
	autoConnectIds: Set<string>;
	manualIds: Set<string>;
	triggerRefCounts: Map<string, number>;
	unbind: (() => void) | undefined;
	reconnectTimer: ReturnType<typeof setTimeout> | undefined;
	status: ConnectionStatus;
	error: string | undefined;
	intentionalClose: boolean;
	connectAttempts: number;
	retriesExhausted: boolean;
	activeConnectionId: string | undefined;
	connectPromise: Promise<void> | undefined;
};

export type WebSocketPluginApi = {
	getConnections(): WsConnection[];
	getConnectionStatus(id: string): ConnectionStatus;
	getConnectionError(id: string): string | undefined;
	getConnectionAttempts(id: string): number;
	getReconnectSettings(id: string): WsReconnectSettings;
	getMaxConnectRetries(id: string): number;
	connect(id: string): Promise<void>;
	disconnect(id: string): Promise<void>;
	send(id: string, message: string): Promise<void>;
	ensureConnected(id: string): Promise<void>;
	addTriggerRef(id: string): void;
	removeTriggerRef(id: string): void;
	subscribe(listener: StateListener): () => void;
	getLogs(id: string): WsConnectionLogEntry[];
	clearLogs(id: string): void;
	subscribeLogs(listener: StateListener): () => void;
	connectAutoConnect(): Promise<void>;
};

export type WebSocketPluginController = WebSocketPluginApi & {
	boot(): Promise<void>;
	syncConnections(connections: WsConnection[]): Promise<void>;
	disconnectAll(): Promise<void>;
};

function createPoolEntry(url: string): PoolEntry {
	return {
		url,
		socket: undefined,
		connectionIds: new Set(),
		autoConnectIds: new Set(),
		manualIds: new Set(),
		triggerRefCounts: new Map(),
		unbind: undefined,
		reconnectTimer: undefined,
		status: 'disconnected',
		error: undefined,
		intentionalClose: false,
		connectAttempts: 0,
		retriesExhausted: false,
		activeConnectionId: undefined,
		connectPromise: undefined
	};
}

export function createWebSocketPluginController(_app: PluginAppApi): WebSocketPluginController {
	const listeners = new Set<StateListener>();
	const logStore = createConnectionLogStore();
	const pool = new Map<string, PoolEntry>();
	const suppressedIds = new Set<string>();
	let connections: WsConnection[] = [];
	let enabled = false;
	let unsubscribeLogEvents: (() => void) | undefined;

	function setupLogSubscriptions(): void {
		unsubscribeLogEvents?.();

		const unsubs = [
			subscribeWsEvent<WsMessageContext>(WS_EVENTS.MESSAGE, (context) => {
				logStore.append(context.connectionId, 'in', context.message);
			}),
			subscribeWsEvent<WsConnectionStateContext>(WS_EVENTS.CONNECTED, (context) => {
				logStore.append(context.connectionId, 'system', 'Connected');
			}),
			subscribeWsEvent<WsConnectionStateContext>(WS_EVENTS.DISCONNECTED, (context) => {
				logStore.append(context.connectionId, 'system', 'Disconnected');
			})
		];

		unsubscribeLogEvents = () => {
			for (const unsubscribe of unsubs) {
				unsubscribe();
			}
		};
	}

	function notify(): void {
		for (const listener of listeners) {
			listener();
		}
	}

	function getConnection(id: string): WsConnection | undefined {
		return connections.find((connection) => connection.id === id);
	}

	function getPrimaryConnectionId(entry: PoolEntry): string {
		return entry.connectionIds.values().next().value ?? '';
	}

	function getConnectionSettings(id: string): WsReconnectSettings {
		const connection = getConnection(id);

		if (!connection) {
			return getConnectionReconnectSettings({});
		}

		return getConnectionReconnectSettings(connection);
	}

	function getEntrySettings(entry: PoolEntry): WsReconnectSettings {
		const connectionId = entry.activeConnectionId ?? getPrimaryConnectionId(entry);
		return getConnectionSettings(connectionId);
	}

	function refreshRetriesExhausted(entry: PoolEntry): void {
		if (!entry.activeConnectionId) {
			return;
		}

		const settings = getConnectionSettings(entry.activeConnectionId);

		if (entry.retriesExhausted && entry.connectAttempts < settings.maxConnectRetries) {
			entry.retriesExhausted = false;
		}
	}

	function getBoundConnections(entry: PoolEntry): BoundConnection[] {
		return [...entry.connectionIds].map((id) => {
			const connection = getConnection(id);
			return {
				id,
				name: connection?.name ?? id
			};
		});
	}

	function getUrlForId(id: string): string | null {
		const connection = getConnection(id);

		if (!connection) {
			return null;
		}

		return normalizeWsUrl(connection.url);
	}

	function getPoolEntryForId(id: string): PoolEntry | undefined {
		const url = getUrlForId(id);

		if (!url) {
			return undefined;
		}

		return pool.get(url);
	}

	function hasActiveAutoConnect(entry: PoolEntry): boolean {
		if (!enabled) {
			return false;
		}

		for (const id of entry.autoConnectIds) {
			if (!suppressedIds.has(id)) {
				return true;
			}
		}

		return false;
	}

	function shouldKeepAlive(entry: PoolEntry): boolean {
		if (hasActiveAutoConnect(entry)) {
			return true;
		}

		if (entry.manualIds.size > 0) {
			return true;
		}

		for (const count of entry.triggerRefCounts.values()) {
			if (count > 0) {
				return true;
			}
		}

		return false;
	}

	function resetAttempts(entry: PoolEntry): void {
		entry.connectAttempts = 0;
		entry.retriesExhausted = false;
		entry.error = undefined;
	}

	function setEntryStatus(entry: PoolEntry, status: ConnectionStatus, error?: string): void {
		entry.status = status;
		entry.error = error;
		notify();
	}

	function attemptLabel(entry: PoolEntry): string {
		const settings = getEntrySettings(entry);
		return `${entry.connectAttempts}/${settings.maxConnectRetries}`;
	}

	function recordFailedAttempt(entry: PoolEntry, message: string): boolean {
		const settings = getEntrySettings(entry);
		entry.connectAttempts += 1;

		if (entry.connectAttempts >= settings.maxConnectRetries) {
			entry.retriesExhausted = true;
			setEntryStatus(
				entry,
				'error',
				`${message} (${attemptLabel(entry)} attempts)`
			);
			return false;
		}

		setEntryStatus(
			entry,
			'connecting',
			`${message} (attempt ${attemptLabel(entry)})`
		);
		return true;
	}

	function scheduleReconnect(url: string): void {
		const entry = pool.get(url);

		if (!entry || entry.reconnectTimer || !shouldKeepAlive(entry) || entry.retriesExhausted) {
			return;
		}

		entry.reconnectTimer = setTimeout(() => {
			entry.reconnectTimer = undefined;
			const primaryId = getPrimaryConnectionId(entry);

			if (!primaryId) {
				return;
			}

			void connectId(primaryId, false).catch(() => {
				// Errors are handled inside connectId.
			});
		}, getEntrySettings(entry).reconnectDelaySec * 1_000);
	}

	function clearReconnectTimer(entry: PoolEntry): void {
		if (entry.reconnectTimer) {
			clearTimeout(entry.reconnectTimer);
			entry.reconnectTimer = undefined;
		}
	}

	async function teardownEntry(url: string): Promise<void> {
		const entry = pool.get(url);

		if (!entry) {
			return;
		}

		clearReconnectTimer(entry);

		const wasOpen = entry.socket?.readyState === WebSocket.OPEN;
		const boundConnections = getBoundConnections(entry);

		entry.unbind?.();
		entry.unbind = undefined;

		if (entry.socket) {
			entry.intentionalClose = true;

			try {
				entry.socket.close();
			} catch {
				// Ignore close errors.
			}

			entry.socket = undefined;
		}

		entry.intentionalClose = false;

		if (wasOpen) {
			emitWsDisconnected(boundConnections, url, entry.activeConnectionId);
		}

		if (!entry.retriesExhausted) {
			setEntryStatus(entry, 'disconnected', undefined);
		}
	}

	function ensurePoolEntry(url: string, connection: WsConnection): PoolEntry {
		let entry = pool.get(url);

		if (!entry) {
			entry = createPoolEntry(url);
			pool.set(url, entry);
		}

		entry.connectionIds.add(connection.id);

		if (connection.autoConnect) {
			entry.autoConnectIds.add(connection.id);
		} else {
			entry.autoConnectIds.delete(connection.id);
		}

		return entry;
	}

	function rebuildPool(): void {
		const nextUrls = new Map<string, WsConnection[]>();

		for (const connection of connections) {
			const url = normalizeWsUrl(connection.url);

			if (!url) {
				continue;
			}

			const list = nextUrls.get(url) ?? [];
			list.push(connection);
			nextUrls.set(url, list);
		}

		for (const [url, entry] of pool) {
			if (!nextUrls.has(url)) {
				void teardownEntry(url);
				pool.delete(url);
			}
		}

		for (const [url, grouped] of nextUrls) {
			const entry = pool.get(url) ?? createPoolEntry(url);

			entry.connectionIds = new Set(grouped.map((connection) => connection.id));
			entry.autoConnectIds = new Set(
				grouped.filter((connection) => connection.autoConnect).map((connection) => connection.id)
			);

			for (const id of [...entry.manualIds]) {
				if (!entry.connectionIds.has(id)) {
					entry.manualIds.delete(id);
				}
			}

			for (const id of [...entry.triggerRefCounts.keys()]) {
				if (!entry.connectionIds.has(id)) {
					entry.triggerRefCounts.delete(id);
				}
			}

			for (const id of [...suppressedIds]) {
				if (!entry.connectionIds.has(id)) {
					suppressedIds.delete(id);
				}
			}

			pool.set(url, entry);
			refreshRetriesExhausted(entry);
		}
	}

	function waitForSocketOpen(socket: WebSocket, url: string): Promise<void> {
		if (socket.readyState === WebSocket.OPEN) {
			return Promise.resolve();
		}

		if (socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
			return Promise.reject(new Error(`Failed to connect to ${url}.`));
		}

		return new Promise<void>((resolve, reject) => {
			const onOpen = () => {
				cleanup();
				resolve();
			};

			const onError = () => {
				cleanup();
				reject(new Error(`Failed to connect to ${url}.`));
			};

			const cleanup = () => {
				socket.removeEventListener('open', onOpen);
				socket.removeEventListener('error', onError);
			};

			socket.addEventListener('open', onOpen);
			socket.addEventListener('error', onError);
		});
	}

	function handleSocketClose(entry: PoolEntry, url: string): void {
		if (entry.intentionalClose) {
			return;
		}

		entry.socket = undefined;
		entry.unbind?.();
		entry.unbind = undefined;

		if (shouldKeepAlive(entry)) {
			setEntryStatus(
				entry,
				'connecting',
				`Reconnecting in ${getEntrySettings(entry).reconnectDelaySec}s…`
			);
			scheduleReconnect(url);
			return;
		}

		setEntryStatus(entry, 'disconnected', undefined);
	}

	async function connectEntry(
		url: string,
		connectionId: string,
		manual: boolean,
		connection: WsConnection
	): Promise<void> {
		await teardownEntry(url);

		let entry = ensurePoolEntry(url, connection);
		entry.activeConnectionId = connectionId;

		if (manual) {
			entry.manualIds.add(connectionId);
		}

		setEntryStatus(
			entry,
			'connecting',
			entry.connectAttempts > 0 ? `Connecting (attempt ${attemptLabel(entry)})` : undefined
		);

		const socket = new WebSocket(url);
		entry.socket = socket;

		try {
			await waitForSocketOpen(socket, url);
		} catch (error) {
			entry.socket = undefined;

			try {
				socket.close();
			} catch {
				// Ignore close errors.
			}

			throw error;
		}

		entry.unbind = bindWebSocket(socket, getBoundConnections(entry), url, connectionId);
		socket.addEventListener('close', () => handleSocketClose(entry, url));

		resetAttempts(entry);
		setEntryStatus(entry, 'connected');
	}

	async function openSocket(url: string, connectionId: string, manual: boolean): Promise<void> {
		const connection = getConnection(connectionId);

		if (!connection) {
			throw new Error('Connection not found.');
		}

		const entry = ensurePoolEntry(url, connection);
		entry.activeConnectionId = connectionId;

		if (manual) {
			entry.manualIds.add(connectionId);
		}

		if (entry.socket?.readyState === WebSocket.OPEN) {
			resetAttempts(entry);
			setEntryStatus(entry, 'connected');
			return;
		}

		if (entry.connectPromise) {
			await entry.connectPromise;
			return;
		}

		entry.connectPromise = connectEntry(url, connectionId, manual, connection);
		const connectTask = entry.connectPromise;

		try {
			await connectTask;
		} finally {
			const current = pool.get(url);

			if (current?.connectPromise === connectTask) {
				current.connectPromise = undefined;
			}
		}
	}

	async function connectId(id: string, manual: boolean): Promise<void> {
		const connection = getConnection(id);

		if (!connection) {
			throw new Error('Connection not found.');
		}

		const url = normalizeWsUrl(connection.url);

		if (!url) {
			throw new Error('Enter a valid WebSocket URL.');
		}

		if (manual) {
			suppressedIds.delete(id);
			const entry = ensurePoolEntry(url, connection);
			resetAttempts(entry);
			clearReconnectTimer(entry);
		}

		try {
			await openSocket(url, id, manual);
		} catch (error) {
			const entry = pool.get(url);
			const message = error instanceof Error ? error.message : 'Failed to connect.';

			if (entry && shouldKeepAlive(entry) && recordFailedAttempt(entry, message)) {
				scheduleReconnect(url);
			} else if (entry) {
				setEntryStatus(entry, 'error', message);
			}

			throw error;
		}
	}

	return {
		getConnections() {
			return connections;
		},
		getConnectionStatus(id: string): ConnectionStatus {
			const entry = getPoolEntryForId(id);

			if (!entry) {
				return 'disconnected';
			}

			return entry.status;
		},
		getConnectionError(id: string): string | undefined {
			return getPoolEntryForId(id)?.error;
		},
		getConnectionAttempts(id: string): number {
			return getPoolEntryForId(id)?.connectAttempts ?? 0;
		},
		getReconnectSettings(id: string) {
			return getConnectionSettings(id);
		},
		getMaxConnectRetries(id: string) {
			return getConnectionSettings(id).maxConnectRetries;
		},
		async connect(id: string) {
			await connectId(id, true);
		},
		async disconnect(id: string) {
			const url = getUrlForId(id);
			const entry = url ? pool.get(url) : undefined;

			if (!entry) {
				return;
			}

			suppressedIds.add(id);
			entry.manualIds.delete(id);
			entry.triggerRefCounts.delete(id);
			clearReconnectTimer(entry);

			if (!shouldKeepAlive(entry)) {
				entry.retriesExhausted = false;
				entry.connectAttempts = 0;
				await teardownEntry(url!);

				if (entry.connectionIds.size === 0) {
					pool.delete(url!);
				}
			} else {
				setEntryStatus(entry, 'disconnected', undefined);
			}

			notify();
		},
		async ensureConnected(id: string) {
			const entry = getPoolEntryForId(id);

			if (entry?.socket?.readyState === WebSocket.OPEN) {
				return;
			}

			if (entry?.retriesExhausted) {
				resetAttempts(entry);
			}

			suppressedIds.delete(id);
			await connectId(id, false);
		},
		async send(id: string, message: string) {
			if (getPoolEntryForId(id)?.retriesExhausted) {
				resetAttempts(getPoolEntryForId(id)!);
			}

			suppressedIds.delete(id);
			await connectId(id, false);

			const entry = getPoolEntryForId(id);
			const socket = entry?.socket;

			if (!socket || socket.readyState !== WebSocket.OPEN) {
				throw new Error('WebSocket is not connected.');
			}

			socket.send(message);
			logStore.append(id, 'out', message);
		},
		addTriggerRef(id: string) {
			const url = getUrlForId(id);
			const connection = getConnection(id);

			if (!url || !connection) {
				return;
			}

			suppressedIds.delete(id);
			const entry = ensurePoolEntry(url, connection);
			const current = entry.triggerRefCounts.get(id) ?? 0;
			entry.triggerRefCounts.set(id, current + 1);
		},
		removeTriggerRef(id: string) {
			const entry = getPoolEntryForId(id);

			if (!entry) {
				return;
			}

			const current = entry.triggerRefCounts.get(id) ?? 0;

			if (current <= 1) {
				entry.triggerRefCounts.delete(id);
			} else {
				entry.triggerRefCounts.set(id, current - 1);
			}

			const url = getUrlForId(id);

			if (url && !shouldKeepAlive(entry)) {
				void teardownEntry(url);
				pool.delete(url);
			}
		},
		subscribe(listener) {
			listeners.add(listener);

			return () => {
				listeners.delete(listener);
			};
		},
		getLogs(id: string) {
			return logStore.getLogs(id);
		},
		clearLogs(id: string) {
			logStore.clear(id);
		},
		subscribeLogs(listener) {
			return logStore.subscribe(listener);
		},
		async boot() {
			setupLogSubscriptions();
			rebuildPool();
			notify();
		},
		async syncConnections(nextConnections) {
			connections = nextConnections;
			rebuildPool();
			notify();

			if (enabled) {
				await this.connectAutoConnect();
			}
		},
		async connectAutoConnect() {
			enabled = true;

			for (const connection of connections) {
				if (!connection.autoConnect || suppressedIds.has(connection.id)) {
					continue;
				}

				try {
					await connectId(connection.id, false);
				} catch (error) {
					console.warn(`WebSocket auto-connect failed for ${connection.name}`, error);
				}
			}
		},
		async disconnectAll() {
			enabled = false;
			suppressedIds.clear();

			for (const url of [...pool.keys()]) {
				await teardownEntry(url);
			}

			pool.clear();
			notify();
		}
	};
}
