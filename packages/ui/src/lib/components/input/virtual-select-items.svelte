<script lang="ts">
	import type { SelectItem } from '../../types';
	import type { Snippet } from 'svelte';

	import { getVirtualListSlice, shouldVirtualizeList } from './select-dropdown-limits';

	type Props = {
		items: SelectItem[];
		scrollTop: number;
		item: Snippet<[SelectItem]>;
	};

	let { items, scrollTop, item }: Props = $props();

	const useVirtualList = $derived(shouldVirtualizeList(items.length));
	const virtualSlice = $derived(useVirtualList ? getVirtualListSlice(items, scrollTop) : null);
	const renderedItems = $derived(useVirtualList && virtualSlice ? virtualSlice.items : items);
</script>

{#if useVirtualList && virtualSlice}
	<div style:height={`${virtualSlice.totalHeight}px`} class="relative w-full">
		<div
			class="absolute inset-x-0 top-0"
			style:transform={`translateY(${virtualSlice.offsetY}px)`}
		>
			{#each renderedItems as listItem (listItem.value)}
				{@render item(listItem)}
			{/each}
		</div>
	</div>
{:else}
	{#each renderedItems as listItem (listItem.value)}
		{@render item(listItem)}
	{/each}
{/if}
