<script lang="ts">
	import type { SelectItemsSource } from '$lib/core/action/trigger';
	import type { WithoutChildren } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Combobox, mergeProps, useId } from 'bits-ui';

	import { cn } from '$lib/utils';

	import Label from './label.svelte';
	import { resolveSelectItems } from './resolve-select-items.svelte';

	type Props = {
		label?: string;
		items: SelectItemsSource;
		placeholder?: string;
		loadingPlaceholder?: string;
		selectAriaLabel?: string;
		id?: string;
		class?: string;
		selectClass?: string;
		value?: string;
		error?: string;
		contentProps?: WithoutChildren<Combobox.ContentProps>;
	} & Omit<HTMLInputAttributes, 'value' | 'id' | 'class'>;

	let {
		label,
		items: itemsSource,
		placeholder,
		loadingPlaceholder = 'Loading…',
		selectAriaLabel = 'Select value',
		id = useId(),
		class: className,
		selectClass,
		contentProps,
		error,
		value = $bindable(''),
		...props
	}: Props = $props();

	let open = $state(false);
	let showAllItems = $state(false);

	const resolvedItems = resolveSelectItems(() => itemsSource);
	const selectedItemValue = $derived(
		resolvedItems.items.find((item) => item.value === value)?.value ?? ''
	);

	function filterItems(query: string) {
		const normalizedQuery = query.trim().toLowerCase();

		if (!normalizedQuery) {
			return resolvedItems.items;
		}

		return resolvedItems.items.filter(
			(item) =>
				item.label.toLowerCase().includes(normalizedQuery) ||
				item.value.toLowerCase().includes(normalizedQuery)
		);
	}

	const filteredItems = $derived.by(() => {
		if (resolvedItems.loading) {
			return [];
		}

		if (showAllItems) {
			return resolvedItems.items;
		}

		return filterItems(value);
	});

	function updateOpenFromInput() {
		if (showAllItems) {
			return;
		}

		const query = value.trim();

		if (!query) {
			open = false;
			return;
		}

		open = filterItems(value).length > 0;
	}

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		value = event.currentTarget.value;
		showAllItems = false;
		updateOpenFromInput();
	}

	function handleFocus() {
		if (filterItems(value).length > 0) {
			open = true;
		}
	}

	function handleOpenChange(nextOpen: boolean) {
		if (!nextOpen) {
			showAllItems = false;
		}
	}

	function handleTriggerClick() {
		showAllItems = true;
		open = true;
	}

	const mergedInputProps = $derived(
		mergeProps(props, {
			id,
			placeholder: resolvedItems.loading ? loadingPlaceholder : placeholder,
			autocomplete: 'off',
			class: cn(
				'w-full rounded-l-xl border border-r-0 bg-dark-700 px-4 py-2 text-dark-50 outline-none',
				error ? 'border-red-500' : 'border-dark-500'
			),
			'aria-invalid': error ? true : undefined,
			oninput: handleInput,
			onfocus: handleFocus
		})
	);
</script>

<div class={cn('relative grid w-full gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<Combobox.Root
		type="single"
		items={resolvedItems.items}
		inputValue={value}
		value={selectedItemValue}
		onValueChange={(next) => {
			if (next) {
				value = next;
				open = false;
				showAllItems = false;
			}
		}}
		bind:open
		onOpenChange={handleOpenChange}
		disabled={!!props.disabled}
	>
		<div
			class={cn(
				'flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary',
				error && 'has-focus:ring-red-500'
			)}
		>
			<Combobox.Input {...mergedInputProps} />
			<button
				type="button"
				aria-label={selectAriaLabel}
				aria-haspopup="listbox"
				aria-expanded={open}
				disabled={!!props.disabled}
				onclick={handleTriggerClick}
				class={cn(
					'flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 px-3 py-2 text-dark-50 outline-none',
					error ? 'border-red-500' : 'border-dark-500',
					selectClass
				)}
			>
				<Icon icon="ri:expand-up-down-line" class="size-5 shrink-0 text-dark-300" />
			</button>
		</div>
		<Combobox.Portal>
			<Combobox.Content
				{...contentProps}
				sideOffset={contentProps?.sideOffset ?? 4}
				class={cn(
					'z-50 max-h-(--bits-combobox-content-available-height) min-w-(--bits-combobox-anchor-width)',
					'rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none',
					contentProps?.class
				)}
			>
				<Combobox.ScrollUpButton
					class="flex w-full items-center justify-center py-1 text-dark-300"
				>
					<Icon icon="ri:arrow-up-s-line" />
				</Combobox.ScrollUpButton>
				<Combobox.Viewport>
					{#if resolvedItems.loading}
						<div class="px-3 py-1.5 text-sm text-dark-300">{loadingPlaceholder}</div>
					{:else if filteredItems.length > 0}
						{#each filteredItems as { value: itemValue, label: itemLabel, disabled } (itemValue)}
							<Combobox.Item
								value={itemValue}
								label={itemLabel}
								{disabled}
								class={cn(
									'flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none',
									'data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700'
								)}
							>
								{#snippet children({ selected })}
									{itemLabel}
									{#if selected}
										<Icon icon="ri:check-line" class="size-5 text-primary" />
									{/if}
								{/snippet}
							</Combobox.Item>
						{/each}
					{/if}
				</Combobox.Viewport>
				<Combobox.ScrollDownButton
					class="flex w-full items-center justify-center py-1 text-dark-300"
				>
					<Icon icon="ri:arrow-down-s-line" />
				</Combobox.ScrollDownButton>
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
