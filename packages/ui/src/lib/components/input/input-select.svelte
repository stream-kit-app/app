<script lang="ts">
	import type { SelectItem, SelectItemsSource } from '../../types';
	import type { WithoutChildren } from 'bits-ui';

	import Icon from '@iconify/svelte';
	import { Command as CommandPrimitive, Dialog as DialogPrimitive, useId } from 'bits-ui';
	import { tick } from 'svelte';

	import { cn } from '../../utils';
	import * as Command from '../command';
	import * as Dialog from '../dialog';
	import {
		inputFieldBorder,
		inputFieldDisabled,
		inputFieldErrorMessage,
		inputFieldFocusRing,
		inputFieldGroup,
		inputFieldRequiredMark,
		inputFieldSurface
	} from './input-field-classes';
	import { inputSizeClasses } from './input-size-classes';
	import Label from './label.svelte';
	import { resolveSelectItems } from './resolve-select-items.svelte';
	import { DROPDOWN_SEARCH_THRESHOLD } from './select-dropdown-limits';

	type SharedProps = {
		label?: string;
		items: SelectItemsSource;
		placeholder?: string;
		loadingPlaceholder?: string;
		searchPlaceholder?: string;
		noResultsLabel?: string;
		searchable?: boolean | 'auto';
		prependIcon?: string;
		id?: string;
		class?: string;
		error?: string;
		required?: boolean;
		reloadKey?: () => unknown;
		dialogTitle?: string;
		dialogDescription?: string;
		dialogProps?: WithoutChildren<DialogPrimitive.ContentProps>;
		commandProps?: WithoutChildren<CommandPrimitive.RootProps>;
	};

	type SingleRootRest = {
		type?: 'single';
		disabled?: boolean;
		value?: string;
		onValueChange?: (value: string) => void;
	};

	type MultipleRootRest = {
		type: 'multiple';
		disabled?: boolean;
		value?: string[];
		onValueChange?: (value: string[]) => void;
	};

	type Props = SharedProps & (SingleRootRest | MultipleRootRest);

	let {
		label,
		items: itemsSource,
		placeholder,
		loadingPlaceholder,
		searchPlaceholder,
		noResultsLabel,
		searchable = 'auto',
		prependIcon,
		dialogTitle = 'Select option',
		dialogDescription = 'Search and select an option from the list.',
		dialogProps,
		commandProps,
		id = useId(),
		class: className,
		error,
		required = false,
		reloadKey,
		type = 'single',
		disabled: disabledProp,
		value = $bindable(),
		onValueChange
	}: Props = $props();

	const resolvedPlaceholder = $derived(placeholder ?? 'Select an option');
	const resolvedLoadingPlaceholder = $derived(loadingPlaceholder ?? 'Loading...');
	const resolvedSearchPlaceholder = $derived(searchPlaceholder ?? 'Search values');
	const resolvedNoResultsLabel = $derived(noResultsLabel ?? 'No matches found');

	let open = $state(false);
	let commandSearch = $state('');
	const commandListId = useId();
	const commandInputId = useId();

	const resolvedItems = resolveSelectItems(
		() => itemsSource,
		() => reloadKey?.()
	);
	const disabled = $derived(disabledProp ?? false);
	const isMultiple = $derived(type === 'multiple');

	const showSearch = $derived.by(() => {
		if (searchable === true) {
			return true;
		}

		if (searchable === false) {
			return false;
		}

		return resolvedItems.items.length >= DROPDOWN_SEARCH_THRESHOLD;
	});

	const selectedLabel = $derived.by(() => {
		if (resolvedItems.loading) {
			return resolvedLoadingPlaceholder;
		}

		if (isMultiple) {
			const selected = value as string[];
			if (selected.length === 0) {
				return resolvedPlaceholder;
			}

			const labels = selected
				.map(
					(itemValue) =>
						resolvedItems.items.find((item) => item.value === itemValue)?.label
				)
				.filter(Boolean);

			return labels.length > 0 ? labels.join(', ') : resolvedPlaceholder;
		}

		const singleValue = value as string | undefined;
		if (!singleValue) {
			return resolvedPlaceholder;
		}

		return resolvedItems.items.find((item) => item.value === singleValue)?.label ?? singleValue;
	});

	const hasValue = $derived.by(() => {
		if (isMultiple) {
			return (value as string[]).length > 0;
		}

		return Boolean(value);
	});

	function handleOpenChange(nextOpen: boolean): void {
		open = nextOpen;

		if (!nextOpen) {
			commandSearch = '';
		}
	}

	function isSelected(itemValue: string): boolean {
		if (isMultiple) {
			return (value as string[]).includes(itemValue);
		}

		return value === itemValue;
	}

	function selectItem(item: SelectItem): void {
		if (item.disabled) {
			return;
		}

		if (isMultiple) {
			const current = [...(value as string[])];
			const index = current.indexOf(item.value);

			if (index >= 0) {
				current.splice(index, 1);
			} else {
				current.push(item.value);
			}

			value = current;
			onValueChange?.(current as never);
			return;
		}

		value = item.value;
		onValueChange?.(item.value as never);
		open = false;
	}

	function openDialog(): void {
		if (disabled) {
			return;
		}

		open = true;
	}

	async function handleOpenAutoFocus(event: Event): Promise<void> {
		dialogProps?.onOpenAutoFocus?.(event);
		if (event.defaultPrevented || !showSearch) {
			return;
		}

		event.preventDefault();
		await tick();
		document.getElementById(commandInputId)?.focus();
	}

	function handleCloseAutoFocus(event: Event): void {
		dialogProps?.onCloseAutoFocus?.(event);
		if (event.defaultPrevented) {
			return;
		}

		// Avoid focus ping-pong when this dialog closes inside another dialog.
		event.preventDefault();
	}
