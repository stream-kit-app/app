import { quotes } from '../../lib/instances';
import type { QuotesService } from './quotes.svelte';

export function getQuotesService(): QuotesService {
	return quotes;
}

export function tryGetQuotesService(): QuotesService | undefined {
	return quotes.isReady ? quotes : undefined;
}
