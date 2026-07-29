import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import type { QuoteRecord } from './types';

const QUOTES_KEY = 'quotes';
const SEED_VERSION_KEY = 'seedVersion';
const QUOTES_MIGRATION_KEY = '__records_migrated_quotes_v1';
const SEED_VERSION_MIGRATION_KEY = '__records_migrated_seedVersion_v1';
export const SEED_VERSION_RECORD_ID = 'seedversion0001';

export const CURRENT_SEED_VERSION = 2;

export type QuoteStorageRecord = {
	quote: QuoteRecord;
};

export type QuotesRecordCollection = {
	list<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<Array<T & { id: string }>>;
	get<T extends Record<string, unknown> = Record<string, unknown>>(
		id: string
	): Promise<(T & { id: string }) | undefined>;
	create<T extends Record<string, unknown> = Record<string, unknown>>(
		data: T & { id?: string }
	): Promise<T & { id: string }>;
	update<T extends Record<string, unknown> = Record<string, unknown>>(
		id: string,
		data: Partial<T>
	): Promise<T & { id: string }>;
	delete(id: string): Promise<void>;
	onChange(listener: () => void): () => void;
};

type QuotesAppApi = PluginAppApi & {
	records: {
		open<T extends Record<string, unknown> = Record<string, unknown>>(
			collection: string
		): QuotesRecordCollection;
	};
	waitForConfigSync(): Promise<void>;
};

type SeedVersionStorageRecord = {
	seedVersion: number;
};

export function openQuotesRecords(app: PluginAppApi): QuotesRecordCollection {
	return (app as QuotesAppApi).records.open<QuoteStorageRecord>('quotes');
}

export function waitForQuotesConfigSync(app: PluginAppApi): Promise<void> {
	return (app as QuotesAppApi).waitForConfigSync();
}

function isQuoteStorageRecord(
	record: Record<string, unknown>
): record is QuoteStorageRecord & { id: string } {
	const quote = record.quote as Partial<QuoteRecord> | undefined;

	return (
		typeof quote === 'object' &&
		quote != null &&
		typeof quote.id === 'number' &&
		typeof quote.text === 'string' &&
		typeof quote.addedBy === 'string' &&
		typeof quote.createdAt === 'string' &&
		(quote.source === 'twitch' || quote.source === 'youtube' || quote.source === 'manual')
	);
}

export async function loadQuoteRecords(
	app: PluginAppApi
): Promise<Array<QuoteStorageRecord & { id: string }>> {
	const records = await openQuotesRecords(app).list<QuoteStorageRecord>();

	return records.filter(isQuoteStorageRecord);
}

export async function migrateLegacyQuotes(store: PluginStore, app: PluginAppApi): Promise<void> {
	if (await store.get<boolean>(QUOTES_MIGRATION_KEY)) {
		return;
	}

	const legacyQuotes = await store.get<QuoteRecord[]>(QUOTES_KEY);

	if (Array.isArray(legacyQuotes)) {
		const records = openQuotesRecords(app);
		const existingQuoteIds = new Set((await loadQuoteRecords(app)).map((record) => record.quote.id));

		for (const quote of legacyQuotes) {
			if (!existingQuoteIds.has(quote.id)) {
				// Legacy numeric quote IDs are payload data, not valid record sync IDs.
				await records.create({ quote });
			}
		}
	}

	await store.set(QUOTES_MIGRATION_KEY, true);
	await store.delete(QUOTES_KEY);
}

export async function migrateLegacySeedVersion(store: PluginStore, app: PluginAppApi): Promise<void> {
	if (await store.get<boolean>(SEED_VERSION_MIGRATION_KEY)) {
		return;
	}

	const legacyVersion = await store.get<number>(SEED_VERSION_KEY);

	if (typeof legacyVersion === 'number') {
		const records = openQuotesRecords(app);
		const existing = await records.get<SeedVersionStorageRecord>(SEED_VERSION_RECORD_ID);

		if (!existing) {
			await records.create({
				id: SEED_VERSION_RECORD_ID,
				seedVersion: legacyVersion
			});
		}
	}

	await store.set(SEED_VERSION_MIGRATION_KEY, true);
	await store.delete(SEED_VERSION_KEY);
}

export async function loadSeedVersion(app: PluginAppApi): Promise<number> {
	const record = await openQuotesRecords(app).get<SeedVersionStorageRecord>(SEED_VERSION_RECORD_ID);

	return typeof record?.seedVersion === 'number' ? record.seedVersion : 0;
}

export async function saveSeedVersion(app: PluginAppApi, version: number): Promise<void> {
	const records = openQuotesRecords(app);
	const existing = await records.get<SeedVersionStorageRecord>(SEED_VERSION_RECORD_ID);

	if (existing) {
		await records.update(SEED_VERSION_RECORD_ID, { seedVersion: version });
	} else {
		await records.create({ id: SEED_VERSION_RECORD_ID, seedVersion: version });
	}
}
