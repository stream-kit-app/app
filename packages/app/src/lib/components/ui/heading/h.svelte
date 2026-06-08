<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		level: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
		subTitle?: string;
		children?: Snippet<[{ level: number | string }]>;
	};

	const { level, subTitle, children, ...props }: Props = $props();
</script>

<svelte:element
	this={`h${level}`}
	{...props}
	class={cn(
		{
			'font-outfit text-4xl font-semibold': level == 1,
			'text-xl font-bold': level == 2,
			'text-lg font-bold': level == 3,
			'text-base font-bold': level == 4,
			'text-sm font-bold': level == 5,
			'text-xs font-bold': level == 6
		},
		props.class
	)}
>
	{@render children?.({ level })}
	{#if subTitle}
		<p class="mt-2 text-base font-normal text-dark-100">{subTitle}</p>
	{/if}
</svelte:element>
