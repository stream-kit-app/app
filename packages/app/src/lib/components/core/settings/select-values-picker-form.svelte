<script lang="ts">
	import type { SelectValuesPicker } from './select-values-picker.svelte';

	import Icon from '@iconify/svelte';

	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputCheckbox, InputText } from '@stream-kit/ui/input';

	import { useI18n } from '#lib/i18n.js';
	import { cn } from '#lib/utils.js';

	type Props = {
		picker: SelectValuesPicker;
	};

	let { picker }: Props = $props();

	const { t } = useI18n();
</script>

<div class="grid gap-3">
	<InputText
		label={t('Search')}
		placeholder={picker.config.searchPlaceholder ?? t('Search values')}
		value={picker.search}
		oninput={(event) => (picker.search = event.currentTarget.value)}
	/>

	<div class="rounded-lg border border-rule p-2">
		{#if picker.items.loading}
			<div class="flex items-center gap-2 px-3 py-6 text-sm text-dark-300">
				<Icon icon="ri:loader-4-line" class="size-4 animate-spin text-primary" aria-hidden="true" />
				<span>{picker.config.loadingPlaceholder ?? t('Loading…')}</span>
			</div>
		{:else if picker.filteredItems.length === 0}
			<EmptyState compact icon="ri:search-line" title={t('No values match your search.')} />
		{:else}
			<ul class="grid gap-1">
				{#each picker.filteredItems as item (item.value)}
					{@const isBusy = picker.busyValues.has(item.value)}
					<li
						class={cn(
							'rounded-lg px-2 py-1',
							picker.isItemDisplayedChecked(item.value) && 'bg-success-200/5',
							isBusy && 'bg-dark-700/40'
						)}
					>
						<div class="flex items-center justify-between gap-3">
							<InputCheckbox
								inline
								label={item.label}
								bind:checked={
									() => picker.isItemDisplayedChecked(item.value),
									(checked) => void picker.setChecked(item, checked)
								}
							/>
							{#if isBusy}
								<div class="flex shrink-0 items-center gap-1.5 text-xs text-dark-200">
									<Icon
										icon="ri:loader-4-line"
										class="size-4 animate-spin text-primary"
										aria-hidden="true"
									/>
									<span>{t('Processing…')}</span>
								</div>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
