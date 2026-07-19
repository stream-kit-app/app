import type {
	PointsMutationResult,
	RankProgress,
	RankRecord,
	RankingsPlatform,
	RankingsSettings,
	TierRecord,
	UserRankingRecord
} from './types';

export type RankingsEventContext = {
	userId: string;
	username: string;
	platform: RankingsPlatform;
	totalPoints: number;
	watchTimeSeconds: number;
	source: string;
	amount: number;
	previousRank: RankRecord | null;
	currentRank: RankRecord | null;
	previousTier: TierRecord | null;
	currentTier: TierRecord | null;
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
