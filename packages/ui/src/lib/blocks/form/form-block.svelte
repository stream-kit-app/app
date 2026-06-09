<script lang="ts">
	import type { PageFormBlock } from '../types';
	import type { Snippet } from 'svelte';

	type Props = {
		block: PageFormBlock;
		renderForm?: Snippet<[PageFormBlock]>;
	};

	let { block, renderForm }: Props = $props();
</script>

{#if renderForm}
	{@render renderForm(block)}
{/if}
