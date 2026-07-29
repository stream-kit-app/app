<script lang="ts">
	import type { PanelTone } from './panel-variants';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	import Crosshair from './crosshair.svelte';
	import { panelVariants } from './panel-variants';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
		header?: Snippet;
		crosshairs?: boolean;
		tone?: PanelTone;
	};

	let {
		crosshairs = false,
		tone = 'default',
		header,
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<div class={cn(panelVariants({ tone }), className)} {...restProps}>
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
