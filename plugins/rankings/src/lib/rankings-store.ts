import type { PluginAppApi, PluginAppRecordCollectionApi, PluginStore } from '@stream-kit/plugin';

import {
	DEFAULT_RANKINGS_SETTINGS,
	DEFAULT_RANKS,
	DEFAULT_TIERS,
	type IgnoredUserRecord,
	type PointHistoryEntry,
	type RankRecord,
	type RankingsSettings,
	type TierRecord,
	type UserRankingRecord
} from './types';
import { trimPointHistory } from './point-history';

const TIERS_KEY = 'tiers';
const RANKS_KEY = 'ranks';
const USERS_KEY = 'users';
const IGNORED_USERS_KEY = 'ignoredUsers';
const SETTINGS_KEY = 'settings';
const SEED_VERSION_KEY = 'seedVersion';
const POINT_HISTORY_KEY = 'pointHistory';
/** Must be a valid sync id: exactly 15 chars of [a-z0-9]. */
const SETTINGS_RECORD_ID = 'ranksettings001';
const SEED_META_COLLECTION = 'seedMeta';
/** Must be a valid sync id: exactly 15 chars of [a-z0-9]. */
const SEED_VERSION_RECORD_ID = 'rnkseedversion1';

export const RANKINGS_RECORD_COLLECTIONS = {
	tiers: TIERS_KEY,
	ranks: RANKS_KEY,
	users: USERS_KEY,
	ignoredUsers: IGNORED_USERS_KEY,
	settings: SETTINGS_KEY
} as const;

/** v2: valid seedMeta sync id + dedupe default actions created before actions.load(). */
export const CURRENT_SEED_VERSION = 2;

type RecordWithId = Record<string, unknown> & { id: string };

function hasRecordId(value: unknown): value is string {
	return typeof value === 'string' && /^[a-z0-9]{15}$/.test(value);
}

function collection(
	app: PluginAppApi,
	name: (typeof RANKINGS_RECORD_COLLECTIONS)[keyof typeof RANKINGS_RECORD_COLLECTIONS]
): PluginAppRecordCollectionApi {
	return app.records.open(name);
}

function withoutId<T extends Record<string, unknown>>(record: T): Omit<T, 'id'> {
	const { id: _id, ...data } = record;

	return data;
}

async function saveIdRecords<T extends RecordWithId>(
	records: PluginAppRecordCollectionApi,
	items: T[]
): Promise<T[]> {
	const existing = await records.list<T>();
	const existingIds = new Set(existing.map((item) => item.id));
	const saved = await Promise.all(
		items.map(async (item) => {
			if (existingIds.has(item.id)) {
				return records.update<T>(item.id, withoutId(item) as Partial<T>);
			}

			return records.create<T>(
				{ ...withoutId(item), ...(hasRecordId(item.id) ? { id: item.id } : {}) } as T & {
					id?: string;
				}
			);
		})
	);
	const savedIds = new Set(saved.map((item) => item.id));
	await Promise.all(existing.filter((item) => !savedIds.has(item.id)).map((item) => records.delete(item.id)));

	return saved;
}

async function saveUserRecords<T extends Record<string, unknown> & { userId: string }>(
	records: PluginAppRecordCollectionApi,
	items: T[]
): Promise<void> {
	const existing = await records.list<T>();
	const usedRecordIds = new Set<string>();

	await Promise.all(
		items.map(async (item) => {
			const match = existing.find(
				(record) => record.userId === item.userId && !usedRecordIds.has(record.id)
			);

			if (match) {
				usedRecordIds.add(match.id);
				await records.update<T>(match.id, item);
				return;
			}

			const created = await records.create<T>(item);
			usedRecordIds.add(created.id);
		})
	);
	await Promise.all(existing.filter((item) => !usedRecordIds.has(item.id)).map((item) => records.delete(item.id)));
}

export async function loadTiers(app: PluginAppApi): Promise<TierRecord[]> {
	return collection(app, RANKINGS_RECORD_COLLECTIONS.tiers).list<TierRecord>();
}

export async function saveTiers(app: PluginAppApi, tiers: TierRecord[]): Promise<TierRecord[]> {
	return saveIdRecords(collection(app, RANKINGS_RECORD_COLLECTIONS.tiers), tiers);
}

export async function loadRanks(app: PluginAppApi): Promise<RankRecord[]> {
	return collection(app, RANKINGS_RECORD_COLLECTIONS.ranks).list<RankRecord>();
}

