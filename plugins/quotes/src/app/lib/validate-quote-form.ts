export type QuoteFormErrors = {
	text?: string;
	addedBy?: string;
};

export function validateQuoteForm(
	input: { text: string; addedBy: string },
	translate: (key: string, params?: Record<string, string | number | null | undefined>) => string
): QuoteFormErrors | null {
	const errors: QuoteFormErrors = {};

	if (!input.text.trim()) {
		errors.text = translate('Quote text is required');
	}

	if (!input.addedBy.trim()) {
		errors.addedBy = translate('Author is required');
	}

	return Object.keys(errors).length > 0 ? errors : null;
}
