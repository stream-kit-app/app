import type { SettingsContext } from '$lib/core/settings/context';
import type { SettingsFieldDefinition } from '$lib/core/settings/field';
import type { SelectItem } from '$lib/core/action/trigger/condition';

import { SvelteMap } from 'svelte/reactivity';

import { resolveSelectItems } from '@stream-kit/ui/input';

import { getApp } from '$lib/core/registry';
import { toSettingsSelectItemsSource } from '$lib/core/settings/settings-field';

export type SelectValuesFieldConfig = Extract<SettingsFieldDefinition, { type: 'select-values' }>;

/**
 * Shared state for a `select-values` settings field and its picker modal
 * (content + footer). Must be constructed during component initialisation.
 */
export class SelectValuesPicker {
	search = $state('');

	readonly busyValues = new SvelteMap<string, boolean>();
	readonly items: ReturnType<typeof resolveSelectItems>;

	readonly filteredItems = $derived.by(() => {
		const query = this.search.trim().toLowerCase();

		if (!query) {
			return this.items.items;
		}

		return this.items.items.filter((item) =>
			`${item.label} ${item.value}`.toLowerCase().includes(query)
		);
	});

	constructor(
		readonly modalId: string,
		private readonly getConfig: () => SelectValuesFieldConfig,
		private readonly getContext: () => SettingsContext
	) {
		this.items = resolveSelectItems(
			() => toSettingsSelectItemsSource(this.config.items, this.context),
			() => this.config.itemsReload?.(this.context)
		);
	}

	get config(): SelectValuesFieldConfig {
		return this.getConfig();
	}

	get context(): SettingsContext {
		return this.getContext();
	}

	isItemChecked(value: string): boolean {
		return this.config.isChecked?.(this.context, value) ?? false;
	}

	isItemDisplayedChecked(value: string): boolean {
		if (this.busyValues.has(value)) {
			return this.busyValues.get(value) ?? this.isItemChecked(value);
		}

		return this.isItemChecked(value);
	}

	async setChecked(item: SelectItem, checked: boolean): Promise<void> {
		if (this.busyValues.has(item.value) || item.disabled) {
			return;
		}

		if (checked === this.isItemChecked(item.value)) {
			return;
		}

		this.busyValues.set(item.value, checked);

		try {
			if (checked) {
				await this.config.onCheck(this.context, item.value);
			} else if (this.config.onUncheck) {
				await this.config.onUncheck(this.context, item.value);
			}
		} finally {
			this.busyValues.delete(item.value);
		}
	}

	close(): void {
		getApp().modals.get(this.modalId)?.close();
	}
}
