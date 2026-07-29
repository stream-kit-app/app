<script lang="ts">
	import { useId } from 'bits-ui';
	import ColorPicker from 'svelte-awesome-color-picker';

	import { cn } from '../../utils';
	import {
		inputFieldAdornmentBorder,
		inputFieldBorder,
		inputFieldDisabled,
		inputFieldErrorMessage,
		inputFieldFocusRing,
		inputFieldGroup,
		inputFieldSurface
	} from './input-field-classes';
	import {
		inputAdornmentSizeClasses,
		inputPaddingClasses,
		inputShellSizeClasses
	} from './input-size-classes';
	import InputColorTrigger from './input-color-trigger.svelte';
	import Label from './label.svelte';

	const HEX_SHORT = /^#([0-9a-fA-F]{3})$/;
	const HEX_FULL = /^#([0-9a-fA-F]{6})$/;
	const HEX_WITH_ALPHA = /^#([0-9a-fA-F]{8})$/;

	function normalizeHex(hex: string): string | null {
		const trimmed = hex.trim();
		const short = HEX_SHORT.exec(trimmed);
		if (short) {
			const [r, g, b] = short[1];
			return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
		}
		const full = HEX_FULL.exec(trimmed);
		if (full) {
			return trimmed.toLowerCase();
		}
		const withAlpha = HEX_WITH_ALPHA.exec(trimmed);
		if (withAlpha) {
			return `#${withAlpha[1].slice(0, 6)}`.toLowerCase();
		}
		return null;
	}

	type Props = {
		label?: string;
		id?: string;
		value?: string;
		error?: string;
		defaultValue?: string;
		onvaluechange?: (value: string) => void;
		class?: string;
	};

	let {
		label,
		id = useId(),
		value = $bindable(''),
		error,
		defaultValue = '#000000',
		onvaluechange,
		class: className
	}: Props = $props();

	const pickerHex = $derived(
		normalizeHex(value ?? '') ?? normalizeHex(defaultValue) ?? '#000000'
	);

	function setHex(next: string | null | undefined) {
		if (!next) {
			return;
		}

		const normalized = normalizeHex(next);
		if (!normalized || normalized === value) {
			return;
		}

		value = normalized;
		onvaluechange?.(normalized);
	}

	function handleTextInput(event: Event) {
		const next = (event.currentTarget as HTMLInputElement).value;
		value = next;
		onvaluechange?.(next);
	}
</script>

<div class={cn('input-color grid w-full min-w-0 gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'relative flex w-full min-w-0 items-stretch rounded-lg',
			inputFieldGroup,
			inputShellSizeClasses.md,
			inputFieldFocusRing(error)
		)}
	>
		<div
			class={cn(
				'color-picker-slot grid h-full place-items-center rounded-l-lg border transition-colors',
				inputFieldAdornmentBorder(error),
				inputFieldSurface,
				inputAdornmentSizeClasses.md
			)}
		>
			<ColorPicker
				hex={pickerHex}
				label={label ?? 'Color'}
				isAlpha={false}
				isTextInput={true}
				textInputModes={['hex']}
				position="responsive"
				components={{ input: InputColorTrigger }}
				onInput={({ hex }) => setHex(hex)}
				--picker-z-index="100"
				--input-size="1.25rem"
				--cp-bg-color="var(--color-dark-800, #1a1b1e)"
				--cp-border-color="var(--color-dark-500, #3f3f46)"
				--cp-text-color="var(--color-dark-50, #f4f4f5)"
				--cp-input-color="var(--color-dark-700, #27272a)"
				--cp-button-hover-color="var(--color-dark-600, #3f3f46)"
				--focus-color="var(--color-ring, #6366f1)"
			/>
		</div>
		<input
			{id}
			type="text"
			spellcheck="false"
			autocomplete="off"
			aria-invalid={error ? true : undefined}
			placeholder={defaultValue}
			{value}
			oninput={handleTextInput}
			class={cn(
				'box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border border-l-0 outline-none transition-colors',
				'rounded-l-none rounded-r-lg',
				inputFieldSurface,
				inputFieldDisabled,
				inputPaddingClasses.md,
				inputFieldBorder(error)
			)}
		/>
	</div>
	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>

<style>
	.color-picker-slot :global(> span) {
		display: block;
		height: 100%;
	}

	.color-picker-slot :global([role='dialog']) {
		top: calc(100% + 0.5rem);
		margin: 0;
	}

	.input-color :global(.wrapper) {
		border-radius: 0.25rem;
	}
</style>
