import type { PluginStore } from '@stream-kit/plugin';

import type { QuoteRecord } from './types';

const QUOTES_KEY = 'quotes';
const SEED_VERSION_KEY = 'seedVersion';

export const CURRENT_SEED_VERSION = 2;

export async function loadQuotes(store: PluginStore): Promise<QuoteRecord[]> {
	const quotes = await store.get<QuoteRecord[]>(QUOTES_KEY);

	return quotes ?? [];
}

export async function saveQuotes(store: PluginStore, quotes: QuoteRecord[]): Promise<void> {
	await store.set(QUOTES_KEY, quotes);
}

export async function loadSeedVersion(store: PluginStore): Promise<number> {
	const version = await store.get<number>(SEED_VERSION_KEY);

	return typeof version === 'number' ? version : 0;
}

export async function saveSeedVersion(store: PluginStore, version: number): Promise<void> {
	await store.set(SEED_VERSION_KEY, version);
}
