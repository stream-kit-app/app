<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HandlerFieldVariable, SelectItemsSource } from '../../types';
	import type { WithoutChildren } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Select, useId } from 'bits-ui';

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

	type Value = { path: string; type: string; value: string };

	type Props = {
		label?: string;
		items: SelectItemsSource;
		pathPlaceholder?: string;
		valuePlaceholder?: string;
		selectPlaceholder?: string;
		loadingPlaceholder?: string;
		variables?: HandlerFieldVariable[];
		valuelessOperators?: readonly string[];
		id?: string;
		class?: string;
		selectClass?: string;
		value?: Value;
		error?: string;
		suffix?: Snippet;
		contentProps?: WithoutChildren<Select.ContentProps>;
	} & Omit<HTMLInputAttributes, 'value' | 'id' | 'class'>;

	let {
		label,
		items: itemsSource,
		pathPlaceholder,
		valuePlaceholder,
		selectPlaceholder,
		loadingPlaceholder,
		variables = [],
		valuelessOperators = [],
		id = useId(),
		class: className,
		selectClass,
		contentProps,
		error,
		suffix,
		value = $bindable({ path: '', type: 'equals', value: '' }),
		...props
	}: Props = $props();

	const resolvedSelectPlaceholder = $derived(selectPlaceholder ?? 'Select');
	const resolvedLoadingPlaceholder = $derived(loadingPlaceholder ?? 'Loading...');

	const resolvedItems = resolveSelectItems(() => itemsSource);

	const pathListboxId = $derived(`${id}-path-listbox`);
	const valueListboxId = $derived(`${id}-value-listbox`);

	const pathAutocomplete = new VariableAutocomplete({
		variables: () => variables,
		onChange: (next) => (value = { ...value, path: next })
	});
	const valueAutocomplete = new VariableAutocomplete({
		variables: () => variables,
		onChange: (next) => (value = { ...value, value: next })
	});

	const segmentBorder = $derived(inputFieldBorder(error));
	const isValuelessOperator = $derived(valuelessOperators.includes(value.type));
</script>

<div class={cn('relative grid w-full gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div class="flex items-center gap-3">
		<div
			class={cn(
				'relative grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-lg',
				inputFieldGroup,
				inputFieldFocusRing(error)
			)}
		>
		<input
			{id}
			{@attach pathAutocomplete.attach}
			placeholder={pathPlaceholder}
			bind:value={value.path}
			class={cn(
				'min-w-0 flex-1 truncate border border-r outline-none',
				'rounded-l-lg',
				inputFieldSurface,
				inputFieldDisabled,
				inputSizeClasses.md,
				segmentBorder
			)}
			aria-invalid={error ? true : undefined}
			role={variables.length > 0 ? 'combobox' : undefined}
			aria-autocomplete={variables.length > 0 ? 'list' : undefined}
			aria-expanded={variables.length > 0 ? pathAutocomplete.isOpen : undefined}
			aria-controls={variables.length > 0 ? pathListboxId : undefined}
			aria-activedescendant={pathAutocomplete.isOpen
				? variableOptionId(pathListboxId, pathAutocomplete.highlightedIndex)
				: undefined}
			{...props}
		/>
		<Select.Root type="single" items={resolvedItems.items} bind:value={value.type}>
			<Select.Trigger
				class={cn(
					'flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 outline-none',
					inputFieldSurface,
					inputFieldDisabled,
					inputSizeClasses.md,
					segmentBorder,
					selectClass ?? 'w-32'
				)}
			>
				<Select.Value
					placeholder={resolvedItems.loading
						? resolvedLoadingPlaceholder
						: resolvedSelectPlaceholder}
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
							<div class="px-3 py-1.5 text-sm text-dark-300">
								{resolvedLoadingPlaceholder}
							</div>
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
											<Icon
												icon="ri:check-line"
												class="size-5 text-primary"
											/>
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
		{#if isValuelessOperator}
			<div
				class={cn(
					'flex min-w-0 items-center rounded-r-lg border border-l-0 px-3 text-dark-500 select-none',
					inputFieldSurface,
					inputSizeClasses.md,
					segmentBorder
				)}
				aria-hidden="true"
			>
				—
			</div>
		{:else}
			<input
				{@attach valueAutocomplete.attach}
				placeholder={valuePlaceholder}
				bind:value={value.value}
				class={cn(
					'min-w-0 flex-1 truncate rounded-r-lg border outline-none',
					inputFieldSurface,
					inputFieldDisabled,
					inputSizeClasses.md,
					segmentBorder
				)}
				aria-invalid={error ? true : undefined}
				role={variables.length > 0 ? 'combobox' : undefined}
				aria-autocomplete={variables.length > 0 ? 'list' : undefined}
				aria-expanded={variables.length > 0 ? valueAutocomplete.isOpen : undefined}
				aria-controls={variables.length > 0 ? valueListboxId : undefined}
				aria-activedescendant={valueAutocomplete.isOpen
					? variableOptionId(valueListboxId, valueAutocomplete.highlightedIndex)
					: undefined}
			/>
		{/if}

		<VariableAutocompletePopup autocomplete={pathAutocomplete} id={pathListboxId} />
		<VariableAutocompletePopup autocomplete={valueAutocomplete} id={valueListboxId} />
		</div>
		{#if suffix}
			<div class="flex shrink-0 items-center self-center">
				{@render suffix()}
			</div>
		{/if}
	</div>

	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
