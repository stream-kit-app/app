import { getApp } from '$lib/core/registry';

export const ACTION_BULK_EDIT_NO_QUEUE = 'none';

type ActionBulkEditOptions = {
	modalId: string;
	selectedIds: number[];
	groupOrder: string[];
	onApplied?: () => void;
};

/** Shared state for the bulk edit modal content and footer. */
export class ActionBulkEditForm {
	changeGroup = $state(false);
	groupValue = $state('');
	changeQueue = $state(false);
	queueValue = $state(ACTION_BULK_EDIT_NO_QUEUE);
	applying = $state(false);

	readonly modalId: string;
	readonly selectedIds: number[];
	readonly groupOrder: string[];
	private readonly onApplied?: () => void;

	constructor(options: ActionBulkEditOptions) {
		this.modalId = options.modalId;
		this.selectedIds = options.selectedIds;
		this.groupOrder = options.groupOrder;
		this.onApplied = options.onApplied;
	}

	get canApply(): boolean {
		return (
			!this.applying &&
			((this.changeGroup && this.groupValue.trim().length > 0) || this.changeQueue)
		);
	}

	close(): void {
		getApp().modals.get(this.modalId)?.close();
	}

	async apply(): Promise<void> {
		if (!this.canApply) {
			return;
		}

		this.applying = true;

		try {
			const app = getApp();

			if (this.changeGroup && this.groupValue.trim().length > 0) {
				await app.actions.updateBulk(this.selectedIds, {
					group: this.groupValue,
					groupOrder: this.groupOrder
				});
			}

			if (this.changeQueue) {
				const queueId =
					this.queueValue === ACTION_BULK_EDIT_NO_QUEUE ? null : Number(this.queueValue);
				await app.actions.assignQueueBulk(this.selectedIds, queueId);
			}

			this.close();
			this.onApplied?.();
		} finally {
			this.applying = false;
		}
	}
}
