import type { Modal } from '@stream-kit/plugin/action';

import type { QuoteRecord } from '../../lib/types';
import QuoteForm from '../ui/quote-form.svelte';
import QuoteFormFooter from '../ui/quote-form-footer.svelte';
import { getQuotesService } from './get-quotes';
import { validateQuoteForm, type QuoteFormErrors } from './validate-quote-form';

export type QuoteProps = {
	id?: number;
	text?: string;
	addedBy?: string;
};

export class Quote {
	id?: number;
	modalId?: string;
	text: string = $state('');
	addedBy: string = $state('');
	formErrors: QuoteFormErrors | null = $state(null);

	constructor(props: QuoteProps = {}) {
		this.id = props.id;
		this.text = props.text ?? '';
		this.addedBy = props.addedBy ?? '';
	}

	static createDraft(): Quote {
		return new Quote();
	}

	static fromRecord(record: QuoteRecord): Quote {
		return new Quote({
			id: record.id,
			text: record.text,
			addedBy: record.addedBy
		});
	}

	open(): Modal {
		const app = getQuotesService().requireApp();

		this.modalId =
			this.id != null ? `quotes-quote-${this.id}` : `quotes-quote-draft-${crypto.randomUUID()}`;

		const title =
			this.id != null
				? app.i18n.translate('Edit quote #{id}', { id: this.id })
				: app.i18n.translate('Add quote');
		const modalProps = { quote: this };
		const existing = app.modal.get(this.modalId);

		if (existing) {
			existing.title = title;
			existing.props = modalProps;
			existing.open();
			this.formErrors = null;
			return existing;
		}

		const modal = app.modal.create({
			id: this.modalId,
			title,
			size: 'md',
			content: QuoteForm,
			footer: QuoteFormFooter,
			props: modalProps
		});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getQuotesService().requireApp().modal.get(this.modalId)?.close();
	}

	validateForm(): boolean {
		const app = getQuotesService().requireApp();
		this.formErrors = validateQuoteForm(
			{ text: this.text, addedBy: this.addedBy },
			app.i18n.translate
		);

		return this.formErrors == null;
	}

	async save(): Promise<void> {
		if (!this.validateForm()) {
			return;
		}

		const service = getQuotesService();
		const app = service.requireApp();
		const author = this.addedBy.trim();

		try {
			if (this.id != null) {
				await service.update(this.id, {
					text: this.text,
					addedBy: author
				});
				app.toast.create({
					title: app.i18n.translate('Quote saved'),
					variant: 'success'
				});
			} else {
				await service.create({
					text: this.text,
					addedBy: author,
					source: 'manual'
				});
				app.toast.create({
					title: app.i18n.translate('Quote added'),
					variant: 'success'
				});
			}

			this.close();
		} catch (error) {
			app.toast.create({
				title: app.i18n.translate('Could not save quote'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}
}