export async function saveRanks(app: PluginAppApi, ranks: RankRecord[]): Promise<RankRecord[]> {
	return saveIdRecords(collection(app, RANKINGS_RECORD_COLLECTIONS.ranks), ranks);
}

export async function loadUsers(app: PluginAppApi): Promise<UserRankingRecord[]> {
	return collection(app, RANKINGS_RECORD_COLLECTIONS.users).list<UserRankingRecord>();
}

export async function saveUsers(app: PluginAppApi, users: UserRankingRecord[]): Promise<void> {
	await saveUserRecords(collection(app, RANKINGS_RECORD_COLLECTIONS.users), users);
}

export async function loadIgnoredUsers(app: PluginAppApi): Promise<IgnoredUserRecord[]> {
	return collection(app, RANKINGS_RECORD_COLLECTIONS.ignoredUsers).list<IgnoredUserRecord>();
}

export async function saveIgnoredUsers(
	app: PluginAppApi,
	ignoredUsers: IgnoredUserRecord[]
): Promise<void> {
	await saveUserRecords(collection(app, RANKINGS_RECORD_COLLECTIONS.ignoredUsers), ignoredUsers);
}

export async function loadPointHistory(store: PluginStore): Promise<PointHistoryEntry[]> {
	const history = await store.get<PointHistoryEntry[]>(POINT_HISTORY_KEY);

	return history ?? [];
}

export async function savePointHistory(
	store: PluginStore,
	history: PointHistoryEntry[]
): Promise<void> {
	await store.set(POINT_HISTORY_KEY, trimPointHistory(history));
}

async function adoptCanonicalRecord<T extends Record<string, unknown>>(
	records: PluginAppRecordCollectionApi,
	canonicalId: string
): Promise<(T & { id: string }) | undefined> {
	const existing = await records.get<T>(canonicalId);
	if (existing) {
		return existing;
	}

	const orphans = await records.list<T>();
	if (orphans.length === 0) {
		return undefined;
	}

	const source = orphans[0]!;
	const { id: _id, ...data } = source;
	const created = await records.create<T>({ id: canonicalId, ...(data as T) });
	await Promise.all(
		orphans
			.filter((row) => row.id !== created.id)
			.map((row) => records.delete(row.id))
	);

	return created;
}

export async function loadSettings(app: PluginAppApi): Promise<RankingsSettings> {
	const records = collection(app, RANKINGS_RECORD_COLLECTIONS.settings);
	const settings = await adoptCanonicalRecord<RankingsSettings>(records, SETTINGS_RECORD_ID);

	return {
		...DEFAULT_RANKINGS_SETTINGS,
		...settings
	};
}

export async function saveSettings(
	app: PluginAppApi,
	settings: RankingsSettings
): Promise<void> {
	const records = collection(app, RANKINGS_RECORD_COLLECTIONS.settings);
	await adoptCanonicalRecord<RankingsSettings>(records, SETTINGS_RECORD_ID);
	const existing = await records.get<RankingsSettings>(SETTINGS_RECORD_ID);

	if (existing) {
		await records.update<RankingsSettings>(SETTINGS_RECORD_ID, settings);
	} else {
		await records.create<RankingsSettings>({ id: SETTINGS_RECORD_ID, ...settings });
	}
}

export async function loadSeedVersion(app: PluginAppApi): Promise<number> {
	const records = app.records.open(SEED_META_COLLECTION);
	const record = await records.get<{ version: number }>(SEED_VERSION_RECORD_ID);
	if (typeof record?.version === 'number') {
		return record.version;
	}

	// Recover orphans created when SEED_VERSION_RECORD_ID was an invalid (16-char) sync id.
	const orphans = await records.list<{ version: number }>();
	const versions = orphans
		.map((row) => row.version)
		.filter((value): value is number => typeof value === 'number');

	return versions.length > 0 ? Math.max(...versions) : 0;
}

export async function saveSeedVersion(app: PluginAppApi, version: number): Promise<void> {
	const records = app.records.open(SEED_META_COLLECTION);
	if (await records.get(SEED_VERSION_RECORD_ID)) {
		await records.update(SEED_VERSION_RECORD_ID, { version });
	} else {
		await records.create({ id: SEED_VERSION_RECORD_ID, version });
	}

	const leftover = await records.list();
	await Promise.all(
		leftover
			.filter((row) => row.id !== SEED_VERSION_RECORD_ID)
			.map((row) => records.delete(row.id))
	);
}

