<script lang="ts">
	import type { SettingsContext } from '#lib/core/settings/context.js';
	import type { SelectValuesFieldConfig } from './select-values-picker.svelte';

	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';

	import { Button } from '@stream-kit/ui/button';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { Label, resolveSelectItems } from '@stream-kit/ui/input';

	import { SelectValuesPicker } from './select-values-picker.svelte';
	import SelectValuesPickerForm from './select-values-picker-form.svelte';
	import SelectValuesPickerFormFooter from './select-values-picker-form-footer.svelte';
	import { getApp } from '#lib/core/registry.js';
	import { toSettingsSelectItemsSource } from '#lib/core/settings/settings-field.js';
	import { useI18n } from '#lib/i18n.js';

	type Props = {
		config: SelectValuesFieldConfig;
		context: SettingsContext;
	};

	let { config, context }: Props = $props();
	const { t } = useI18n();

	const picker = new SelectValuesPicker(
		`select-values-${crypto.randomUUID()}`,
		() => config,
		() => context
	);

	const selectedItemsSource = resolveSelectItems(
		() =>
			config.selectedItems
				? toSettingsSelectItemsSource(config.selectedItems, context)
				: picker.items.items,
		() => config.selectedReload?.(context) ?? config.itemsReload?.(context)
	);

	function openPicker(): void {
		const app = getApp();
		const existing = app.modals.get(picker.modalId);

		if (existing) {
			existing.open();
			return;
		}

		app
			.createModal({
				id: picker.modalId,
				title: config.dialogTitle ?? config.name,
				content: SelectValuesPickerForm,
				footer: SelectValuesPickerFormFooter,
				props: { picker },
				size: 'sm',
				onClose: () => (picker.search = '')
			})
			.open();
	}

	onDestroy(() => picker.close());
</script>

<div class="grid gap-3">
	<div class="flex flex-col gap-1">
		<Label>{config.name}</Label>
		{#if config.description}
			<p class="text-sm text-dark-100">{config.description}</p>
		{/if}
	</div>

	{#if selectedItemsSource.loading}
		<div class="flex items-center gap-2 text-sm text-dark-300">
			<Icon icon="ri:loader-4-line" class="size-4 animate-spin text-primary" aria-hidden="true" />
			<span>{config.loadingPlaceholder ?? t('Loading…')}</span>
		</div>
	{:else if selectedItemsSource.items.length > 0}
		<ul class="flex flex-wrap gap-2">
			{#each selectedItemsSource.items as item (item.value)}
				<li
					class="rounded-md border border-rule bg-success-200/5 px-3 py-1.5 text-sm text-dark-50"
				>
					{item.label}
				</li>
			{/each}
		</ul>
	{:else if config.emptySelectedLabel}
		<EmptyState compact icon="ri:checkbox-multiple-blank-line" title={config.emptySelectedLabel} />
	{/if}

	<Button variant="outline" onclick={openPicker}>
		{config.buttonLabel ?? t('Select values')}
	</Button>
</div>
