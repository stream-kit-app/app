<script lang="ts">
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';

	import { inputFieldErrorMessage } from './input-field-classes';
	import Label from './label.svelte';

	type Props = {
		id?: string;
		label?: string;
		min?: number;
		max?: number;
		step?: number;
		value?: number;
		unit?: string;
		error?: string;
		onvaluechange?: (value: number) => void;
	};

	let {
		label,
		id = useId(),
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(0),
		unit = '%',
		error,
		onvaluechange
	}: Props = $props();
</script>

<div class={cn('grid w-full gap-2')}>
	{#if label}
		<div class="flex items-center justify-between gap-4">
			<Label for={id}>{label}</Label>
			<span class="text-sm text-dark-100">{value}{unit}</span>
		</div>
	{/if}
	<input
		{id}
		type="range"
		{min}
		{max}
		{step}
		bind:value
		oninput={() => onvaluechange?.(value)}
		class={cn(
			'h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary',
			error && 'ring-1 ring-destructive'
		)}
	/>
	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
