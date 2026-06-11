<script lang="ts">
	import type { HandlerFieldVariable, SelectItemsSource } from '../../types';
	import type { WithoutChildren } from 'bits-ui';
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		KeyboardEventHandler
	} from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { Select, useId } from 'bits-ui';

	import { cn } from '../../utils';
	import { Button } from '../button';
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
		pathPlaceholder,
		valuePlaceholder,
		selectPlaceholder,
		loadingPlaceholder,
		variables = [],
		id = useId(),
		class: className,
		selectClass,
		contentProps,
		error,
		value = $bindable({ path: '', type: 'equals', value: '' }),
		...props
	}: Props = $props();

	const resolvedSelectPlaceholder = $derived(selectPlaceholder ?? 'Select');
	const resolvedLoadingPlaceholder = $derived(loadingPlaceholder ?? 'Loading...');

	const resolvedItems = resolveSelectItems(() => itemsSource);

	let valueInputElement = $state<HTMLInputElement | null>(null);
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

	function getPartialVariable(): { start: number; partial: string } | null {
		if (!valueInputElement) {
			return null;
		}

		const text = value.value;
		const cursor = valueInputElement.selectionStart ?? text.length;
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

	function updateSuggestions(): void {
		const partial = getPartialVariable();

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

	function insertVariable(variableKey: string): void {
		const partial = getPartialVariable();

		if (!partial || !valueInputElement) {
			return;
		}

		const text = value.value;
		const cursor = valueInputElement.selectionStart ?? text.length;
		const before = text.slice(0, partial.start);
		const after = text.slice(cursor);
		value = { ...value, value: `${before}{${variableKey}}${after}` };
		showSuggestions = false;
		suggestionFilter = '';

		queueMicrotask(() => {
			if (!valueInputElement) {
				return;
			}

			const nextCursor = before.length + variableKey.length + 2;
			valueInputElement.focus();
			valueInputElement.setSelectionRange(nextCursor, nextCursor);
		});
	}

	function insertVariableAtCursor(variableKey: string): void {
		const text = value.value;

		if (!valueInputElement) {
			value = { ...value, value: `${text}{${variableKey}}` };
			return;
		}

		const cursor = valueInputElement.selectionStart ?? text.length;
		const before = text.slice(0, cursor);
		const after = text.slice(cursor);
		value = { ...value, value: `${before}{${variableKey}}${after}` };

		queueMicrotask(() => {
			const nextCursor = before.length + variableKey.length + 2;
			valueInputElement?.focus();
			valueInputElement?.setSelectionRange(nextCursor, nextCursor);
		});
	}

	const handleValueInput: FormEventHandler<HTMLInputElement> = () => {
		updateSuggestions();
	};

	const handleValueKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (!showSuggestions || filteredVariables.length === 0) {
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
				insertVariable(variable.key);
			}
			return;
		}

		if (event.key === 'Escape') {
			showSuggestions = false;
		}
	};

	const handleValueBlur = () => {
		setTimeout(() => {
			showSuggestions = false;
		}, 120);
	};

	const segmentBorder = $derived(error ? 'border-red-500' : 'border-dark-500');
</script>

<div class={cn('relative grid w-full gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'grid grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary',
			error && 'has-focus:ring-red-500'
		)}
	>
		<input
			{id}
			placeholder={pathPlaceholder}
			bind:value={value.path}
			class={cn(
				'min-w-0 flex-1 rounded-l-xl border border-r bg-dark-700 text-dark-50 outline-none',
				inputSizeClasses.md,
				segmentBorder
			)}
			aria-invalid={error ? true : undefined}
			{...props}
		/>
		<Select.Root type="single" items={resolvedItems.items} bind:value={value.type}>
			<Select.Trigger
				class={cn(
					'flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none',
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
						'z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)',
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
		<input
			bind:this={valueInputElement}
			placeholder={valuePlaceholder}
			bind:value={value.value}
			class={cn(
				'min-w-0 flex-1 rounded-r-xl border bg-dark-700 text-dark-50 outline-none',
				inputSizeClasses.md,
				segmentBorder
			)}
			aria-invalid={error ? true : undefined}
			oninput={variables.length > 0 ? handleValueInput : undefined}
			onkeydown={variables.length > 0 ? handleValueKeydown : undefined}
			onblur={variables.length > 0 ? handleValueBlur : undefined}
			onfocus={variables.length > 0 ? updateSuggestions : undefined}
			onclick={variables.length > 0 ? updateSuggestions : undefined}
		/>
	</div>

	{#if variables.length > 0}
		<div class="flex flex-wrap gap-1.5">
			{#each variables as variable (variable.key)}
				<Button
					variant="outline"
					size="xs"
					title={variable.label}
					onclick={() => insertVariableAtCursor(variable.key)}
					class="font-mono text-xs font-normal text-dark-200"
				>
					{`{${variable.key}}`}
				</Button>
			{/each}
		</div>
	{/if}

	{#if showSuggestions && filteredVariables.length > 0}
		<ul
			class="absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md"
			role="listbox"
		>
			{#each filteredVariables as variable, index (variable.key)}
				<li role="presentation">
					<button
						type="button"
						role="option"
						aria-selected={index === highlightedIndex}
						class={cn(
							'flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50',
							index === highlightedIndex && 'bg-dark-700'
						)}
						onmousedown={(event) => {
							event.preventDefault();
							insertVariable(variable.key);
						}}
					>
						<span>{`{${variable.key}}`}</span>
						<span class="text-dark-300">{variable.label}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
