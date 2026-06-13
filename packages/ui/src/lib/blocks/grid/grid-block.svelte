<script lang="ts">
	import type { PageBlock } from '../types';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	type Props = {
		block: Extract<PageBlock, { type: 'grid' }>;
		renderBlock: Snippet<[PageBlock]>;
	};

	let { block, renderBlock }: Props = $props();
</script>

<div
	class={cn({
		'grid gap-4': block.columns === 1,
		'grid gap-4 md:grid-cols-2': block.columns === 2,
		'grid gap-4 md:grid-cols-3': block.columns === 3
	})}
>
	{#each block.blocks as child (child)}
		{@render renderBlock(child)}
	{/each}
</div>
