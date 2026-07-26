<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		value: number;
		max?: number;
		size?: 'sm' | 'md';
		interactive?: boolean;
		disabled?: boolean;
		onChange?: (value: number) => void;
		label?: string;
	};

	let {
		value = 0,
		max = 5,
		size = 'sm',
		interactive = false,
		disabled = false,
		onChange,
		label = 'Rating'
	}: Props = $props();

	let hoverValue = $state(0);

	const iconClass = $derived(size === 'md' ? 'size-5' : 'size-3.5');
	const displayValue = $derived(hoverValue || value);

	function starFill(index: number): 'full' | 'half' | 'empty' {
		if (displayValue >= index) return 'full';
		if (displayValue >= index - 0.5) return 'half';
		return 'empty';
	}
</script>

{#if interactive}
	<div
		class="inline-flex items-center gap-0.5"
		role="radiogroup"
		aria-label={label}
		aria-disabled={disabled}
	>
		{#each Array.from({ length: max }, (_, i) => i + 1) as star (star)}
			<button
				type="button"
				class="cursor-pointer rounded p-0.5 text-warning-300 transition-colors hover:text-warning-200 disabled:cursor-not-allowed disabled:opacity-50"
				role="radio"
				aria-checked={value === star}
				aria-label={`${star} star${star === 1 ? '' : 's'}`}
				disabled={disabled}
				onmouseenter={() => {
					if (!disabled) hoverValue = star;
				}}
				onmouseleave={() => {
					hoverValue = 0;
				}}
				onclick={() => onChange?.(star)}
			>
				<Icon
					icon={starFill(star) === 'empty' ? 'mdi:star-outline' : 'mdi:star'}
					class={iconClass}
				/>
			</button>
		{/each}
	</div>
{:else}
	<div class="inline-flex items-center gap-0.5 text-warning-300" aria-label={`${value} out of ${max} stars`}>
		{#each Array.from({ length: max }, (_, i) => i + 1) as star (star)}
			{@const fill = starFill(star)}
			<Icon
				icon={fill === 'full' ? 'mdi:star' : fill === 'half' ? 'mdi:star-half-full' : 'mdi:star-outline'}
				class={iconClass}
			/>
		{/each}
	</div>
{/if}
