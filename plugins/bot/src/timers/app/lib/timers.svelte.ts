import type { HandlerTriggerContext } from '$lib/core/action/handler-context';
import type { TimerRecord } from './stored-timer';

import { deleteTimers, getTimers, updateTimersEnabled } from '../db/repository';

import { translate } from '$lib/i18n';

import { getApp } from '$lib/core/registry';
import { Timer } from './timer.svelte';

export class Timers {
	items: Timer[] = $state.raw([]);

	add(timer: Timer): void {
		if (timer.id != null && this.items.some((item) => item.id === timer.id)) {
			return;
		}

		this.items = [...this.items, timer];
	}

	async deleteBulk(ids: number[]): Promise<void> {
		const toDelete = this.items.filter((timer) => timer.id != null && ids.includes(timer.id));

		if (toDelete.length === 0) {
			return;
		}

		for (const timer of toDelete) {
			timer.close();
		}

		await deleteTimers(toDelete.map((timer) => timer.id!));

		const deletedIds = new Set(toDelete.map((timer) => timer.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));

		getApp().toast.create({
			title: translate('Timers deleted'),
			description: translate('{count} timers have been deleted.', { count: toDelete.length }),
			variant: 'success'
		});
	}

	async load(): Promise<void> {
		const rows = await getTimers();
		this.items = rows.map((row) => Timer.fromRecord(row));
	}

	getSnapshot(): TimerRecord[] {
		return this.items
			.filter((timer): timer is Timer & { id: number } => timer.id != null)
			.map((timer) => timer.toRecord());
	}

	runById(id: number, context: HandlerTriggerContext): boolean {
		const timer = this.items.find((item) => item.id === id);

		if (!timer) {
			return false;
		}

		timer.runHandlers(context.data, context.trigger);

		return true;
	}

	async setEnabledBulk(ids: number[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(timer) => timer.id != null && ids.includes(timer.id) && timer.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const timer of toUpdate) {
			timer.enabled = enabled;
		}

		await updateTimersEnabled(
			toUpdate.map((timer) => timer.id!),
			enabled
		);

		getApp().toast.create({
			title: translate(enabled ? 'Timers enabled' : 'Timers disabled'),
			description: translate(
				enabled
					? '{count} timers have been enabled.'
					: '{count} timers have been disabled.',
				{ count: toUpdate.length }
			),
			variant: 'success'
		});
	}
}

export { Timer };
