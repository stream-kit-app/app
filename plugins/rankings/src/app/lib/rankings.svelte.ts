import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import type { RankingsEventContext, RankingsEventMap, RankingsStats } from '../../lib/contexts';
import {
	clampPoints,
	didRankChange,
	didTierAdvance,
	orderRanks,
	resolveProgress,
	sortUsersByPoints
} from '../../lib/ranking-engine';
import {
	findUserByIdentity,
	parsePlatformFromUserId,
	shouldRebindUserId
} from '../../lib/extract-user';
import {
	ensureDefaultConfig,
	loadIgnoredUsers,
	loadPointHistory,
	loadRanks,
	loadSettings,
	loadTiers,
	loadUsers,
	saveIgnoredUsers,
	savePointHistory,
	saveRanks,
	saveSettings,
	saveTiers,
	saveUsers
} from '../../lib/rankings-store';
import { appendPointHistoryEntry, getUserPointHistory } from '../../lib/point-history';
import { resolveTwitchChatTarget } from '../../lib/twitch-chat-target';
import type {
	IgnoredUserRecord,
	PointHistoryEntry,
	PointHistoryKind,
	PointsMutationResult,
	RankProgress,
	RankRecord,
	RankingsPlatform,
	RankingsSettings,
	TierRecord,
	UserRankingRecord
} from '../../lib/types';

export class RankingsService {
	tiers: TierRecord[] = $state([]);
	ranks: RankRecord[] = $state([]);
	users: UserRankingRecord[] = $state([]);
	ignoredUsers: IgnoredUserRecord[] = $state([]);
	pointHistory: PointHistoryEntry[] = $state([]);
	settings: RankingsSettings = $state({
		watchTimeEnabled: true,
		pointsPerMinute: 1,
		awardIntervalSeconds: 60,
		leaderboardSize: 10
	});

	private store?: PluginStore;
	private app?: PluginAppApi;
	private listeners = new Map<keyof RankingsEventMap, Set<(context: RankingsEventContext) => void>>();

	bind(store: PluginStore, app: PluginAppApi): void {
		this.store = store;
		this.app = app;
	}

	requireApp(): PluginAppApi {
		return this.requireContext().app;
	}

