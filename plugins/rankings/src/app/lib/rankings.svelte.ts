import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';

import type { RankingsEventContext, RankingsEventMap, RankingsStats } from '../../lib/contexts';
import { DEFAULT_RANK_ICON, resolveOverlayRankIcon } from '../../lib/rank-icon';
import {
	clampPoints,
	didRankChange,
	didTierAdvance,
	isLastRankInTier,
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
	migrateRankingsRecords,
	RANKINGS_RECORD_COLLECTIONS,
	saveIgnoredUsers,
	savePointHistory,
	saveRanks,
	saveSettings,
	saveTiers,
	saveUsers,
	upsertUsers
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

function createRecordId(): string {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const bytes = crypto.getRandomValues(new Uint8Array(15));

	return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
}

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
	private listeners = new SvelteMap<
		keyof RankingsEventMap,
		SvelteSet<(context: RankingsEventContext) => void>
	>();
	private recordUnsubscribers: Array<() => void> = [];
	private isPersistingRecords = false;
	private overlayIconCache = new Map<string, string>();

	bind(store: PluginStore, app: PluginAppApi): void {
		this.store = store;
		this.app = app;
		this.subscribeToRecordChanges();
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
			handlers = new SvelteSet();
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

	private subscribeToRecordChanges(): void {
		if (!this.app || this.recordUnsubscribers.length > 0) {
			return;
		}

		for (const name of Object.values(RANKINGS_RECORD_COLLECTIONS)) {
			const records = this.app.records.open(name);
			this.recordUnsubscribers.push(
				records.onChange(() => {
					if (!this.isPersistingRecords) {
						void this.refreshRecords();
					}
				})
			);
		}
	}

	private async refreshRecords(): Promise<void> {
		if (!this.app) {
			return;
		}

		const [tiers, ranks, users, ignoredUsers, settings] = await Promise.all([
			loadTiers(this.app),
			loadRanks(this.app),
			loadUsers(this.app),
			loadIgnoredUsers(this.app),
			loadSettings(this.app)
		]);
		this.tiers = tiers;
		this.ranks = ranks;
		this.users = users;
		this.ignoredUsers = ignoredUsers;
		this.settings = settings;
	}

	private async persistRecords(operation: () => Promise<void>): Promise<void> {
		this.isPersistingRecords = true;

		try {
			await operation();
		} finally {
			this.isPersistingRecords = false;
		}
	}

	async load(): Promise<void> {
		const { store, app } = this.requireContext();
		await app.waitForConfigSync();
		await this.persistRecords(() => migrateRankingsRecords(store, app));
		await this.persistRecords(() => ensureDefaultConfig(app));

		const [tiers, ranks, users, ignoredUsers, settings, pointHistory] = await Promise.all([
			loadTiers(app),
			loadRanks(app),
			loadUsers(app),
			loadIgnoredUsers(app),
			loadSettings(app),
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
		const { app } = this.requireContext();
		await this.persistRecords(() => saveUsers(app, this.users));
	}

	async persistDirtyUsers(users: UserRankingRecord[]): Promise<void> {
		if (users.length === 0) {
			return;
		}

		const { app } = this.requireContext();
		await this.persistRecords(async () => {
			const saved = await upsertUsers(app, users);
			const savedByUserId = new Map(saved.map((user) => [user.userId, user]));
			this.users = this.users.map((user) => {
				const next = savedByUserId.get(user.userId);
				return next ? { ...user, id: next.id } : user;
			});
		});
	}

	async persistIgnoredUsers(): Promise<void> {
		const { app } = this.requireContext();
		await this.persistRecords(() => saveIgnoredUsers(app, this.ignoredUsers));
	}

	async persistTiersAndRanks(): Promise<void> {
		const { app } = this.requireContext();
		await this.persistRecords(async () => {
			const savedTiers = await saveTiers(app, this.tiers);
			const tierIds = new Map(this.tiers.map((tier, index) => [tier.id, savedTiers[index].id]));
			this.tiers = savedTiers;
			this.ranks = this.ranks.map((rank) => ({
				...rank,
				tierId: tierIds.get(rank.tierId) ?? rank.tierId
			}));
			this.ranks = await saveRanks(app, this.ranks);
			this.overlayIconCache.clear();
		});
	}

	async persistSettings(): Promise<void> {
		const { app } = this.requireContext();
		await this.persistRecords(() => saveSettings(app, this.settings));
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
		const ordered = this.getOrderedRanks();
		const lastInTier = isLastRankInTier(currentProgress.rank, currentProgress.tier, ordered);

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
			currentRankIcon: currentProgress.rank?.icon?.trim() || DEFAULT_RANK_ICON,
			currentRankColor: currentProgress.rank?.color?.trim() || '',
			isLastRankInTier: lastInTier ? 'true' : 'false',
			channel,
			broadcasterId
		};
	}

	async resolveOverlayIcon(icon: string | undefined): Promise<string> {
		const key = icon?.trim() || DEFAULT_RANK_ICON;
		const cached = this.overlayIconCache.get(key);

		if (cached) {
			return cached;
		}

		const resolved = await resolveOverlayRankIcon(key, this.app?.userFiles ?? null);
		this.overlayIconCache.set(key, resolved);
		return resolved;
	}

	private async applyPointsMutation(
		user: UserRankingRecord,
		nextPoints: number,
		amount: number,
		source: string,
		historyKind?: PointHistoryKind
	): Promise<PointsMutationResult> {
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

		if (rankChanged || tierAdvanced) {
			context.currentRankIcon = await this.resolveOverlayIcon(currentProgress.rank?.icon);
		}

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
		const result = await this.applyPointsMutation(
			user,
			user.totalPoints + clampPoints(input.amount),
			clampPoints(input.amount),
			input.source,
			input.source === 'watch-time' ? 'watch-time' : 'add'
		);
		await Promise.all([this.persistDirtyUsers([result.user]), this.persistPointHistory()]);

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
		const result = await this.applyPointsMutation(
			user,
			clampPoints(input.amount),
			amount,
			input.source,
			'set'
		);
		await Promise.all([this.persistDirtyUsers([result.user]), this.persistPointHistory()]);

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
		const result = await this.applyPointsMutation(
			user,
			user.totalPoints - removed,
			-removed,
			input.source,
			'remove'
		);
		await Promise.all([this.persistDirtyUsers([result.user]), this.persistPointHistory()]);

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
		await this.persistDirtyUsers([updated]);
	}

	async applyWatchTimeAwards(
		inputs: Array<{
			userId: string;
			username: string;
			platform: RankingsPlatform;
			seconds: number;
			points?: number;
		}>
	): Promise<void> {
		if (inputs.length === 0) {
			return;
		}

		const dirtyByUserId = new Map<string, UserRankingRecord>();
		let historyChanged = false;

		for (const input of inputs) {
			if (this.isIgnored(input)) {
				continue;
			}

			const seconds = Math.max(0, Math.floor(input.seconds));
			const points = Math.max(0, Math.floor(input.points ?? 0));

			if (seconds <= 0 && points <= 0) {
				continue;
			}

			let user = this.upsertUser(input);

			if (seconds > 0) {
				user = {
					...user,
					watchTimeSeconds: user.watchTimeSeconds + seconds,
					updatedAt: new Date().toISOString()
				};
				this.users = this.users.map((entry) => (entry.userId === user.userId ? user : entry));
			}

			if (points > 0) {
				const result = await this.applyPointsMutation(
					user,
					user.totalPoints + points,
					points,
					'watch-time',
					'watch-time'
				);
				user = result.user;
				historyChanged = true;
			}

			dirtyByUserId.set(user.userId, user);
		}

		await this.persistDirtyUsers([...dirtyByUserId.values()]);

		if (historyChanged) {
			await this.persistPointHistory();
		}
	}

	async createTier(input: Omit<TierRecord, 'id' | 'sortOrder'> & { sortOrder?: number }): Promise<TierRecord> {
		const tier: TierRecord = {
			id: createRecordId(),
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
			id: createRecordId(),
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
