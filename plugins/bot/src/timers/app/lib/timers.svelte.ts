import type { HandlerTriggerContext, PluginAppApi, PluginStore } from '@stream-kit/plugin';
import type { TimerRecord } from './stored-timer';

import {
	loadTimers,
	migrateTimersToRecords,
	saveTimers,
	TIMERS_COLLECTION
} from '../../../lib/timers-store';

import { Timer } from './timer.svelte';

export class Timers {
	items: Timer[] = $state.raw([]);
	private store?: PluginStore;
	private app?: PluginAppApi;
	private unsubscribeRecords?: () => void;

	bind(store: PluginStore, app: PluginAppApi): void {
		if (this.store === store && this.app === app) {
			return;
		}

		this.unsubscribeRecords?.();
		this.store = store;
		this.app = app;
		this.unsubscribeRecords = app.records.open(TIMERS_COLLECTION).onChange(() => {
			void this.refreshDefinitionBindings();
		});
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('Timers service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	requireApp(): PluginAppApi {
		return this.requireContext().app;
	}

	add(timer: Timer): void {
		if (timer.id != null && this.items.some((item) => item.id === timer.id)) {
			return;
		}

		this.items = [...this.items, timer];
	}

	async deleteBulk(ids: string[]): Promise<void> {
		const toDelete = this.items.filter((timer) => timer.id != null && ids.includes(timer.id));

		if (toDelete.length === 0) {
			return;
		}

		for (const timer of toDelete) {
			timer.close();
		}

		const deletedIds = new Set(toDelete.map((timer) => timer.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));
		await this.persist();

		const { app } = this.requireContext();

		app.toast.create({
			title: app.i18n.translate('Timers deleted'),
			description: app.i18n.translate('{count} timers have been deleted.', {
				count: toDelete.length
			}),
			variant: 'success'
		});
	}

	async load(): Promise<void> {
		const { store, app } = this.requireContext();
		await migrateTimersToRecords(app, store);
		await app.waitForConfigSync();
		const rows = await loadTimers(app);

		this.items = rows.map((row) => Timer.fromRecord(row, app));
	}

	async refreshDefinitionBindings(): Promise<void> {
		const { app } = this.requireContext();
		const rows = await loadTimers(app);
		const openById = new Map(
			this.items
				.filter((timer): timer is Timer & { id: string } => timer.isFormOpen && timer.id != null)
				.map((timer) => [timer.id, timer])
		);

		this.items = rows.map((row) => openById.get(row.id) ?? Timer.fromRecord(row, app));
	}

	async persist(): Promise<void> {
		const { app } = this.requireContext();
		await saveTimers(app, this.getSnapshot());
	}

	async upsert(timer: Timer): Promise<void> {
		const wasNew = timer.id == null || !this.items.some((item) => item.id === timer.id);

		const now = new Date();

		if (wasNew) {
			timer.createdAt = now;
			timer.updatedAt = now;
			const fields = timer.toRecordFields();
			const created = await this.requireApp().records.open(TIMERS_COLLECTION).create({
				...fields,
				createdAt: fields.createdAt.toISOString(),
				updatedAt: fields.updatedAt.toISOString()
			});
			timer.id = created.id;
			this.add(timer);
			return;
		} else {
			timer.updatedAt = now;
			this.items = this.items.map((item) => (item.id === timer.id ? timer : item));
		}

		await this.persist();
	}

	getSnapshot(): TimerRecord[] {
		return this.items
			.filter((timer): timer is Timer & { id: string } => timer.id != null)
			.map((timer) => timer.toRecord());
	}

	runById(id: string, context: HandlerTriggerContext): boolean {
		const timer = this.items.find((item) => item.id === id);

		if (!timer) {
			return false;
		}

		if (timer.hasUnavailableDefinitions) {
			timer.rebindDefinitions();
		}

		timer.runHandlers(context.data, context.trigger);

		return true;
	}

	async setEnabledBulk(ids: string[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(timer) => timer.id != null && ids.includes(timer.id) && timer.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const timer of toUpdate) {
			timer.enabled = enabled;
			timer.updatedAt = new Date();
		}

		await this.persist();

		const { app } = this.requireContext();

		app.toast.create({
			title: app.i18n.translate(enabled ? 'Timers enabled' : 'Timers disabled'),
			description: app.i18n.translate(
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
