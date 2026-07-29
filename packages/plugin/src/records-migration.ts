import type { PluginAppApi } from '../../app/src/lib/core/plugins/plugin-app-api.types';
import type { PluginStore } from '../../app/src/lib/core/plugins/store';

const SYNC_ID_RE = /^[a-z0-9]{15}$/;

export function isRecordsSyncId(value: unknown): value is string {
	return typeof value === 'string' && SYNC_ID_RE.test(value);
}

/**
 * One-time migration from a PluginStore array key into `app.records`.
 * Idempotent via a store marker. Non-syncId ids are dropped so create() assigns syncIds.
 */
export async function migrateStoreArrayToRecords<T extends Record<string, unknown>>(
	app: PluginAppApi,
	store: PluginStore,
	options: {
		collection: string;
		storeKey: string;
		markerKey?: string;
		mapItem?: (item: T) => Record<string, unknown>;
	}
): Promise<void> {
	const markerKey = options.markerKey ?? `__records_migrated_${options.collection}_v1`;
	if (await store.get<boolean>(markerKey)) {
		return;
	}

	const records = app.records.open(options.collection);
	const existing = await records.list();
	if (existing.length > 0) {
		await store.set(markerKey, true);
		await store.delete(options.storeKey);
		return;
	}

	const legacy = await store.get<T[]>(options.storeKey);
	if (Array.isArray(legacy) && legacy.length > 0) {
		for (const item of legacy) {
			const mapped = options.mapItem ? options.mapItem(item) : { ...item };
			const { id, ...rest } = mapped as T & { id?: string };
			const data =
				id && isRecordsSyncId(id)
					? ({ ...rest, id } as T & { id: string })
					: (rest as T);
			await records.create(data);
		}
	}

	await store.set(markerKey, true);
	await store.delete(options.storeKey);
}

/**
 * Migrate a singleton PluginStore object into one record with a fixed 15-char syncId.
 */
export async function migrateStoreSingletonToRecord(
	app: PluginAppApi,
	store: PluginStore,
	options: {
		collection: string;
		storeKey: string;
		syncId: string;
		markerKey?: string;
		mapItem?: (item: Record<string, unknown>) => Record<string, unknown>;
	}
): Promise<void> {
	if (!isRecordsSyncId(options.syncId)) {
		throw new Error(`syncId must be a 15-char [a-z0-9] id, got "${options.syncId}"`);
	}

	const markerKey = options.markerKey ?? `__records_migrated_${options.collection}_v1`;
	if (await store.get<boolean>(markerKey)) {
		return;
	}

	const records = app.records.open(options.collection);
	const existing = await records.get(options.syncId);
	if (existing) {
		await store.set(markerKey, true);
		await store.delete(options.storeKey);
		return;
	}

	const legacy = await store.get<Record<string, unknown>>(options.storeKey);
	if (legacy && typeof legacy === 'object') {
		const mapped = options.mapItem ? options.mapItem(legacy) : { ...legacy };
		const { id: _id, ...rest } = mapped;
		await records.create({ ...rest, id: options.syncId });
	}

	await store.set(markerKey, true);
	await store.delete(options.storeKey);
}
