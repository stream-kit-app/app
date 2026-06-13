<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { watch } from 'runed';

	import SortableChainItem from './sortable-chain-item.svelte';
	import { applyDndMove, type DndDragEvent } from './dnd-events';

	type ChainEntry = {
		id: string;
		item: T;
	};

	type Props = {
		items: T[];
		getId: (item: T) => string;
		getLabel: (item: T) => string;
		sortableType: string;
		onReorder: (items: T[]) => void;
		itemContent: Snippet<[item: T]>;
	};

	let { items, getId, getLabel, sortableType, onReorder, itemContent }: Props = $props();

	const sensors = [KeyboardSensor, PointerSensor];

	let list = $state<ChainEntry[]>([]);
	let isDragging = $state(false);

	function toEntries(source: T[]): ChainEntry[] {
		return source.map((item) => ({ id: getId(item), item }));
	}

	// Mirror external items into the local drag list, but never while dragging so
	// in-progress reordering isn't clobbered by an upstream update.
	watch(
		() => items,
		(currentItems) => {
			if (isDragging) {
				return;
			}

			list = toEntries(currentItems);
		}
	);

	function handleDragStart(): void {
		isDragging = true;
	}

	function handleDragOver(event: DndDragEvent): void {
		list = applyDndMove(list, event);
	}

	function handleDragEnd(): void {
		isDragging = false;

		const reordered = list.map((entry) => entry.item);
		const orderChanged =
			reordered.length !== items.length ||
			reordered.some((item, index) => getId(item) !== getId(items[index]));

		if (orderChanged) {
			onReorder(reordered);
		}
	}
</script>

<DragDropProvider
	{sensors}
	onDragStart={handleDragStart}
	onDragOver={handleDragOver}
	onDragEnd={handleDragEnd}
>
	<div class="grid gap-3">
		{#each list as entry, index (entry.id)}
			<SortableChainItem
				id={entry.id}
				{index}
				{sortableType}
				group={sortableType}
				label={getLabel(entry.item)}
			>
				{#snippet children()}
					{@render itemContent(entry.item)}
				{/snippet}
			</SortableChainItem>
		{/each}
	</div>

	<DragOverlay>
		{#snippet children(source)}
			{@const entry = list.find((item) => item.id === source.id)}
			{#if entry}
				<SortableChainItem
					id={entry.id}
					index={0}
					{sortableType}
					group={sortableType}
					label={getLabel(entry.item)}
					isOverlay
				>
					{#snippet children()}
						{@render itemContent(entry.item)}
					{/snippet}
				</SortableChainItem>
			{/if}
		{/snippet}
	</DragOverlay>
</DragDropProvider>
