<script lang="ts">
	import type { PageBlock } from '../types';
	import type { Snippet } from 'svelte';

	type Props = {
		block: Extract<PageBlock, { type: 'stack' }>;
		renderBlock: Snippet<[PageBlock]>;
	};

	let { block, renderBlock }: Props = $props();
</script>

<div class="flex flex-col gap-4">
	{#each block.blocks as child (child)}
		{@render renderBlock(child)}
	{/each}
</div>