</script>

<div class={cn('relative grid w-full min-w-0 gap-2', className)}>
	{#if label}
		<Label for={id}>
			{label}
			{#if required}
				<span class={inputFieldRequiredMark}>*</span>
			{/if}
		</Label>
	{/if}

	<Dialog.Root bind:open onOpenChange={handleOpenChange}>
		<div
			class={cn(
				'relative flex w-full min-w-0 items-center rounded-lg',
				inputFieldGroup,
				inputFieldFocusRing(error)
			)}
		>
			<button
				{id}
				type="button"
				role="combobox"
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={open ? commandListId : undefined}
				{disabled}
				class={cn(
					'flex w-full min-w-0 cursor-pointer items-center outline-none',
					inputFieldDisabled
				)}
				onclick={openDialog}
			>
				{#if prependIcon}
					<span
						class={cn(
							'grid h-full min-w-10 place-items-center rounded-l-lg border border-r-0 text-dark-50 transition-colors',
							inputFieldBorder(error)
						)}
					>
						<Icon icon={prependIcon} class="size-6" />
					</span>
				{/if}
				<span
					class={cn(
						'flex w-full items-center justify-between gap-2 border outline-none transition-colors',
						inputFieldSurface,
						inputSizeClasses.md,
						inputFieldBorder(error),
						{
							'rounded-l-none rounded-r-lg border-l-0': prependIcon,
							'rounded-lg': !prependIcon
						}
					)}
				>
					<span class={cn('min-w-0 flex-1 truncate text-left', !hasValue && 'text-dark-300')}>
						{selectedLabel}
					</span>
					<Icon icon="ri:expand-up-down-line" class="size-5 shrink-0 text-dark-300" />
				</span>
			</button>
		</div>

		<Dialog.Portal>
			<Dialog.Overlay class="z-60 bg-black/60 backdrop-blur-sm" />
			<Dialog.Content
				{...dialogProps}
				trapFocus={dialogProps?.trapFocus ?? false}
				preventScroll={dialogProps?.preventScroll ?? false}
				onOpenAutoFocus={handleOpenAutoFocus}
				onCloseAutoFocus={handleCloseAutoFocus}
				class={cn('z-60', dialogProps?.class)}
			>
				<Dialog.Title class="sr-only">{dialogTitle}</Dialog.Title>
				<Dialog.Description class="sr-only">{dialogDescription}</Dialog.Description>

				<Command.Root
					{...commandProps}
					shouldFilter={!resolvedItems.loading}
					class={cn(commandProps?.class)}
				>
					{#if showSearch}
						<Command.Input
							id={commandInputId}
							bind:value={commandSearch}
							placeholder={resolvedSearchPlaceholder}
							aria-label={resolvedSearchPlaceholder}
						/>
					{/if}

					<Command.List id={commandListId} class="mt-2">
						<Command.Viewport>
							{#if resolvedItems.loading}
								<Command.Loading>{resolvedLoadingPlaceholder}</Command.Loading>
							{:else}
								<Command.Empty>{resolvedNoResultsLabel}</Command.Empty>
								{#each resolvedItems.items as item (item.value)}
									<Command.Item
										value={item.value}
										keywords={[item.label, item.value]}
										disabled={item.disabled}
										onSelect={() => selectItem(item)}
									>
										{item.label}
										{#if isSelected(item.value)}
											<Icon
												icon="ri:check-line"
												class="size-5 text-primary"
											/>
										{/if}
									</Command.Item>
								{/each}
							{/if}
						</Command.Viewport>
					</Command.List>
				</Command.Root>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>

	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
