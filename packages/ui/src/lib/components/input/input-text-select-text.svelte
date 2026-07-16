<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HandlerFieldVariable, SelectItemsSource } from '../../types';
	import type { WithoutChildren } from 'bits-ui';
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		KeyboardEventHandler
	} from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Select, useId } from 'bits-ui';
	import { onDestroy } from 'svelte';

	import { cn } from '../../utils';
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
	type ActiveField = 'path' | 'value';

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

	let pathInputElement = $state<HTMLInputElement | null>(null);
	let valueInputElement = $state<HTMLInputElement | null>(null);
	let activeField = $state<ActiveField>('path');
	let showSuggestions = $state(false);
	let suggestionFilter = $state('');
	let highlightedIndex = $state(0);

	const filteredVariables = $derived.by(() => {
		if (!suggestionFilter) {
			return variables;
		}

		const query = suggestionFilter.toLowerCase();

		return variables.filter(
			(variable) =>
				variable.key.toLowerCase().includes(query) ||
				variable.label.toLowerCase().includes(query)
		);
	});

	function getInputElement(field: ActiveField): HTMLInputElement | null {
		return field === 'path' ? pathInputElement : valueInputElement;
	}

	function getFieldText(field: ActiveField): string {
		return field === 'path' ? value.path : value.value;
	}

	function setFieldText(field: ActiveField, text: string): void {
		if (field === 'path') {
			value = { ...value, path: text };
			return;
		}

		value = { ...value, value: text };
	}

	function getPartialVariable(field: ActiveField): { start: number; partial: string } | null {
		const inputElement = getInputElement(field);

		if (!inputElement) {
			return null;
		}

		const text = getFieldText(field);
		const cursor = inputElement.selectionStart ?? text.length;
		const beforeCursor = text.slice(0, cursor);
		const openBrace = beforeCursor.lastIndexOf('{');

		if (openBrace === -1) {
			return null;
		}

		const partial = beforeCursor.slice(openBrace + 1);

		if (partial.includes('}')) {
			return null;
		}

		return { start: openBrace, partial };
	}

	function updateSuggestions(field: ActiveField): void {
		activeField = field;
		const partial = getPartialVariable(field);

		if (!partial || variables.length === 0) {
			showSuggestions = false;
			suggestionFilter = '';
			highlightedIndex = 0;
			return;
		}

		suggestionFilter = partial.partial;
		showSuggestions = filteredVariables.length > 0;
		highlightedIndex = 0;
	}

	function insertVariable(variableKey: string, field: ActiveField = activeField): void {
		const partial = getPartialVariable(field);
		const inputElement = getInputElement(field);

		if (!partial || !inputElement) {
			return;
		}

		const text = getFieldText(field);
		const cursor = inputElement.selectionStart ?? text.length;
		const before = text.slice(0, partial.start);
		const after = text.slice(cursor);
		setFieldText(field, `${before}{${variableKey}}${after}`);
		showSuggestions = false;
		suggestionFilter = '';

		queueMicrotask(() => {
			if (!inputElement) {
				return;
			}

			const nextCursor = before.length + variableKey.length + 2;
			inputElement.focus();
			inputElement.setSelectionRange(nextCursor, nextCursor);
		});
	}

	const createInputHandlers = (field: ActiveField) => {
		const handleInput: FormEventHandler<HTMLInputElement> = () => {
			updateSuggestions(field);
		};

		const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
			if (!showSuggestions || filteredVariables.length === 0 || activeField !== field) {
				return;
			}

			if (event.key === 'ArrowDown') {
				event.preventDefault();
				highlightedIndex = (highlightedIndex + 1) % filteredVariables.length;
				return;
			}

			if (event.key === 'ArrowUp') {
				event.preventDefault();
				highlightedIndex =
					(highlightedIndex - 1 + filteredVariables.length) % filteredVariables.length;
				return;
			}

			if (event.key === 'Enter' || event.key === 'Tab') {
				const variable = filteredVariables[highlightedIndex];

				if (variable) {
					event.preventDefault();
					insertVariable(variable.key, field);
				}
				return;
			}

			if (event.key === 'Escape') {
				showSuggestions = false;
			}
		};

		const handleBlur = () => {
			if (blurTimeout) {
				clearTimeout(blurTimeout);
			}

			blurTimeout = setTimeout(() => {
				showSuggestions = false;
				blurTimeout = undefined;
			}, 120);
		};

		return { handleInput, handleKeydown, handleBlur };
	};

	let blurTimeout: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => {
		if (blurTimeout) {
			clearTimeout(blurTimeout);
		}
	});

	const pathHandlers = createInputHandlers('path');
	const valueHandlers = createInputHandlers('value');

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
				'relative grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl',
				inputFieldGroup,
				inputFieldFocusRing(error)
			)}
		>
		<input
			{id}
			bind:this={pathInputElement}
			placeholder={pathPlaceholder}
			bind:value={value.path}
			class={cn(
				'min-w-0 flex-1 truncate border border-r outline-none',
				'rounded-l-xl',
				inputFieldSurface,
				inputFieldDisabled,
				inputSizeClasses.md,
				segmentBorder
			)}
			aria-invalid={error ? true : undefined}
			role={variables.length > 0 ? 'combobox' : undefined}
			aria-autocomplete={variables.length > 0 ? 'list' : undefined}
			aria-expanded={variables.length > 0
				? showSuggestions && activeField === 'path' && filteredVariables.length > 0
				: undefined}
			aria-controls={variables.length > 0 ? `${id}-listbox` : undefined}
			aria-activedescendant={showSuggestions &&
			activeField === 'path' &&
			filteredVariables.length > 0
				? `${id}-option-${highlightedIndex}`
				: undefined}
			oninput={variables.length > 0 ? pathHandlers.handleInput : undefined}
			onkeydown={variables.length > 0 ? pathHandlers.handleKeydown : undefined}
			onblur={variables.length > 0 ? pathHandlers.handleBlur : undefined}
			onfocus={variables.length > 0 ? () => updateSuggestions('path') : undefined}
			onclick={variables.length > 0 ? () => updateSuggestions('path') : undefined}
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
					'flex min-w-0 items-center rounded-r-xl border border-l-0 px-3 text-dark-500 select-none',
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
				bind:this={valueInputElement}
				placeholder={valuePlaceholder}
				bind:value={value.value}
				class={cn(
					'min-w-0 flex-1 truncate rounded-r-xl border outline-none',
					inputFieldSurface,
					inputFieldDisabled,
					inputSizeClasses.md,
					segmentBorder
				)}
				aria-invalid={error ? true : undefined}
				role={variables.length > 0 ? 'combobox' : undefined}
				aria-autocomplete={variables.length > 0 ? 'list' : undefined}
				aria-expanded={variables.length > 0
					? showSuggestions && activeField === 'value' && filteredVariables.length > 0
					: undefined}
				aria-controls={variables.length > 0 ? `${id}-listbox` : undefined}
				aria-activedescendant={showSuggestions &&
				activeField === 'value' &&
				filteredVariables.length > 0
					? `${id}-option-${highlightedIndex}`
					: undefined}
				oninput={variables.length > 0 ? valueHandlers.handleInput : undefined}
				onkeydown={variables.length > 0 ? valueHandlers.handleKeydown : undefined}
				onblur={variables.length > 0 ? valueHandlers.handleBlur : undefined}
				onfocus={variables.length > 0 ? () => updateSuggestions('value') : undefined}
				onclick={variables.length > 0 ? () => updateSuggestions('value') : undefined}
			/>
		{/if}

		{#if showSuggestions && filteredVariables.length > 0}
			<ul
				id={`${id}-listbox`}
				class="absolute top-full left-0 z-[100] mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md"
				role="listbox"
			>
				{#each filteredVariables as variable, index (variable.key)}
					<li role="presentation">
						<button
							type="button"
							role="option"
							id={`${id}-option-${index}`}
							aria-selected={index === highlightedIndex}
							class={cn(
								'flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50',
								index === highlightedIndex && 'bg-dark-700'
							)}
							onmousedown={(event) => {
								event.preventDefault();
								insertVariable(variable.key, activeField);
							}}
						>
							<span>{`{${variable.key}}`}</span>
							<span class="text-dark-300">{variable.label}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
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
