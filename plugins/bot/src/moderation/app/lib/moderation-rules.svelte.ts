import type { ModRuleRecord } from './stored-mod-rule';

import {
	loadModRules,
	migrateModRulesToRecords,
	MOD_RULES_COLLECTION,
	saveModRules
} from '../../../lib/mod-rules-store';

import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import { ModRule } from './mod-rule.svelte';

export class ModerationRules {
	items: ModRule[] = $state.raw([]);
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
		this.unsubscribeRecords = app.records.open(MOD_RULES_COLLECTION).onChange(() => {
			void this.load();
		});
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('ModerationRules service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	requireApp(): PluginAppApi {
		return this.requireContext().app;
	}

	add(rule: ModRule): void {
		if (rule.id != null && this.items.some((item) => item.id === rule.id)) {
			return;
		}

		this.items = [...this.items, rule];
	}

	async deleteBulk(ids: string[]): Promise<void> {
		const toDelete = this.items.filter((rule) => rule.id != null && ids.includes(rule.id));

		if (toDelete.length === 0) {
			return;
		}

		for (const rule of toDelete) {
			rule.close();
		}

		const deletedIds = new Set(toDelete.map((rule) => rule.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));
		await this.persist();

		const { app } = this.requireContext();

		app.toast.create({
			title: app.i18n.translate('Moderation rules deleted'),
			description: app.i18n.translate('{count} rules have been deleted.', { count: toDelete.length }),
			variant: 'success'
		});
	}

	async load(): Promise<void> {
		const { store, app } = this.requireContext();
		await migrateModRulesToRecords(app, store);
		await app.waitForConfigSync();
		const rows = await loadModRules(app);
		this.items = rows.map((row) => ModRule.fromRecord(row));
	}

	async persist(): Promise<void> {
		const { app } = this.requireContext();
		await saveModRules(app, this.getSnapshot());
	}

	async upsert(rule: ModRule): Promise<void> {
		const wasNew = rule.id == null || !this.items.some((item) => item.id === rule.id);

		const now = new Date();

		if (wasNew) {
			rule.createdAt = now;
			rule.updatedAt = now;
			const fields = rule.toRecordFields();
			const created = await this.requireApp().records.open(MOD_RULES_COLLECTION).create({
				...fields,
				createdAt: fields.createdAt.toISOString(),
				updatedAt: fields.updatedAt.toISOString()
			});
			rule.id = created.id;
			this.add(rule);
			return;
		} else {
			rule.updatedAt = now;
			this.items = this.items.map((item) => (item.id === rule.id ? rule : item));
		}

		await this.persist();
	}

	async fetchRecords(): Promise<ModRuleRecord[]> {
		return this.getSnapshot();
	}

	getSnapshot(): ModRuleRecord[] {
		return this.items
			.filter((rule): rule is ModRule & { id: string } => rule.id != null)
			.map((rule) => rule.toRecord());
	}

	async setEnabledBulk(ids: string[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(rule) => rule.id != null && ids.includes(rule.id) && rule.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const rule of toUpdate) {
			rule.enabled = enabled;
			rule.updatedAt = new Date();
		}

		await this.persist();

		const { app } = this.requireContext();

		app.toast.create({
			title: app.i18n.translate(enabled ? 'Rules enabled' : 'Rules disabled'),
			description: app.i18n.translate(
				enabled
					? '{count} rules have been enabled.'
					: '{count} rules have been disabled.',
				{ count: toUpdate.length }
			),
			variant: 'success'
		});
	}
}

export { ModRule };
