<script lang="ts">
	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';
	import { Eyebrow } from '../blueprint';

	type Props = {
		value: string | number;
		/** Optional denominator rendered muted after the value (`3 / 12`). */
		total?: string | number;
		label?: string;
		hint?: string;
		href?: string;
		class?: string;
	};

	let { value, total, label, hint, href, class: className }: Props = $props();
</script>

{#snippet content()}
	{#if label}
		<Eyebrow>{label}</Eyebrow>
	{/if}
	<p class={cn('flex items-baseline gap-1.5 font-mono tabular-nums', label && 'mt-2.5')}>
		<span class="text-2xl leading-none font-semibold text-dark-50">{value}</span>
		{#if total !== undefined}
			<span class="text-sm leading-none text-dark-400">/ {total}</span>
		{/if}
	</p>
	{#if hint}
		<p class="mt-2 flex items-center gap-1 text-xs text-dark-300">
			<span class="truncate">{hint}</span>
			{#if href}
				<Icon
					icon="ri:arrow-right-s-line"
					class="size-3.5 shrink-0 -translate-x-0.5 opacity-0 transition group-hover/stat:translate-x-0 group-hover/stat:opacity-100"
					aria-hidden="true"
				/>
			{/if}
		</p>
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		class={cn(
			'group/stat -m-2 block min-w-0 rounded-md p-2 transition-colors hover:bg-dark-700/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
			className
		)}
	>
		{@render content()}
	</a>
{:else}
	<div class={cn('min-w-0', className)}>
		{@render content()}
	</div>
{/if}
