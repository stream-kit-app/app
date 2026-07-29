import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import { migrateStoreArrayToRecords } from '@stream-kit/plugin';
import type { TimerRecord } from '../timers/app/lib/stored-timer';

export const TIMERS_STORE_KEY = 'timers';
export const TIMERS_COLLECTION = 'timers';

type StoredTimerRecord = Omit<TimerRecord, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

function serialize(record: TimerRecord): StoredTimerRecord {
	return {
		...record,
		createdAt: record.createdAt.toISOString(),
		updatedAt: record.updatedAt.toISOString()
	};
}

function deserialize(raw: StoredTimerRecord): TimerRecord {
	return {
		...raw,
		createdAt: new Date(raw.createdAt),
		updatedAt: new Date(raw.updatedAt)
	};
}

export async function migrateTimersToRecords(app: PluginAppApi, store: PluginStore): Promise<void> {
	await migrateStoreArrayToRecords(app, store, {
		collection: TIMERS_COLLECTION,
		storeKey: TIMERS_STORE_KEY,
		mapItem: (item) => serialize(deserialize(item as StoredTimerRecord)) as Record<string, unknown>
	});
}

export async function loadTimers(app: PluginAppApi): Promise<TimerRecord[]> {
	const rows = await app.records.open(TIMERS_COLLECTION).list();

	return rows.map((row) => deserialize(row as StoredTimerRecord));
}

export async function saveTimers(app: PluginAppApi, timers: TimerRecord[]): Promise<void> {
	const records = app.records.open(TIMERS_COLLECTION);
	const existing = await records.list();

	for (const timer of timers) {
		const { id, ...data } = serialize(timer);
		if (await records.get(id)) {
			await records.update(id, data);
		} else {
			const created = await records.create({ ...data, id });
			timer.id = created.id;
		}
	}

	const currentIds = new Set(timers.map((timer) => timer.id));
	await Promise.all(
		existing.filter((record) => !currentIds.has(record.id)).map((record) => records.delete(record.id))
	);
}
