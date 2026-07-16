import { rankings } from '../../lib/instances';
import type { RankingsService } from './rankings.svelte';

export function getRankingsService(): RankingsService {
	return rankings;
}

export function tryGetRankingsService(): RankingsService | undefined {
	return rankings.isReady ? rankings : undefined;
}
