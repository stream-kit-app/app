import type { PluginAppApi, PluginAppRecordCollectionApi, PluginStore } from '@stream-kit/plugin';

export const CONNECTIONS_STORE_KEY = 'connections';
const CONNECTIONS_RECORDS_COLLECTION = 'connections';
const MIGRATION_KEY = '__records_migrated_connections_v1';

export type WsConnection = {
	id: string;
	name: string;
	url: string;
	autoConnect: boolean;
	maxConnectRetries?: number;
	reconnectDelaySec?: number;
};

type ConnectionRecord = WsConnection & { connectionId: string };

function records(app: PluginAppApi): PluginAppRecordCollectionApi {
	return app.records.open<ConnectionRecord>(CONNECTIONS_RECORDS_COLLECTION);
}

function toRecord(connection: WsConnection): ConnectionRecord {
	return { ...connection, connectionId: connection.id };
}

function fromRecord(record: ConnectionRecord): WsConnection {
	const { connectionId, ...connection } = record;
	return { ...connection, id: connectionId };
}

export async function migrateConnections(app: PluginAppApi, store: PluginStore): Promise<void> {
	const legacy = (await store.get<WsConnection[]>(CONNECTIONS_STORE_KEY)) ?? null;
	const alreadyMigrated = await store.get<boolean>(MIGRATION_KEY);

	if (alreadyMigrated && (!legacy || legacy.length === 0)) {
		return;
	}

	const connectionRecords = records(app);
	const existing = await connectionRecords.list<ConnectionRecord>();

	for (const connection of legacy ?? []) {
		if (!existing.some((record) => record.connectionId === connection.id)) {
			await connectionRecords.create(toRecord(connection));
		}
	}

	await store.set(MIGRATION_KEY, true);
	await store.delete(CONNECTIONS_STORE_KEY);
}

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

export async function loadConnections(app: PluginAppApi): Promise<WsConnection[]> {
	const stored = await records(app).list<ConnectionRecord>();
	return stored.map(fromRecord);
}

export async function saveConnections(
	app: PluginAppApi,
	connections: WsConnection[]
): Promise<void> {
	const connectionRecords = records(app);
	const existing = await connectionRecords.list<ConnectionRecord>();

	for (const connection of connections) {
		const record = existing.find((item) => item.connectionId === connection.id);

		if (record) {
			await connectionRecords.update<ConnectionRecord>(record.id, toRecord(connection));
		} else {
			await connectionRecords.create(toRecord(connection));
		}
	}

	for (const record of existing) {
		if (!connections.some((connection) => connection.id === record.connectionId)) {
			await connectionRecords.delete(record.id);
		}
	}
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
