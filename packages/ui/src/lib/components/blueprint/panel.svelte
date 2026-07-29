<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	import Crosshair from './crosshair.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
		header?: Snippet;
		crosshairs?: boolean;
	};

	let {
		crosshairs = false,
		header,
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<div
	class={cn('relative rounded-none border border-rule bg-dark-900/40', className)}
	{...restProps}
>
	{#if crosshairs}
		<Crosshair position="top-left" size="sm" />
		<Crosshair position="top-right" size="sm" />
		<Crosshair position="bottom-left" size="sm" />
		<Crosshair position="bottom-right" size="sm" />
	{/if}
	{#if header}
		<div class="border-b border-rule px-5 py-3">
			{@render header()}
		</div>
	{/if}
	{@render children?.()}
</div>
