import type {
	OrderedRankEntry,
	RankProgress,
	RankRecord,
	TierRecord,
	UserRankingRecord
} from './types';

export function orderRanks(tiers: TierRecord[], ranks: RankRecord[]): OrderedRankEntry[] {
	const tierById = new Map(tiers.map((tier) => [tier.id, tier]));
	const tierOrder = new Map(
		[...tiers].sort((left, right) => left.sortOrder - right.sortOrder).map((tier, index) => [
			tier.id,
			index
		])
	);

	return [...ranks]
		.filter((rank) => tierById.has(rank.tierId))
		.sort((left, right) => {
			const leftTierOrder = tierOrder.get(left.tierId) ?? 0;
			const rightTierOrder = tierOrder.get(right.tierId) ?? 0;

			if (leftTierOrder !== rightTierOrder) {
				return leftTierOrder - rightTierOrder;
			}

			if (left.pointsRequired !== right.pointsRequired) {
				return left.pointsRequired - right.pointsRequired;
			}

			return left.sortOrder - right.sortOrder;
		})
		.map((rank) => ({
			rank,
			tier: tierById.get(rank.tierId)!
		}));
}

export function resolveProgress(totalPoints: number, ordered: OrderedRankEntry[]): RankProgress {
	let current: OrderedRankEntry | null = null;

	for (const entry of ordered) {
		if (totalPoints >= entry.rank.pointsRequired) {
			current = entry;
		} else {
			break;
		}
	}

	if (!current) {
		return { rank: null, tier: null };
	}

	return {
		rank: current.rank,
		tier: current.tier
	};
}

export function isLastRankInTier(
	rank: RankRecord | null,
	tier: TierRecord | null,
	ordered: OrderedRankEntry[]
): boolean {
	if (!rank || !tier) {
		return false;
	}

	const tierRanks = ordered.filter((entry) => entry.tier.id === tier.id);

	if (tierRanks.length === 0) {
		return false;
	}

	return tierRanks[tierRanks.length - 1]!.rank.id === rank.id;
}

export function didTierAdvance(
	previous: RankProgress,
	current: RankProgress,
	ordered: OrderedRankEntry[]
): boolean {
	if (!current.tier || !previous.tier) {
		return Boolean(current.tier && !previous.tier);
	}

	if (current.tier.id === previous.tier.id) {
		return false;
	}

	const previousTierOrder = ordered.find((entry) => entry.tier.id === previous.tier!.id)?.tier
		.sortOrder;
	const currentTierOrder = current.tier.sortOrder;

	if (previousTierOrder == null) {
		return currentTierOrder > 0;
	}

	return currentTierOrder > previousTierOrder;
}

export function didRankChange(previous: RankProgress, current: RankProgress): boolean {
	return previous.rank?.id !== current.rank?.id;
}

export function sortUsersByPoints(users: UserRankingRecord[]): UserRankingRecord[] {
	return [...users].sort((left, right) => {
		if (right.totalPoints !== left.totalPoints) {
			return right.totalPoints - left.totalPoints;
		}

		return left.username.localeCompare(right.username);
	});
}

export function clampPoints(value: number): number {
	if (!Number.isFinite(value)) {
		return 0;
	}

	return Math.max(0, Math.floor(value));
}
