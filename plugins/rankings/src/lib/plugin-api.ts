import type { RankingsService } from '../app/lib/rankings.svelte';

export type RankingsPluginApi = {
	readonly rankings: RankingsService;
};
