import type { PluginStore } from '@stream-kit/plugin';
import type { TimerRecord } from '../timers/app/lib/stored-timer';

export const TIMERS_STORE_KEY = 'timers';

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

export async function loadTimers(store: PluginStore): Promise<TimerRecord[]> {
	const stored = await store.get<StoredTimerRecord[]>(TIMERS_STORE_KEY);

	if (!Array.isArray(stored)) {
		return [];
	}

	return stored.map(deserialize);
}

export async function saveTimers(store: PluginStore, timers: TimerRecord[]): Promise<void> {
	await store.set(TIMERS_STORE_KEY, timers.map(serialize));
}
