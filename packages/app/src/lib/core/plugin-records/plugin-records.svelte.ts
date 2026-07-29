import {
	createPluginRecord,
	deletePluginRecord,
	getPluginRecord,
	listPluginRecords,
	updatePluginRecord,
	type PluginRecordRow
} from '$db/repositories/plugin-records';
import { isSyncId } from '$db/sync-id';

export type PluginRecordChange =
	| { type: 'create' | 'update'; collection: string; id: string; data: Record<string, unknown> }
	| { type: 'delete'; collection: string; id: string };

type ChangeListener = (change: PluginRecordChange) => void;

function parsePayload(row: PluginRecordRow): Record<string, unknown> {
	if (typeof row.payload === 'string') {
		try {
			return JSON.parse(row.payload) as Record<string, unknown>;
		} catch {
			return {};
		}
	}
	return row.payload ?? {};
}

function rowToData(row: PluginRecordRow): Record<string, unknown> {
	return { ...parsePayload(row), id: row.syncId };
}

export type PluginRecordCollectionApi = {
	list<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<
		Array<T & { id: string }>
	>;
	get<T extends Record<string, unknown> = Record<string, unknown>>(
		id: string
	): Promise<(T & { id: string }) | undefined>;
	create<T extends Record<string, unknown> = Record<string, unknown>>(
		data: T & { id?: string }
	): Promise<T & { id: string }>;
	update<T extends Record<string, unknown> = Record<string, unknown>>(
		id: string,
		data: Partial<T>
	): Promise<T & { id: string }>;
	delete(id: string): Promise<void>;
	onChange(listener: (change: PluginRecordChange) => void): () => void;
};

/**
 * App-level facade over SQLite `plugin_records` with change notifications.
 * Plugins access this via `app.records.open(collection)`.
 */
export class PluginRecordsService {
	#listeners = new Set<ChangeListener>();

	onChange(listener: ChangeListener): () => void {
		this.#listeners.add(listener);
		return () => {
			this.#listeners.delete(listener);
		};
	}

	#emit(change: PluginRecordChange): void {
		for (const listener of this.#listeners) {
			try {
				listener(change);
			} catch (error) {
				console.warn('PluginRecords onChange listener failed', error);
			}
		}
	}

	/** Notify listeners after ConfigSync reloads (full refresh signal). */
	notifyReload(): void {
		this.#emit({ type: 'update', collection: '*', id: '*', data: {} });
	}

	open(pluginKey: string, collection: string): PluginRecordCollectionApi {
		const key = pluginKey;
		const col = collection;

		return {
			list: async <T extends Record<string, unknown> = Record<string, unknown>>() => {
				const rows = await listPluginRecords(key, col);
				return rows.map((row) => rowToData(row) as T & { id: string });
			},
			get: async <T extends Record<string, unknown> = Record<string, unknown>>(
				id: string
			) => {
				const row = await getPluginRecord(key, col, id);
				return row ? (rowToData(row) as T & { id: string }) : undefined;
			},
			create: async <T extends Record<string, unknown> = Record<string, unknown>>(
				data: T & { id?: string }
			) => {
				const { id: maybeId, ...rest } = data as T & { id?: string };
				const preferredId = maybeId && isSyncId(maybeId) ? maybeId : undefined;
				const sortOrder =
					typeof (rest as { sortOrder?: unknown }).sortOrder === 'number'
						? (rest as unknown as { sortOrder: number }).sortOrder
						: undefined;
				const row = await createPluginRecord({
					pluginKey: key,
					collection: col,
					syncId: preferredId,
					payload: rest as Record<string, unknown>,
					sortOrder
				});
				const dataOut = rowToData(row);
				this.#emit({ type: 'create', collection: col, id: row.syncId, data: dataOut });
				return dataOut as T & { id: string };
			},
			update: async <T extends Record<string, unknown> = Record<string, unknown>>(
				id: string,
				data: Partial<T>
			) => {
				const existing = await getPluginRecord(key, col, id);
				if (!existing) {
					throw new Error(`Record "${id}" not found in ${key}/${col}`);
				}
				const next = { ...parsePayload(existing), ...data, id };
				const sortOrder =
					typeof next.sortOrder === 'number' ? next.sortOrder : undefined;
				const row = await updatePluginRecord(key, col, id, {
					payload: next,
					sortOrder
				});
				const dataOut = rowToData(row);
				this.#emit({ type: 'update', collection: col, id, data: dataOut });
				return dataOut as T & { id: string };
			},
			delete: async (id: string) => {
				await deletePluginRecord(key, col, id);
				this.#emit({ type: 'delete', collection: col, id });
			},
			onChange: (listener: (change: PluginRecordChange) => void) => {
				return this.onChange((change) => {
					if (change.collection !== col && change.collection !== '*') {
						return;
					}
					listener(change);
				});
			}
		};
	}
}
