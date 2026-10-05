import type { ActionQueueDefinition } from '#lib/core/action-queue/action-queues.svelte.js';

import { concurrencyFromBlocking, isQueueBlocking } from '#lib/core/action-queue/queue-mode.js';
import { getApp } from '#lib/core/registry.js';

function parseOptionalNumber(value: string): number | null {
	const trimmed = value.trim();

	if (trimmed === '') {
		return null;
	}

	const parsed = Number(trimmed);

	return Number.isFinite(parsed) ? parsed : null;
}

/** Shared state for the queue create/edit modal content and footer. */
export class QueueEditForm {
	name = $state('');
	blocking = $state(true);
	maxLength = $state('');
	saving = $state(false);

	constructor(
		readonly modalId: string,
		readonly queue: ActionQueueDefinition | null = null
	) {
		this.name = queue?.name ?? '';
		this.blocking = queue != null ? isQueueBlocking(queue.concurrency) : true;
		this.maxLength = queue?.maxLength != null ? String(queue.maxLength) : '';
	}

	get isEditing(): boolean {
		return this.queue != null;
	}

	get isDefaultQueue(): boolean {
		return this.queue != null && getApp().actionQueues.isDefaultQueue(this.queue.id);
	}

	get canSave(): boolean {
		return this.name.trim().length > 0 && !this.saving;
	}

	close(): void {
		getApp().modals.get(this.modalId)?.close();
	}

	async save(): Promise<void> {
		if (!this.canSave) {
			return;
		}

		this.saving = true;

		try {
			const input = {
				name: this.name.trim(),
				concurrency: concurrencyFromBlocking(this.blocking),
				maxLength: parseOptionalNumber(this.maxLength)
			};

			const queues = getApp().actionQueues;

			if (this.queue != null) {
				await queues.update(this.queue.id, input);
			} else {
				await queues.create(input);
			}

			this.close();
		} finally {
			this.saving = false;
		}
	}
}
