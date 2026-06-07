export type ConfirmOptions = {
	title: string;
	description?: string;
	confirmLabel?: string;
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
			confirmLabel: 'Confirm',
			cancelLabel: 'Cancel',
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
