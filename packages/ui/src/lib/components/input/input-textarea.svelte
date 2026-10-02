<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		inputFieldBorder,
		inputFieldDisabled,
		inputFieldErrorMessage,
		inputFieldFocusRing,
		inputFieldSurface
	} from './input-field-classes';
	import Label from './label.svelte';

	type Props = {
		label?: string;
		error?: string;
	} & HTMLTextareaAttributes;

	let {
		label,
		id = useId(),
		error,
		rows = 4,
		value = $bindable(),
		class: className,
		...props
	}: Props = $props();
</script>

<div class={cn('relative grid w-full min-w-0 gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div class={cn('relative flex w-full min-w-0 rounded-lg', inputFieldFocusRing(error))}>
		<textarea
			{id}
			{rows}
			aria-invalid={error ? true : undefined}
			bind:value
			{...props}
			class={cn(
				'box-border w-full min-w-0 resize-y rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors',
				inputFieldSurface,
				inputFieldDisabled,
				inputFieldBorder(error)
			)}
		></textarea>
	</div>
	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
