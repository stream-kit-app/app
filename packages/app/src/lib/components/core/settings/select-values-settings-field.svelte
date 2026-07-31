<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';

	import type { SettingsContext } from '$lib/core/settings/context';
	import type { SettingsFieldDefinition } from '$lib/core/settings/field';
	import type { SelectItem } from '$lib/core/action/trigger/condition';

	import Icon from '@iconify/svelte';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox, InputText, Label } from '@stream-kit/ui/input';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { resolveSelectItems } from '@stream-kit/ui/input';
	import { Dialog } from 'bits-ui';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { toSettingsSelectItemsSource } from '$lib/core/settings/settings-field';

	type Props = {
		config: Extract<SettingsFieldDefinition, { type: 'select-values' }>;
		context: SettingsContext;
	};

	let { config, context }: Props = $props();
	const { t } = useI18n();

	let open = $state(false);
	let search = $state('');
	const busyValues = new SvelteMap<string, boolean>();

	const dialogItems = resolveSelectItems(
		() => toSettingsSelectItemsSource(config.items, context),
		() => config.itemsReload?.(context)
	);

	const selectedItemsSource = resolveSelectItems(
		() =>
			config.selectedItems
				? toSettingsSelectItemsSource(config.selectedItems, context)
				: dialogItems.items,
		() => config.selectedReload?.(context) ?? config.itemsReload?.(context)
	);

	const filteredItems = $derived.by(() => {
		const query = search.trim().toLowerCase();

		if (!query) {
			return dialogItems.items;
		}

		return dialogItems.items.filter((item) => {
			const haystack = `${item.label} ${item.value}`.toLowerCase();
			return haystack.includes(query);
		});
	});

	function isItemChecked(value: string): boolean {
		return config.isChecked?.(context, value) ?? false;
	}

	function isItemDisplayedChecked(value: string): boolean {
		if (busyValues.has(value)) {
			return busyValues.get(value) ?? isItemChecked(value);
		}

		return isItemChecked(value);
	}

	async function handleCheckedChange(item: SelectItem, checked: boolean): Promise<void> {
		if (busyValues.has(item.value) || item.disabled) {
			return;
		}

		if (checked && isItemChecked(item.value)) {
			return;
		}

		if (!checked && !isItemChecked(item.value)) {
			return;
		}

		busyValues.set(item.value, checked);

		try {
			if (checked) {
				await config.onCheck(context, item.value);
			} else if (config.onUncheck) {
				await config.onUncheck(context, item.value);
			}
		} finally {
			busyValues.delete(item.value);
		}
	}

	function handleOpenChange(nextOpen: boolean): void {
		open = nextOpen;

		if (!nextOpen) {
			search = '';
		}
	}
</script>

<div class="grid gap-3">
	<div class="flex flex-col gap-1">
		<Label>{config.name}</Label>
		{#if config.description}
			<p class="text-sm text-dark-100">{config.description}</p>
		{/if}
	</div>

	{#if selectedItemsSource.loading}
		<p class="text-sm text-dark-200">{config.loadingPlaceholder ?? t('Loading…')}</p>
	{:else if selectedItemsSource.items.length > 0}
		<ul class="flex flex-wrap gap-2">
			{#each selectedItemsSource.items as item (item.value)}
				<li
					class="rounded-none border border-rule bg-success-200/5 px-3 py-1.5 text-sm text-dark-50"
				>
					{item.label}
				</li>
			{/each}
		</ul>
	{:else if config.emptySelectedLabel}
		<p class="text-sm text-dark-200">{config.emptySelectedLabel}</p>
	{/if}

	<Button variant="outline" onclick={() => (open = true)}>
		{config.buttonLabel ?? t('Select values')}
	</Button>

	<Dialog.Root {open} onOpenChange={handleOpenChange}>
		<Dialog.Portal>
			<Dialog.Overlay
				class={cn(
					'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm duration-75',
					'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'
				)}
			/>
			<Dialog.Content
				class={cn(
					'fixed top-1/2 left-1/2 z-50 flex max-h-[min(32rem,calc(100vh-2rem))] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col',
					'rounded-none border border-rule bg-dark-800 p-6 shadow-lg duration-75 outline-none',
					'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
					'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
				)}
			>
				<Dialog.Title class="text-lg font-semibold text-dark-50">
					{config.dialogTitle ?? config.name}
				</Dialog.Title>

				<div class="mt-4 grid gap-3">
					<InputText
						label={t('Search')}
						placeholder={config.searchPlaceholder ?? t('Search values')}
						value={search}
						oninput={(event) => {
							search = event.currentTarget.value;
						}}
					/>

					<ScrollArea
						orientation="vertical"
						class="rounded-none border border-rule"
						viewportClasses="max-h-64 p-2"
					>
						{#if dialogItems.loading}
							<p class="px-3 py-6 text-sm text-dark-200">
								{config.loadingPlaceholder ?? t('Loading…')}
							</p>
						{:else if filteredItems.length === 0}
							<p class="px-3 py-6 text-sm text-dark-200">{t('No values match your search.')}</p>
						{:else}
							<ul class="grid gap-1">
								{#each filteredItems as item (item.value)}
									{@const isBusy = busyValues.has(item.value)}
									<li
										class={cn(
											'rounded-lg px-2 py-1',
											isItemDisplayedChecked(item.value) && 'bg-success-200/5',
											isBusy && 'bg-dark-700/40'
										)}
									>
										<div class="flex items-center justify-between gap-3">
											<InputCheckbox
												inline
												label={item.label}
												bind:checked={
													() => isItemDisplayedChecked(item.value),
													(checked) => void handleCheckedChange(item, checked)
												}
											/>
											{#if isBusy}
												<div class="flex shrink-0 items-center gap-1.5 text-xs text-dark-200">
													<Icon
														icon="gg:spinner"
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
					</ScrollArea>
				</div>

				<div class="mt-6 flex justify-end">
					<Dialog.Close>
						{#snippet child({ props })}
							<Button {...props} variant="outline">{t('Close')}</Button>
						{/snippet}
					</Dialog.Close>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>
