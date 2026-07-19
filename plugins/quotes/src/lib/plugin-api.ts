import type { QuotesService } from '../app/lib/quotes.svelte';

export type QuotesPluginApi = {
	readonly quotes: QuotesService;
};
