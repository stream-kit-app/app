export type RankingsPlatform = 'twitch' | 'youtube' | 'unknown';

export type TierRecord = {
	id: string;
	name: string;
	sortOrder: number;
	icon?: string;
};

export type RankRecord = {
	id: string;
	tierId: string;
	name: string;
	pointsRequired: number;
	sortOrder: number;
	icon?: string;
	color?: string;
};

export type UserRankingRecord = {
	userId: string;
	username: string;
	platform: RankingsPlatform;
	totalPoints: number;
	watchTimeSeconds: number;
	updatedAt: string;
};

export type PointHistoryKind = 'add' | 'remove' | 'set' | 'watch-time';

export type PointHistoryEntry = {
	id: string;
	userId: string;
	amount: number;
	balanceAfter: number;
	source: string;
	kind: PointHistoryKind;
	createdAt: string;
	updatedAt?: string;
};

export type RankingsSettings = {
	watchTimeEnabled: boolean;
	pointsPerMinute: number;
	awardIntervalSeconds: number;
	leaderboardSize: number;
};

export type OrderedRankEntry = {
	rank: RankRecord;
	tier: TierRecord;
};

export type RankProgress = {
	rank: RankRecord | null;
	tier: TierRecord | null;
};

export type PointsMutationResult = {
	user: UserRankingRecord;
	amount: number;
	previousPoints: number;
	previousProgress: RankProgress;
	currentProgress: RankProgress;
	rankChanged: boolean;
	tierAdvanced: boolean;
};

export const DEFAULT_RANKINGS_SETTINGS: RankingsSettings = {
	watchTimeEnabled: true,
	pointsPerMinute: 1,
	awardIntervalSeconds: 60,
	leaderboardSize: 10
};

export const DEFAULT_TIERS: TierRecord[] = [
	{ id: 'tier-bronze', name: 'Bronze', sortOrder: 0, icon: 'ri:medal-line' },
	{ id: 'tier-silver', name: 'Silver', sortOrder: 1, icon: 'ri:vip-crown-line' }
];

export const DEFAULT_RANKS: RankRecord[] = [
	{ id: 'rank-b1', tierId: 'tier-bronze', name: 'Scout', pointsRequired: 0, sortOrder: 0 },
	{ id: 'rank-b2', tierId: 'tier-bronze', name: 'Regular', pointsRequired: 100, sortOrder: 1 },
	{ id: 'rank-b3', tierId: 'tier-bronze', name: 'Dedicated', pointsRequired: 250, sortOrder: 2 },
	{ id: 'rank-b4', tierId: 'tier-bronze', name: 'Devoted', pointsRequired: 500, sortOrder: 3 },
	{ id: 'rank-b5', tierId: 'tier-bronze', name: 'Champion', pointsRequired: 1000, sortOrder: 4 },
	{ id: 'rank-s1', tierId: 'tier-silver', name: 'Veteran', pointsRequired: 1500, sortOrder: 0 },
	{ id: 'rank-s2', tierId: 'tier-silver', name: 'Elite', pointsRequired: 2500, sortOrder: 1 },
	{ id: 'rank-s3', tierId: 'tier-silver', name: 'Legend', pointsRequired: 5000, sortOrder: 2 }
];

export const PLUGIN_GROUP = 'rankings';

export const HANDLER_IDS = {
	getUserRank: 'rankings:rankings:get-user-rank',
	addPoints: 'rankings:rankings:add-points',
	setPoints: 'rankings:rankings:set-points',
	removePoints: 'rankings:rankings:remove-points',
	sendRankMessage: 'rankings:rankings:send-rank-message',
	sendLeaderboardMessage: 'rankings:rankings:send-leaderboard-message',
	sendLeaderboardToOverlay: 'rankings:rankings:send-leaderboard-to-overlay'
} as const;

export const TRIGGER_IDS = {
	pointsEarned: 'rankings:rankings:points-earned',
	rankChanged: 'rankings:rankings:rank-changed',
	tierAdvanced: 'rankings:rankings:tier-advanced'
} as const;

export const TWITCH_TRIGGER_IDS = {
	follow: 'twitch:twitch:channel:new-follower',
	sub: 'twitch:twitch:subscriptions:new-subscription',
	cheer: 'twitch:twitch:chat:cheer',
	raid: 'twitch:twitch:raids:incoming-raid'
} as const;

export const TWITCH_SEND_MESSAGE_HANDLER_ID = 'twitch:twitch:chat:send-message';
