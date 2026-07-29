<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '../../utils';

	import Crosshair from './crosshair.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		crosshairs?: boolean;
	};

	let { crosshairs = true, class: className, ...restProps }: Props = $props();
</script>

<div
	aria-hidden="true"
	class={cn('relative h-px w-full bg-rule', className)}
	{...restProps}
>
	{#if crosshairs}
		<Crosshair position="top-left" size="sm" class="left-0" />
		<Crosshair position="top-right" size="sm" class="right-0" />
	{/if}
</div>
