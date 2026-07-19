import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import { interpolateTemplate } from '../../lib/get-field-value';
import { loadQuotes, saveQuotes } from '../../lib/quotes-store';
import type { CreateQuoteInput, QuoteRecord, QuoteSource, UpdateQuoteInput } from '../../lib/types';

export class QuotesService {
	quotes: QuoteRecord[] = $state([]);

	private store?: PluginStore;
	private app?: PluginAppApi;

	bind(store: PluginStore, app: PluginAppApi): void {
		this.store = store;
		this.app = app;
	}

	requireApp(): PluginAppApi {
		return this.requireContext().app;
	}

	get isReady(): boolean {
		return this.store != null && this.app != null;
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('Quotes service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	async load(): Promise<void> {
		const { store } = this.requireContext();
		this.quotes = await loadQuotes(store);
	}

	private async persist(): Promise<void> {
		const { store } = this.requireContext();
		await saveQuotes(store, this.quotes);
	}

	list(): QuoteRecord[] {
		return [...this.quotes].sort((left, right) => left.id - right.id);
	}

	getById(id: number): QuoteRecord | undefined {
		return this.quotes.find((quote) => quote.id === id);
	}

	getRandom(): QuoteRecord | undefined {
		if (this.quotes.length === 0) {
			return undefined;
		}

		const index = Math.floor(Math.random() * this.quotes.length);
		return this.quotes[index];
	}

	private nextId(): number {
		if (this.quotes.length === 0) {
			return 1;
		}

		return Math.max(...this.quotes.map((quote) => quote.id)) + 1;
	}

	async create(input: CreateQuoteInput): Promise<QuoteRecord> {
		const text = input.text.trim();

		if (!text) {
			throw new Error(this.requireApp().i18n.translate('Quote text is required'));
		}

		const record: QuoteRecord = {
			id: this.nextId(),
			text,
			addedBy: input.addedBy.trim() || this.requireApp().i18n.translate('Manual'),
			addedByUserId: input.addedByUserId,
			createdAt: new Date().toISOString(),
			source: input.source ?? 'manual'
		};

		this.quotes = [...this.quotes, record];
		await this.persist();

		return record;
	}

	async update(id: number, input: UpdateQuoteInput): Promise<QuoteRecord> {
		const text = input.text.trim();

		if (!text) {
			throw new Error(this.requireApp().i18n.translate('Quote text is required'));
		}

		const index = this.quotes.findIndex((quote) => quote.id === id);

		if (index < 0) {
			throw new Error(this.requireApp().i18n.translate('Quote #{id} not found', { id }));
		}

		const existing = this.quotes[index];
		const updated: QuoteRecord = {
			...existing,
			text,
			addedBy: input.addedBy?.trim() || existing.addedBy
		};

		this.quotes = this.quotes.map((quote) => (quote.id === id ? updated : quote));
		await this.persist();

		return updated;
	}

	async delete(id: number): Promise<QuoteRecord | undefined> {
		const existing = this.getById(id);

		if (!existing) {
			return undefined;
		}

		this.quotes = this.quotes.filter((quote) => quote.id !== id);
		await this.persist();

		return existing;
	}

	formatQuoteMessage(
		quote: QuoteRecord,
		template: string,
		extra: Record<string, string | number | undefined> = {}
	): string {
		// Quote fields must win over command context (e.g. empty `{quote}` arg).
		return interpolateTemplate(template, {
			...extra,
			id: quote.id,
			quote: quote.text,
			text: quote.text,
			addedBy: quote.addedBy,
			createdAt: quote.createdAt
		});
	}

	resolveSource(value: unknown): QuoteSource {
		if (value === 'youtube' || value === 'twitch' || value === 'manual') {
			return value;
		}

		return 'twitch';
	}
}