	get isReady(): boolean {
		return this.store != null && this.app != null;
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('Rankings service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	subscribe<K extends keyof RankingsEventMap>(
		event: K,
		handler: (context: RankingsEventMap[K]) => void
	): () => void {
		let handlers = this.listeners.get(event);

		if (!handlers) {
			handlers = new Set();
			this.listeners.set(event, handlers);
		}

		handlers.add(handler as (context: RankingsEventContext) => void);

		return () => {
			handlers?.delete(handler as (context: RankingsEventContext) => void);
		};
	}

	private emit(event: keyof RankingsEventMap, context: RankingsEventContext): void {
		const handlers = this.listeners.get(event);

		if (!handlers) {
			return;
		}

		for (const handler of handlers) {
			handler(context);
		}
	}

	private getOrderedRanks() {
		return orderRanks(this.tiers, this.ranks);
	}

	async load(): Promise<void> {
		const { store } = this.requireContext();
		await ensureDefaultConfig(store);

		const [tiers, ranks, users, ignoredUsers, settings, pointHistory] = await Promise.all([
			loadTiers(store),
			loadRanks(store),
			loadUsers(store),
			loadIgnoredUsers(store),
			loadSettings(store),
			loadPointHistory(store)
		]);

		this.tiers = tiers;
		this.ranks = ranks;
		this.users = users;
		this.ignoredUsers = ignoredUsers;
		this.settings = settings;
		this.pointHistory = pointHistory;
	}

	async persistPointHistory(): Promise<void> {
		const { store } = this.requireContext();
		await savePointHistory(store, this.pointHistory);
	}

	async persistUsers(): Promise<void> {
		const { store } = this.requireContext();
		await saveUsers(store, this.users);
	}

	async persistIgnoredUsers(): Promise<void> {
		const { store } = this.requireContext();
		await saveIgnoredUsers(store, this.ignoredUsers);
	}

	async persistTiersAndRanks(): Promise<void> {
		const { store } = this.requireContext();
		await Promise.all([saveTiers(store, this.tiers), saveRanks(store, this.ranks)]);
	}

	async persistSettings(): Promise<void> {
		const { store } = this.requireContext();
		await saveSettings(store, this.settings);
	}

	getProgressForPoints(totalPoints: number): RankProgress {
		return resolveProgress(totalPoints, this.getOrderedRanks());
	}

	getUser(userId: string): UserRankingRecord | undefined {
		return this.users.find((user) => user.userId === userId);
	}

	resolveUser(input: {
		userId: string;
		username?: string;
		platform?: RankingsPlatform;
	}): UserRankingRecord | undefined {
		return findUserByIdentity(this.users, input);
	}

	isIgnored(input: {
		userId: string;
		username?: string;
		platform?: RankingsPlatform;
	}): boolean {
		return findUserByIdentity(this.ignoredUsers, input) != null;
	}

	async ignoreUser(userId: string): Promise<void> {
		const existing = this.getUser(userId);

		if (!existing) {
			throw new Error(`User "${userId}" not found`);
		}

		const ignoredAt = new Date().toISOString();
		const record: IgnoredUserRecord = {
			userId: existing.userId,
			username: existing.username,
			platform: existing.platform,
			ignoredAt
		};
		const match = findUserByIdentity(this.ignoredUsers, {
			userId: existing.userId,
			username: existing.username,
			platform: existing.platform
		});

		if (match) {
			this.ignoredUsers = this.ignoredUsers.map((entry) =>
				entry.userId === match.userId
					? {
							...record,
							ignoredAt: match.ignoredAt
						}
					: entry
			);
		} else {
			this.ignoredUsers = [...this.ignoredUsers, record];
		}

		await this.persistIgnoredUsers();
		await this.deleteUser(existing.userId);
	}

	async unignoreUser(userId: string): Promise<void> {
		const existing = findUserByIdentity(this.ignoredUsers, { userId });

		if (!existing) {
			throw new Error(`Ignored user "${userId}" not found`);
		}

		this.ignoredUsers = this.ignoredUsers.filter((entry) => entry.userId !== existing.userId);
		await this.persistIgnoredUsers();
	}

	async canonicalizeUserIdentity(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
	}): Promise<void> {
		const match = this.resolveUser(input);

		if (!match || !shouldRebindUserId(match, input)) {
			return;
		}

		this.rebindUserId(match.userId, input);
		await Promise.all([this.persistUsers(), this.persistPointHistory()]);
	}

	private rebindUserId(
		previousId: string,
		input: { userId: string; username: string; platform: RankingsPlatform }
	): UserRankingRecord {
		const existing = this.getUser(previousId);

		if (!existing) {
			throw new Error(`User "${previousId}" not found`);
		}

		if (previousId === input.userId) {
			return existing;
		}

		const conflict = this.getUser(input.userId);
		const now = new Date().toISOString();

		if (conflict) {
			const merged: UserRankingRecord = {
				...conflict,
				username: input.username,
				platform: input.platform === 'unknown' ? conflict.platform : input.platform,
				totalPoints: conflict.totalPoints + existing.totalPoints,
				watchTimeSeconds: conflict.watchTimeSeconds + existing.watchTimeSeconds,
				updatedAt: now
			};

			this.users = this.users
				.filter((user) => user.userId !== previousId)
				.map((user) => (user.userId === input.userId ? merged : user));
			this.pointHistory = this.pointHistory.map((entry) =>
				entry.userId === previousId ? { ...entry, userId: input.userId } : entry
			);

			return merged;
		}

		const updated: UserRankingRecord = {
			...existing,
			userId: input.userId,
			username: input.username,
			platform: input.platform,
			updatedAt: now
		};

		this.users = this.users.map((user) => (user.userId === previousId ? updated : user));
		this.pointHistory = this.pointHistory.map((entry) =>
			entry.userId === previousId ? { ...entry, userId: input.userId } : entry
		);

		return updated;
	}

	getLeaderboard(limit = this.settings.leaderboardSize): UserRankingRecord[] {
		return sortUsersByPoints(this.users).slice(0, limit);
	}

	getUserLeaderboardPosition(userId: string): number | null {
		const sorted = sortUsersByPoints(this.users);
		const index = sorted.findIndex((user) => user.userId === userId);

		return index === -1 ? null : index + 1;
	}

	getUserHistory(userId: string): PointHistoryEntry[] {
		return getUserPointHistory(this.pointHistory, userId);
	}

