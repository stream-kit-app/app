<script lang="ts">
	import type { PageBlock } from '../types';
	import type { Snippet } from 'svelte';

	import { Panel } from '../../components/blueprint';
	import { Heading } from '../../components/heading';

	type Props = {
		block: Extract<PageBlock, { type: 'card' }>;
		renderBlock: Snippet<[PageBlock]>;
	};

	let { block, renderBlock }: Props = $props();
</script>

<Panel tone="solid" class="p-5">
	{#if block.title || block.description}
		<header class="mb-4 flex flex-col gap-1">
			{#if block.title}
				<Heading level="3">{block.title}</Heading>
			{/if}
			{#if block.description}
				<p class="text-sm text-dark-100">{block.description}</p>
			{/if}
		</header>
	{/if}
	<div class="flex flex-col gap-4">
		{#each block.blocks as child, index (`card-${index}`)}
			{@render renderBlock(child)}
		{/each}
	</div>
</Panel>