function migrationKey(collection: string): string {
	return `__records_migrated_${collection}_v1`;
}

async function migrateArrayCollection<T extends Record<string, unknown>>(
	store: PluginStore,
	key: string,
	records: PluginAppRecordCollectionApi,
	transform: (item: T) => Record<string, unknown> = (item) => item
): Promise<void> {
	if (await store.get<boolean>(migrationKey(key))) {
		return;
	}

	const existing = await records.list();
	const legacy = await store.get<T[]>(key);

	if (existing.length === 0 && Array.isArray(legacy)) {
		await Promise.all(
			legacy
				.filter((item): item is T => item != null && typeof item === 'object' && !Array.isArray(item))
				.map((item) => {
					const { id, ...data } = transform(item);
					return records.create({ ...data, ...(hasRecordId(id) ? { id } : {}) });
				})
		);
	}

	await store.set(migrationKey(key), true);
	await store.delete(key);
}

export async function migrateRankingsRecords(store: PluginStore, app: PluginAppApi): Promise<void> {
	const tiers = collection(app, RANKINGS_RECORD_COLLECTIONS.tiers);
	const ranks = collection(app, RANKINGS_RECORD_COLLECTIONS.ranks);
	const legacyTiers = await store.get<TierRecord[]>(TIERS_KEY);
	const tierIdMap = new Map<string, string>();

	if (!(await store.get<boolean>(migrationKey(TIERS_KEY)))) {
		const existing = await tiers.list<TierRecord>();

		if (existing.length === 0 && Array.isArray(legacyTiers)) {
			for (const tier of legacyTiers) {
				if (!tier || typeof tier !== 'object') {
					continue;
				}
				const { id, ...data } = tier;
				const created = await tiers.create<TierRecord>(
					{ ...data, ...(hasRecordId(id) ? { id } : {}) } as TierRecord & { id?: string }
				);
				tierIdMap.set(id, created.id);
			}
		} else {
			for (const tier of legacyTiers ?? []) {
				const match = existing.find(
					(record) => record.id === tier.id || (record.name === tier.name && record.sortOrder === tier.sortOrder)
				);
				if (match) {
					tierIdMap.set(tier.id, match.id);
				}
			}
		}

		await store.set(migrationKey(TIERS_KEY), true);
		await store.delete(TIERS_KEY);
	}

	await migrateArrayCollection<RankRecord>(
		store,
		RANKS_KEY,
		ranks,
		(rank) => ({ ...rank, tierId: tierIdMap.get(rank.tierId) ?? rank.tierId })
	);
	await migrateArrayCollection<UserRankingRecord>(
		store,
		USERS_KEY,
		collection(app, RANKINGS_RECORD_COLLECTIONS.users)
	);
	await migrateArrayCollection<IgnoredUserRecord>(
		store,
		IGNORED_USERS_KEY,
		collection(app, RANKINGS_RECORD_COLLECTIONS.ignoredUsers)
	);

	if (!(await store.get<boolean>(migrationKey(SETTINGS_KEY)))) {
		const records = collection(app, RANKINGS_RECORD_COLLECTIONS.settings);
		const existing = await records.list<RankingsSettings>();
		const legacy = await store.get<RankingsSettings>(SETTINGS_KEY);

		if (existing.length === 0 && legacy && typeof legacy === 'object' && !Array.isArray(legacy)) {
			await records.create<RankingsSettings>({ id: SETTINGS_RECORD_ID, ...legacy });
		}

		await store.set(migrationKey(SETTINGS_KEY), true);
		await store.delete(SETTINGS_KEY);
	}
}

export async function ensureDefaultConfig(app: PluginAppApi): Promise<void> {
	const [tiers, ranks] = await Promise.all([loadTiers(app), loadRanks(app)]);

	if (tiers.length === 0 && ranks.length === 0) {
		const savedTiers = await saveTiers(app, DEFAULT_TIERS);
		const tierIds = new Map(DEFAULT_TIERS.map((tier, index) => [tier.id, savedTiers[index].id]));
		await saveRanks(
			app,
			DEFAULT_RANKS.map((rank) => ({ ...rank, tierId: tierIds.get(rank.tierId) ?? rank.tierId }))
		);
	}

	const settings = await loadSettings(app);
	await saveSettings(app, settings);
}
