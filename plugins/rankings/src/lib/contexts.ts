import type {
	RankingsPlatform,
	TierRecord,
	UserRankingRecord
} from './types';
export type RankingsEventContext = {
	userId: string;
	username: string;
	platform: RankingsPlatform;
	totalPoints: number;
	/** Alias of totalPoints for `{points}` in message templates. */
	points: number;
	watchTimeSeconds: number;
	source: string;
	amount: number;
	/** Current rank name (`None` when unranked). Same value as `{currentRank}`. */
	rank: string;
	/** Current tier name (`None` when none). Same value as `{currentTier}`. */
	tier: string;
	/** Previous rank name (`None` when none). */
	previousRank: string;
	/** Current rank name (`None` when unranked). */
	currentRank: string;
	/** Previous tier name (`None` when none). */
	previousTier: string;
	/** Current tier name (`None` when none). */
	currentTier: string;
	/** Connected Twitch channel login — used by Twitch Send Message / As bot. */
	channel?: string;
	broadcasterId?: string;
};

export type RankingsEventMap = {
	'points-earned': RankingsEventContext;
	'rank-changed': RankingsEventContext;
	'tier-advanced': RankingsEventContext;
};

export type RankingsStats = {
	totalUsers: number;
	totalPointsAwarded: number;
	totalWatchTimeSeconds: number;
	topUsers: UserRankingRecord[];
	tierDistribution: Array<{ tier: TierRecord; count: number }>;
};
