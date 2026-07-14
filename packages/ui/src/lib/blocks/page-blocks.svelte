<script lang="ts">
	import type { PageBlock as PageBlockDefinition, PageFormBlock } from './types';
	import type { Snippet } from 'svelte';

	import { Container } from '../components/container';
	import { Heading } from '../components/heading';

	import PageBlockRenderer from './page-block.svelte';

	type Props = {
		title?: string;
		description?: string;
		blocks: PageBlockDefinition[];
		renderForm?: Snippet<[PageFormBlock]>;
		showTitle?: boolean;
	};

	let { title, description, blocks, renderForm, showTitle = true }: Props = $props();
</script>

<Container class="px-6 py-6">
	<div class="flex max-w-5xl flex-col gap-6">
		{#if showTitle && (title || description)}
			<header class="flex flex-col gap-2">
				{#if title}
					<Heading level="1" subTitle={description}>{title}</Heading>
				{:else if description}
					<p class="text-dark-100">{description}</p>
				{/if}
			</header>
		{/if}

		<div class="flex flex-col gap-5">
			{#each blocks as block (block)}
				<PageBlockRenderer {block} {renderForm} />
			{/each}
		</div>
	</div>
</Container>
