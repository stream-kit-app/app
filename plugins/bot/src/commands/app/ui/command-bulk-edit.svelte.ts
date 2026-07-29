import { getCommandsService } from '../lib/get-commands';

export class CommandBulkEditForm {
	changeGroup = $state(false);
	groupValue = $state('');
	applying = $state(false);

	constructor(
		readonly selectedIds: string[],
		readonly groupOrder: string[],
		readonly onApplied?: () => void,
		readonly onClose?: () => void
	) {}

	get selectedCount(): number {
		return this.selectedIds.length;
	}

	get canApply(): boolean {
		return this.changeGroup && this.groupValue.trim().length > 0;
	}

	close(): void {
		this.onClose?.();
	}

	async apply(): Promise<void> {
		if (!this.canApply || this.applying) {
			return;
		}

		this.applying = true;

		try {
			const commands = getCommandsService();

			await commands.moveToGroup(this.selectedIds, {
				group: this.groupValue,
				groupOrder: this.groupOrder
			});

			this.onApplied?.();
			this.close();
		} finally {
			this.applying = false;
		}
	}
}
