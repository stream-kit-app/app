import type { PluginStore } from '@stream-kit/plugin';

import {
	DEFAULT_RANKINGS_SETTINGS,
	DEFAULT_RANKS,
	DEFAULT_TIERS,
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
const SETTINGS_KEY = 'settings';
const SEED_VERSION_KEY = 'seedVersion';
const POINT_HISTORY_KEY = 'pointHistory';

export const CURRENT_SEED_VERSION = 1;

export async function loadTiers(store: PluginStore): Promise<TierRecord[]> {
	const tiers = await store.get<TierRecord[]>(TIERS_KEY);

	return tiers ?? [];
}

export async function saveTiers(store: PluginStore, tiers: TierRecord[]): Promise<void> {
	await store.set(TIERS_KEY, tiers);
}

export async function loadRanks(store: PluginStore): Promise<RankRecord[]> {
	const ranks = await store.get<RankRecord[]>(RANKS_KEY);

	return ranks ?? [];
}

export async function saveRanks(store: PluginStore, ranks: RankRecord[]): Promise<void> {
	await store.set(RANKS_KEY, ranks);
}

export async function loadUsers(store: PluginStore): Promise<UserRankingRecord[]> {
	const users = await store.get<UserRankingRecord[]>(USERS_KEY);

	return users ?? [];
}

export async function saveUsers(store: PluginStore, users: UserRankingRecord[]): Promise<void> {
	await store.set(USERS_KEY, users);
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

export async function loadSettings(store: PluginStore): Promise<RankingsSettings> {
	const settings = await store.get<RankingsSettings>(SETTINGS_KEY);

	return {
		...DEFAULT_RANKINGS_SETTINGS,
		...settings
	};
}

export async function saveSettings(
	store: PluginStore,
	settings: RankingsSettings
): Promise<void> {
	await store.set(SETTINGS_KEY, settings);
}

export async function loadSeedVersion(store: PluginStore): Promise<number> {
	return (await store.get<number>(SEED_VERSION_KEY)) ?? 0;
}

export async function saveSeedVersion(store: PluginStore, version: number): Promise<void> {
	await store.set(SEED_VERSION_KEY, version);
}

export async function ensureDefaultConfig(store: PluginStore): Promise<void> {
	const [tiers, ranks] = await Promise.all([loadTiers(store), loadRanks(store)]);

	if (tiers.length === 0 && ranks.length === 0) {
		await saveTiers(store, DEFAULT_TIERS);
		await saveRanks(store, DEFAULT_RANKS);
	}

	const settings = await loadSettings(store);
	await saveSettings(store, settings);
}
