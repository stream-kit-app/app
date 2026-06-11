import type { ModRuleRecord } from './stored-mod-rule';

import { deleteModRules, getModRules, saveModRule, updateModRulesEnabled } from '../db/repository';

import { translate } from '$lib/i18n';

import { getApp } from '$lib/core/registry';
import { ModRule } from './mod-rule.svelte';

export class ModerationRules {
	items: ModRule[] = $state.raw([]);

	add(rule: ModRule): void {
		if (rule.id != null && this.items.some((item) => item.id === rule.id)) {
			return;
		}

		this.items = [...this.items, rule];
	}

	async deleteBulk(ids: number[]): Promise<void> {
		const toDelete = this.items.filter((rule) => rule.id != null && ids.includes(rule.id));

		if (toDelete.length === 0) {
			return;
		}

		for (const rule of toDelete) {
			rule.close();
		}

		await deleteModRules(toDelete.map((rule) => rule.id!));

		const deletedIds = new Set(toDelete.map((rule) => rule.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));

		getApp().toast.create({
			title: translate('Moderation rules deleted'),
			description: translate('{count} rules have been deleted.', { count: toDelete.length }),
			variant: 'success'
		});
	}

	async load(): Promise<void> {
		const rows = await getModRules();
		this.items = rows.map((row) => ModRule.fromRecord(row));
	}

	async fetchRecords(): Promise<ModRuleRecord[]> {
		return getModRules();
	}

	getSnapshot(): ModRuleRecord[] {
		return this.items
			.filter((rule): rule is ModRule & { id: number } => rule.id != null)
			.map((rule) => rule.toRecord());
	}

	async setEnabledBulk(ids: number[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(rule) => rule.id != null && ids.includes(rule.id) && rule.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const rule of toUpdate) {
			rule.enabled = enabled;
		}

		await updateModRulesEnabled(
			toUpdate.map((rule) => rule.id!),
			enabled
		);

		getApp().toast.create({
			title: translate(enabled ? 'Rules enabled' : 'Rules disabled'),
			description: translate(
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
