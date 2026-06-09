<script lang="ts">
	import type { PageBlock as PageBlockDefinition, PageFormBlock } from './types';
	import type { Snippet } from 'svelte';

	import { AlertBlock } from './alert';
	import { BadgeBlock } from './badge';
	import { ButtonBlock } from './button';
	import { CardBlock } from './card';
	import { FormBlock } from './form';
	import { GridBlock } from './grid';
	import { HeadingBlock } from './heading';
	import PageBlockRenderer from './page-block.svelte';
	import { StackBlock } from './stack';
	import { TextBlock } from './text';

	type Props = {
		block: PageBlockDefinition;
		renderForm?: Snippet<[PageFormBlock]>;
	};

	let { block, renderForm }: Props = $props();
</script>

{#snippet renderBlock(child: PageBlockDefinition)}
	<PageBlockRenderer block={child} {renderForm} />
{/snippet}

{#if block.type === 'heading'}
	<HeadingBlock {block} />
{:else if block.type === 'text'}
	<TextBlock {block} />
{:else if block.type === 'alert'}
	<AlertBlock {block} />
{:else if block.type === 'badge'}
	<BadgeBlock {block} />
{:else if block.type === 'card'}
	<CardBlock {block} {renderBlock} />
{:else if block.type === 'stack'}
	<StackBlock {block} {renderBlock} />
{:else if block.type === 'grid'}
	<GridBlock {block} {renderBlock} />
{:else if block.type === 'button'}
	<ButtonBlock {block} />
{:else if block.type === 'form'}
	<FormBlock {block} {renderForm} />
{/if}