	private resolveHistoryKind(source: string, amount: number, explicitKind?: PointHistoryKind): PointHistoryKind {
		if (explicitKind) {
			return explicitKind;
		}

		if (source === 'watch-time') {
			return 'watch-time';
		}

		if (amount < 0) {
			return 'remove';
		}

		return 'add';
	}

	private appendHistoryEntry(input: {
		userId: string;
		amount: number;
		balanceAfter: number;
		source: string;
		kind?: PointHistoryKind;
	}): void {
		if (input.amount === 0) {
			return;
		}

		this.pointHistory = appendPointHistoryEntry(this.pointHistory, {
			userId: input.userId,
			amount: input.amount,
			balanceAfter: input.balanceAfter,
			source: input.source,
			kind: this.resolveHistoryKind(input.source, input.amount, input.kind)
		});
	}

	getStats(): RankingsStats {
		const ordered = this.getOrderedRanks();
		const topUsers = this.getLeaderboard(5);
		const tierDistribution = this.tiers.map((tier) => ({
			tier,
			count: this.users.filter((user) => {
				const progress = resolveProgress(user.totalPoints, ordered);

				return progress.tier?.id === tier.id;
			}).length
		}));

		return {
			totalUsers: this.users.length,
			totalPointsAwarded: this.users.reduce((sum, user) => sum + user.totalPoints, 0),
			totalWatchTimeSeconds: this.users.reduce((sum, user) => sum + user.watchTimeSeconds, 0),
			topUsers,
			tierDistribution
		};
	}

	formatRankMessage(
		userId: string,
		template: string,
		fallback?: { username: string }
	): string {
		const user = this.resolveUser({
			userId,
			username: fallback?.username,
			platform: parsePlatformFromUserId(userId)
		});
		const progress = this.getProgressForPoints(user?.totalPoints ?? 0);
		const username = user?.username ?? fallback?.username ?? 'Unknown';

		return template
			.replaceAll('{username}', username)
			.replaceAll('{points}', String(user?.totalPoints ?? 0))
			.replaceAll('{rank}', progress.rank?.name ?? 'None')
			.replaceAll('{tier}', progress.tier?.name ?? 'None')
			.replaceAll('{watchTime}', String(Math.floor((user?.watchTimeSeconds ?? 0) / 60)));
	}

	formatLeaderboardMessage(limit = this.settings.leaderboardSize): string {
		const leaderboard = this.getLeaderboard(limit);
		const ordered = this.getOrderedRanks();

		if (leaderboard.length === 0) {
			return 'No rankings yet.';
		}

		return leaderboard
			.map((user, index) => {
				const progress = resolveProgress(user.totalPoints, ordered);
				const rankName = progress.rank?.name ?? 'Unranked';

				return `${index + 1}. ${user.username} — ${user.totalPoints} pts (${rankName})`;
			})
			.join(' | ');
	}

