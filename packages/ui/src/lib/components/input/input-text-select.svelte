<script lang="ts">
	import type { SelectItem, SelectItemsSource } from '../../types';
	import type { WithoutChildren } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Combobox, mergeProps, useId } from 'bits-ui';
	import { Debounced } from 'runed';
	import { tick } from 'svelte';

	import { cn } from '../../utils';

	import { inputSizeClasses } from './input-size-classes';
	import Label from './label.svelte';
	import { resolveSelectItems } from './resolve-select-items.svelte';
	import { filterSelectItems } from './select-dropdown-limits';
	import { DropdownScroll } from './use-dropdown-scroll.svelte';
	import VirtualSelectItems from './virtual-select-items.svelte';

	type Props = {
		label?: string;
		items: SelectItemsSource;
		placeholder?: string;
		loadingPlaceholder?: string;
		selectAriaLabel?: string;
		allowCustomValue?: boolean;
		required?: boolean;
		reloadKey?: () => unknown;
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
		loadingPlaceholder,
		selectAriaLabel,
		allowCustomValue = true,
		required,
		reloadKey,
		id = useId(),
		class: className,
		selectClass,
		contentProps,
		error,
		value = $bindable(''),
		...props
	}: Props = $props();

	const resolvedPlaceholder = $derived(placeholder);
	const resolvedLoadingPlaceholder = $derived(loadingPlaceholder ?? 'Loading...');
	const resolvedSelectAriaLabel = $derived(selectAriaLabel ?? 'Select value');

	let open = $state(false);
	let inputValue = $state('');
	let isSearching = $state(false);

	const dropdownScroll = new DropdownScroll();
	const resolvedItems = resolveSelectItems(() => itemsSource, () => reloadKey?.());
	const debouncedQuery = new Debounced(() => inputValue, 100);
	const itemsByValue = $derived(new Map(resolvedItems.items.map((item) => [item.value, item])));
	const selectedItem = $derived(itemsByValue.get(value));
	const selectedItemValue = $derived(selectedItem?.value ?? '');

	const listItems = $derived.by(() => {
		if (resolvedItems.loading) {
			return [];
		}

		const query = debouncedQuery.current.trim();

		return query ? filterSelectItems(resolvedItems.items, query) : resolvedItems.items;
	});

	const comboboxItems = $derived.by(() => {
		if (selectedItem && !listItems.some((item) => item.value === selectedItem.value)) {
			return [selectedItem, ...listItems];
		}

		return listItems;
	});

	function syncInputFromSelection() {
		if (isSearching) {
			return;
		}

		inputValue = selectedItem?.label ?? (allowCustomValue ? value : '');
	}

	$effect(() => {
		value;
		selectedItem?.label;
		syncInputFromSelection();
	});

	$effect(() => {
		debouncedQuery.current;

		if (!open) {
			return;
		}

		dropdownScroll.resetScroll();
	});

	function updateOpenFromInput() {
		open = listItems.length > 0 || resolvedItems.items.length > 0;
	}

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		inputValue = event.currentTarget.value;
		isSearching = true;

		if (allowCustomValue) {
			value = inputValue;
		}

		updateOpenFromInput();
	}

	function handleFocus() {
		open = true;
	}

	function handleBlur() {
		isSearching = false;
		syncInputFromSelection();
	}

	async function handleOpenChange(nextOpen: boolean) {
		open = nextOpen;

		if (!nextOpen) {
			isSearching = false;
			dropdownScroll.resetScroll();
			syncInputFromSelection();
			return;
		}

		await tick();
		dropdownScroll.scrollToValue(listItems, value);
	}

	function handleTriggerClick() {
		open = true;
	}

	const mergedInputProps = $derived(
		mergeProps(props, {
			id,
			placeholder: resolvedItems.loading ? resolvedLoadingPlaceholder : resolvedPlaceholder,
			autocomplete: 'off',
			class: cn(
				'w-full rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none',
				inputSizeClasses.md,
				error ? 'border-red-500' : 'border-dark-500'
			),
			'aria-invalid': error ? true : undefined,
			oninput: handleInput,
			onfocus: handleFocus,
			onblur: handleBlur
		})
	);
</script>

{#snippet comboboxItem(item: SelectItem)}
	{@const itemValue = item.value}
	{@const itemLabel = item.label}
	{@const itemDisabled = item.disabled}
	<Combobox.Item
		value={itemValue}
		label={itemLabel}
		disabled={itemDisabled}
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
{/snippet}

<div class={cn('relative grid w-full gap-2', className)}>
	{#if label}
		<Label for={id}>
			{label}
			{#if required}
				<span class="text-red-400">*</span>
			{/if}
		</Label>
	{/if}
	<Combobox.Root
		type="single"
		items={comboboxItems}
		{inputValue}
		value={selectedItemValue}
		onValueChange={(next) => {
			if (next) {
				value = next;
				isSearching = false;
				open = false;
				syncInputFromSelection();
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
				aria-label={resolvedSelectAriaLabel}
				aria-haspopup="listbox"
				aria-expanded={open}
				disabled={!!props.disabled}
				onclick={handleTriggerClick}
				class={cn(
					'flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none',
					inputSizeClasses.md,
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
					'z-50 max-h-84 min-w-(--bits-combobox-anchor-width)',
					'rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none',
					contentProps?.class
				)}
			>
				<Combobox.ScrollUpButton
					class="flex w-full items-center justify-center py-1 text-dark-300"
				>
					<Icon icon="ri:arrow-up-s-line" />
				</Combobox.ScrollUpButton>
				<Combobox.Viewport
					bind:ref={dropdownScroll.viewportRef}
					onscroll={dropdownScroll.handleViewportScroll}
				>
					{#if resolvedItems.loading}
						<div class="px-3 py-1.5 text-sm text-dark-300">{resolvedLoadingPlaceholder}</div>
					{:else if listItems.length > 0}
						<VirtualSelectItems
							items={listItems}
							scrollTop={dropdownScroll.scrollTop}
							item={comboboxItem}
						/>
					{:else}
						<div class="px-3 py-1.5 text-sm text-dark-300">{'No matches found'}</div>
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
