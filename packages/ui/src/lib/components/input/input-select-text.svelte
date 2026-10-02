<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Select, useId } from 'bits-ui';

	import type { HandlerFieldVariable } from '../../types';
	import type { SelectItemsSource } from '../../types';
	import { cn } from '../../utils';
	import {
		VariableAutocomplete,
		VariableAutocompletePopup,
		variableOptionId
	} from '../variable-autocomplete';

	import {
		inputFieldBorder,
		inputFieldDisabled,
		inputFieldErrorMessage,
		inputFieldFocusRing,
		inputFieldGroup,
		inputFieldSurface
	} from './input-field-classes';
	import { inputSizeClasses } from './input-size-classes';
	import Label from './label.svelte';
	import { resolveSelectItems } from './resolve-select-items.svelte';

	type Value = { type: string; value: string };

	type Props = {
		label?: string;
		items: SelectItemsSource;
		selectPlaceholder?: string;
		loadingPlaceholder?: string;
		placeholder?: string;
		variables?: HandlerFieldVariable[];
		id?: string;
		class?: string;
		selectClass?: string;
		value?: Value;
		error?: string;
		contentProps?: WithoutChildren<Select.ContentProps>;
	} & Omit<HTMLInputAttributes, 'value' | 'id' | 'class'>;

	let {
		label,
		items: itemsSource,
		selectPlaceholder,
		loadingPlaceholder,
		placeholder,
		variables = [],
		id = useId(),
		class: className,
		selectClass,
		contentProps,
		error,
		value = $bindable({ type: '', value: '' }),
		...props
	}: Props = $props();

	const resolvedSelectPlaceholder = $derived(selectPlaceholder ?? 'Select');
	const resolvedLoadingPlaceholder = $derived(loadingPlaceholder ?? 'Loading...');

	const resolvedItems = resolveSelectItems(() => itemsSource);

	const listboxId = $derived(`${id}-listbox`);

	const autocomplete = new VariableAutocomplete({
		variables: () => variables,
		onChange: (next) => (value = { ...value, value: next })
	});
</script>

<div class={cn('relative grid w-full min-w-0 gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'flex w-full min-w-0 items-stretch rounded-lg',
			inputFieldGroup,
			inputFieldFocusRing(error)
		)}
	>
		<Select.Root type="single" items={resolvedItems.items} bind:value={value.type}>
			<Select.Trigger
				class={cn(
					'flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-lg border border-r-0 outline-none',
					inputFieldSurface,
					inputFieldDisabled,
					inputSizeClasses.md,
					inputFieldBorder(error),
					selectClass
				)}
			>
				<Select.Value
					placeholder={resolvedItems.loading ? resolvedLoadingPlaceholder : resolvedSelectPlaceholder}
					class="truncate data-placeholder:text-dark-300"
				/>
				<Icon icon="ri:expand-up-down-line" class="size-5 shrink-0 text-dark-300" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					{...contentProps}
					sideOffset={contentProps?.sideOffset ?? 4}
					class={cn(
						'z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)',
						'rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none',
						contentProps?.class
					)}
				>
					<Select.ScrollUpButton
						class="flex w-full items-center justify-center py-1 text-dark-300"
					>
						<Icon icon="ri:arrow-up-s-line" />
					</Select.ScrollUpButton>
					<Select.Viewport>
						{#if resolvedItems.loading}
							<div class="px-3 py-1.5 text-sm text-dark-300">{resolvedLoadingPlaceholder}</div>
						{:else}
							{#each resolvedItems.items as { value: itemValue, label: itemLabel, disabled } (itemValue)}
								<Select.Item
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
								</Select.Item>
							{/each}
						{/if}
					</Select.Viewport>
					<Select.ScrollDownButton
						class="flex w-full items-center justify-center py-1 text-dark-300"
					>
						<Icon icon="ri:arrow-down-s-line" />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
		<div class="relative min-w-0 flex-1">
			<input
				{@attach autocomplete.attach}
				{id}
				{placeholder}
				bind:value={value.value}
				class={cn(
					'min-w-0 w-full truncate rounded-r-lg border outline-none',
					inputFieldSurface,
					inputFieldDisabled,
					inputSizeClasses.md,
					inputFieldBorder(error)
				)}
				aria-invalid={error ? true : undefined}
				role={variables.length > 0 ? 'combobox' : undefined}
				aria-autocomplete={variables.length > 0 ? 'list' : undefined}
				aria-expanded={variables.length > 0 ? autocomplete.isOpen : undefined}
				aria-controls={variables.length > 0 ? listboxId : undefined}
				aria-activedescendant={autocomplete.isOpen
					? variableOptionId(listboxId, autocomplete.highlightedIndex)
					: undefined}
				{...props}
			/>

			<VariableAutocompletePopup {autocomplete} id={listboxId} />
		</div>
	</div>

	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