	private findExistingUser(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
	}): UserRankingRecord | undefined {
		const direct = this.getUser(input.userId);

		if (direct) {
			return direct;
		}

		const match = this.resolveUser(input);

		if (!match) {
			return undefined;
		}

		if (shouldRebindUserId(match, input)) {
			return this.rebindUserId(match.userId, input);
		}

		return match;
	}

	private upsertUser(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
	}): UserRankingRecord {
		const now = new Date().toISOString();
		const existing = this.findExistingUser(input);

		if (existing) {
			const updated: UserRankingRecord = {
				...existing,
				userId: existing.userId,
				username: input.username.trim() || existing.username,
				platform: input.platform === 'unknown' ? existing.platform : input.platform,
				updatedAt: now
			};
			this.users = this.users.map((user) =>
				user.userId === existing.userId ? updated : user
			);

			return updated;
		}

		const created: UserRankingRecord = {
			userId: input.userId,
			username: input.username,
			platform: input.platform,
			totalPoints: 0,
			watchTimeSeconds: 0,
			updatedAt: now
		};
		this.users = [...this.users, created];

		return created;
	}

	private resolveTwitchChatFields(): { channel?: string; broadcasterId?: string } {
		if (!this.app) {
			return {};
		}

		return resolveTwitchChatTarget(this.app);
	}

	private buildEventContext(
		user: UserRankingRecord,
		amount: number,
		source: string,
		previousProgress: RankProgress,
		currentProgress: RankProgress
	): RankingsEventContext {
		const { channel, broadcasterId } = this.resolveTwitchChatFields();

		return {
			userId: user.userId,
			username: user.username,
			platform: user.platform,
			totalPoints: user.totalPoints,
			points: user.totalPoints,
			watchTimeSeconds: user.watchTimeSeconds,
			source,
			amount,
			rank: currentProgress.rank?.name ?? 'None',
			tier: currentProgress.tier?.name ?? 'None',
			previousRank: previousProgress.rank?.name ?? 'None',
			currentRank: currentProgress.rank?.name ?? 'None',
			previousTier: previousProgress.tier?.name ?? 'None',
			currentTier: currentProgress.tier?.name ?? 'None',
			channel,
			broadcasterId
		};
	}

	private applyPointsMutation(
		user: UserRankingRecord,
		nextPoints: number,
		amount: number,
		source: string,
		historyKind?: PointHistoryKind
	): PointsMutationResult {
		const ordered = this.getOrderedRanks();
		const previousPoints = user.totalPoints;
		const previousProgress = resolveProgress(previousPoints, ordered);
		const totalPoints = clampPoints(nextPoints);
		const updated: UserRankingRecord = {
			...user,
			totalPoints,
			updatedAt: new Date().toISOString()
		};

		this.users = this.users.map((entry) => (entry.userId === user.userId ? updated : entry));

		const kind = historyKind ?? this.resolveHistoryKind(source, amount);
		this.appendHistoryEntry({
			userId: updated.userId,
			amount,
			balanceAfter: totalPoints,
			source,
			kind
		});

		const currentProgress = resolveProgress(totalPoints, ordered);
		const rankChanged = didRankChange(previousProgress, currentProgress);
		const tierAdvanced = didTierAdvance(previousProgress, currentProgress, ordered);
		const context = this.buildEventContext(
			updated,
			amount,
			source,
			previousProgress,
			currentProgress
		);

		if (amount > 0) {
			this.emit('points-earned', context);
		}

		if (rankChanged) {
			this.emit('rank-changed', context);
		}

		if (tierAdvanced) {
			this.emit('tier-advanced', context);
		}

		return {
			user: updated,
			amount,
			previousPoints,
			previousProgress,
			currentProgress,
			rankChanged,
			tierAdvanced
		};
	}

	async addPoints(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
		amount: number;
		source: string;
	}): Promise<PointsMutationResult | null> {
		if (this.isIgnored(input)) {
			return null;
		}

		const user = this.upsertUser(input);
		const result = this.applyPointsMutation(
			user,
			user.totalPoints + clampPoints(input.amount),
			clampPoints(input.amount),
			input.source,
			input.source === 'watch-time' ? 'watch-time' : 'add'
		);
		await Promise.all([this.persistUsers(), this.persistPointHistory()]);

		return result;
	}

	async setPoints(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
		amount: number;
		source: string;
	}): Promise<PointsMutationResult | null> {
		if (this.isIgnored(input)) {
			return null;
		}

		const user = this.upsertUser(input);
		const amount = clampPoints(input.amount) - user.totalPoints;
		const result = this.applyPointsMutation(
			user,
			clampPoints(input.amount),
			amount,
			input.source,
			'set'
		);
		await Promise.all([this.persistUsers(), this.persistPointHistory()]);

		return result;
	}

	async removePoints(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
		amount: number;
		source: string;
	}): Promise<PointsMutationResult> {
		const user = this.findExistingUser(input);

		if (!user) {
			throw new Error(`User "${input.username || input.userId}" not found in rankings`);
		}

		const requested = clampPoints(input.amount);
		const removed = Math.min(requested, user.totalPoints);
		const result = this.applyPointsMutation(
			user,
			user.totalPoints - removed,
			-removed,
			input.source,
			'remove'
		);
		await Promise.all([this.persistUsers(), this.persistPointHistory()]);

		return result;
	}

	async addWatchTime(input: {
		userId: string;
		username: string;
		platform: RankingsPlatform;
		seconds: number;
	}): Promise<void> {
		if (this.isIgnored(input)) {
			return;
		}

		const user = this.upsertUser(input);
		const watchTimeSeconds = user.watchTimeSeconds + Math.max(0, Math.floor(input.seconds));
		const updated: UserRankingRecord = {
			...user,
			watchTimeSeconds,
			updatedAt: new Date().toISOString()
		};

		this.users = this.users.map((entry) => (entry.userId === user.userId ? updated : entry));
		await this.persistUsers();
	}

	async createTier(input: Omit<TierRecord, 'id' | 'sortOrder'> & { sortOrder?: number }): Promise<TierRecord> {
		const tier: TierRecord = {
			id: crypto.randomUUID(),
			name: input.name.trim(),
			sortOrder: input.sortOrder ?? this.tiers.length,
			icon: input.icon
		};
		this.tiers = [...this.tiers, tier].sort((left, right) => left.sortOrder - right.sortOrder);
		await this.persistTiersAndRanks();

		return tier;
	}

	async updateTier(id: string, input: Partial<Omit<TierRecord, 'id'>>): Promise<TierRecord> {
		const existing = this.tiers.find((tier) => tier.id === id);

		if (!existing) {
			throw new Error(`Tier "${id}" not found`);
		}

		const updated: TierRecord = {
			...existing,
			...input,
			name: input.name?.trim() ?? existing.name
		};
		this.tiers = this.tiers
			.map((tier) => (tier.id === id ? updated : tier))
			.sort((left, right) => left.sortOrder - right.sortOrder);
		await this.persistTiersAndRanks();

		return updated;
	}

	async deleteTier(id: string): Promise<void> {
		if (this.ranks.some((rank) => rank.tierId === id)) {
			throw new Error('Remove ranks from this tier before deleting it.');
		}

		this.tiers = this.tiers.filter((tier) => tier.id !== id);
		await this.persistTiersAndRanks();
	}

	async createRank(
		input: Omit<RankRecord, 'id' | 'sortOrder'> & { sortOrder?: number }
	): Promise<RankRecord> {
		const rank: RankRecord = {
			id: crypto.randomUUID(),
			tierId: input.tierId,
			name: input.name.trim(),
			pointsRequired: clampPoints(input.pointsRequired),
			sortOrder: input.sortOrder ?? this.ranks.filter((entry) => entry.tierId === input.tierId).length,
			icon: input.icon,
			color: input.color
		};
		this.ranks = [...this.ranks, rank];
		await this.persistTiersAndRanks();

		return rank;
	}

	async updateRank(id: string, input: Partial<Omit<RankRecord, 'id'>>): Promise<RankRecord> {
		const existing = this.ranks.find((rank) => rank.id === id);

		if (!existing) {
			throw new Error(`Rank "${id}" not found`);
		}

		const updated: RankRecord = {
			...existing,
			...input,
			name: input.name?.trim() ?? existing.name,
			pointsRequired:
				input.pointsRequired != null ? clampPoints(input.pointsRequired) : existing.pointsRequired
		};
		this.ranks = this.ranks.map((rank) => (rank.id === id ? updated : rank));
		await this.persistTiersAndRanks();

		return updated;
	}

	async deleteRank(id: string): Promise<void> {
		this.ranks = this.ranks.filter((rank) => rank.id !== id);
		await this.persistTiersAndRanks();
	}

	async deleteRankBulk(ids: string[]): Promise<void> {
		if (ids.length === 0) {
			return;
		}

		const idSet = new Set(ids);
		this.ranks = this.ranks.filter((rank) => !idSet.has(rank.id));
		await this.persistTiersAndRanks();
	}

	async applyTierOrder(orderedIds: string[]): Promise<void> {
		if (orderedIds.length === 0) {
			return;
		}

		const tierById = new Map(this.tiers.map((tier) => [tier.id, tier]));

		for (const id of orderedIds) {
			if (!tierById.has(id)) {
				throw new Error(`Tier "${id}" not found`);
			}
		}

		this.tiers = orderedIds.map((id, sortOrder) => ({
			...tierById.get(id)!,
			sortOrder
		}));
		await this.persistTiersAndRanks();
	}

	async deleteUser(userId: string): Promise<void> {
		const existing = this.getUser(userId);

		if (!existing) {
			throw new Error(`User "${userId}" not found`);
		}

		this.users = this.users.filter((user) => user.userId !== userId);
		this.pointHistory = this.pointHistory.filter((entry) => entry.userId !== userId);
		await Promise.all([this.persistUsers(), this.persistPointHistory()]);
	}
}
