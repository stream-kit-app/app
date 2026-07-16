import type { TierRecord } from '../../lib/types';

export type TierOrderUpdate = {
	id: string;
	sortOrder: number;
};

export function buildTierOrder(tiers: TierRecord[]): string[] {
	return [...tiers].sort((left, right) => left.sortOrder - right.sortOrder).map((tier) => tier.id);
}

export function tierOrderToUpdates(orderedIds: string[]): TierOrderUpdate[] {
	return orderedIds.map((id, sortOrder) => ({ id, sortOrder }));
}

export function compareTierOrders(left: string[], right: string[]): boolean {
	if (left.length !== right.length) {
		return false;
	}

	return left.every((id, index) => id === right[index]);
}
