import { translate } from '$lib/i18n';

/**
 * Options for {@link Confirm.ask} and `app.confirm.ask`.
 *
 * @example
 * ```ts
 * const confirmed = await app.confirm.ask({
 *   title: 'Delete item?',
 *   description: 'This action cannot be undone.',
 *   confirmLabel: 'Delete',
 *   cancelLabel: 'Keep'
 * });
 * ```
 */
export type ConfirmOptions = {
	/** Dialog title. */
	title: string;
	/** Optional body text shown below the title. */
	description?: string;
	/** Label for the confirm button. Defaults to a translated "Confirm". */
	confirmLabel?: string;
	/** Label for the cancel button. Defaults to a translated "Cancel". */
	cancelLabel?: string;
};

export class Confirm {
	public isOpen: boolean = $state(false);
	public options: ConfirmOptions | null = $state(null);

	#resolve: ((confirmed: boolean) => void) | null = null;

	ask(options: ConfirmOptions): Promise<boolean> {
		if (this.isOpen) {
			this.dismiss(false);
		}

		this.options = {
			confirmLabel: translate('Confirm'),
			cancelLabel: translate('Cancel'),
			...options
		};
		this.isOpen = true;

		return new Promise((resolve) => {
			this.#resolve = resolve;
		});
	}

	confirm(): void {
		this.dismiss(true);
	}

	cancel(): void {
		this.dismiss(false);
	}

	private dismiss(confirmed: boolean): void {
		const resolve = this.#resolve;

		if (!resolve) {
			return;
		}

		this.#resolve = null;
		this.isOpen = false;
		this.options = null;
		resolve(confirmed);
	}
}
