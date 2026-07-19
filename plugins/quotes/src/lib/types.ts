export type QuoteSource = 'twitch' | 'youtube' | 'manual';

export type QuoteRecord = {
	id: number;
	text: string;
	addedBy: string;
	addedByUserId?: string;
	createdAt: string;
	source: QuoteSource;
};

export type CreateQuoteInput = {
	text: string;
	addedBy: string;
	addedByUserId?: string;
	source?: QuoteSource;
};

export type UpdateQuoteInput = {
	text: string;
	addedBy?: string;
};

export const PLUGIN_GROUP = 'quotes';

export const HANDLER_IDS = {
	addQuote: 'quotes:quotes:add-quote',
	sendQuoteMessage: 'quotes:quotes:send-quote-message',
	deleteQuote: 'quotes:quotes:delete-quote'
} as const;
