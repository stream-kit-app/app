import { getApp } from '#lib/core/registry.js';

/**
 * Shared state for auth modals: the content renders the `<form>` and fields,
 * the footer renders Cancel / submit (linked to the form via `formId`).
 */
export class AuthModalForm {
	name = $state('');
	email = $state('');
	password = $state('');
	passwordConfirm = $state('');
	submitting = $state(false);

	constructor(
		readonly modalId: string,
		private readonly isValid: (form: AuthModalForm) => boolean
	) {}

	get formId(): string {
		return `${this.modalId}-form`;
	}

	get canSubmit(): boolean {
		return !this.submitting && this.isValid(this);
	}

	close(): void {
		getApp().modals.get(this.modalId)?.close();
	}
}
