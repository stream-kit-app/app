<script lang="ts">
	import type { HandlerFieldVariable } from '../../types';
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		KeyboardEventHandler
	} from 'svelte/elements';

	import { useId } from 'bits-ui';
	import { onDestroy } from 'svelte';

	import { cn } from '../../utils';

	import { inputSizeClasses } from './input-size-classes';
	import Label from './label.svelte';

	type Props = {
		label?: string;
		variables?: HandlerFieldVariable[];
		value?: string;
		error?: string;
		oninput?: FormEventHandler<HTMLInputElement>;
	} & Omit<HTMLInputAttributes, 'value' | 'oninput'>;

	let {
		label,
		variables = [],
		value = $bindable(''),
		error,
		oninput,
		id = useId(),
		placeholder,
		class: className,
		...props
	}: Props = $props();

	let inputElement = $state<HTMLInputElement | null>(null);
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
		if (!inputElement) {
			return null;
		}

		const cursor = inputElement.selectionStart ?? value.length;
		const beforeCursor = value.slice(0, cursor);
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

		if (!partial || !inputElement) {
			return;
		}

		const cursor = inputElement.selectionStart ?? value.length;
		const before = value.slice(0, partial.start);
		const after = value.slice(cursor);
		value = `${before}{${variableKey}}${after}`;
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

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		oninput?.(event);
		updateSuggestions();
	};

	const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
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

	let blurTimeout: ReturnType<typeof setTimeout> | undefined;

	const handleBlur = () => {
		if (blurTimeout) {
			clearTimeout(blurTimeout);
		}

		blurTimeout = setTimeout(() => {
			showSuggestions = false;
			blurTimeout = undefined;
		}, 120);
	};

	onDestroy(() => {
		if (blurTimeout) {
			clearTimeout(blurTimeout);
		}
	});
</script>

<div class="relative grid w-full min-w-0 gap-2">
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'relative flex w-full min-w-0 items-center rounded-xl',
			'has-focus-within:ring-2 has-focus-within:ring-primary',
			error && 'has-focus-within:ring-red-500',
			className
		)}
	>
		<input
			bind:this={inputElement}
			{id}
			{placeholder}
			bind:value
			class={cn(
				'min-w-0 w-full truncate rounded-xl border bg-dark-700 text-dark-50 outline-none',
				inputSizeClasses.md,
				error ? 'border-red-500' : 'border-dark-500'
			)}
			role="combobox"
			aria-invalid={error ? true : undefined}
			aria-autocomplete="list"
			aria-expanded={showSuggestions && filteredVariables.length > 0}
			aria-controls={`${id}-listbox`}
			aria-activedescendant={showSuggestions && filteredVariables.length > 0
				? `${id}-option-${highlightedIndex}`
				: undefined}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onblur={handleBlur}
			onfocus={updateSuggestions}
			onclick={updateSuggestions}
			{...props}
		/>

		{#if showSuggestions && filteredVariables.length > 0}
			<ul
				id={`${id}-listbox`}
				class="absolute top-full left-0 z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md"
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
	</div>

	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
