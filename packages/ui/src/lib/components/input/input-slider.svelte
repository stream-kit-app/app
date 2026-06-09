<script lang="ts">
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';

	import Label from './label.svelte';

	type Props = {
		id?: string;
		label?: string;
		min?: number;
		max?: number;
		step?: number;
		value?: number;
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
		error,
		onvaluechange
	}: Props = $props();
</script>

<div class={cn('grid w-full gap-2')}>
	{#if label}
		<div class="flex items-center justify-between gap-4">
			<Label for={id}>{label}</Label>
			<span class="text-sm text-dark-100">{value}%</span>
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
			error && 'ring-1 ring-red-500'
		)}
	/>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
