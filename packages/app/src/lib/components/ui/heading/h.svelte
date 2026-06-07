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
		'font-bold',
		{
			'text-2xl': level == 1,
			'text-xl': level == 2,
			'text-lg': level == 3,
			'text-base': level == 4,
			'text-sm': level == 5,
			'text-xs': level == 6
		},
		props.class
	)}
>
	{@render children?.({ level })}
	{#if subTitle}
		<p class="mt-2 text-base font-normal text-dark-100">{subTitle}</p>
	{/if}
</svelte:element>
