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
	import { getHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';

	type ChainEntry = {
		id: string;
		item: T;
	};

	type Props = {
		items: T[];
		getId: (item: T) => string;
		getLabel: (item: T) => string;
		sortableType: string;
		containerKey?: string;
		onReorder?: (items: T[]) => void;
		itemContent: Snippet<[item: T]>;
		itemTrailingContent?: Snippet<[item: T]>;
		t?: TranslateFn;
	};

	let {
		items,
		getId,
		getLabel,
		sortableType,
		containerKey,
		onReorder,
		itemContent,
		itemTrailingContent,
		t
	}: Props = $props();

	const handlerChainDnd = getHandlerChainDndContext();
	const isConnected = $derived(handlerChainDnd != null && containerKey != null);
	const group = $derived(containerKey ?? sortableType);

	const sensors = [KeyboardSensor, PointerSensor];

	let list = $state<ChainEntry[]>([]);
	let isDragging = $state(false);

	function toEntries(source: T[]): ChainEntry[] {
		return source.map((item) => ({ id: getId(item), item }));
	}

	const connectedEntries = $derived.by(() => {
		if (!isConnected || !containerKey) {
			return [] as ChainEntry[];
		}

		const entries = handlerChainDnd!.layout()[containerKey] ?? [];

		return entries.map((entry) => ({
			id: entry.id,
			item: entry.handler as T
		}));
	});

	const visibleEntries = $derived(isConnected ? connectedEntries : list);

	watch(
		() => items,
		(currentItems) => {
			if (isConnected || isDragging) {
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

		if (!onReorder) {
			return;
		}

		const reordered = list.map((entry) => entry.item);
		const orderChanged =
			reordered.length !== items.length ||
			reordered.some((item, index) => getId(item) !== getId(items[index]));

		if (orderChanged) {
			onReorder(reordered);
		}
	}
</script>

{#snippet renderItem(entry: ChainEntry, index: number, overlay: boolean)}
	{#if itemTrailingContent}
		{#snippet trailing()}
			{@render itemTrailingContent(entry.item)}
		{/snippet}
		<SortableChainItem
			id={entry.id}
			{index}
			sortableType={isConnected ? 'handler' : sortableType}
			{group}
			label={getLabel(entry.item)}
			isOverlay={overlay}
			{t}
			trailingContent={trailing}
		>
			{#snippet children()}
				{@render itemContent(entry.item)}
			{/snippet}
		</SortableChainItem>
	{:else}
		<SortableChainItem
			id={entry.id}
			{index}
			sortableType={isConnected ? 'handler' : sortableType}
			{group}
			label={getLabel(entry.item)}
			isOverlay={overlay}
			{t}
		>
			{#snippet children()}
				{@render itemContent(entry.item)}
			{/snippet}
		</SortableChainItem>
	{/if}
{/snippet}

{#if isConnected}
	<div class="grid gap-3">
		{#each visibleEntries as entry, index (entry.id)}
			{@render renderItem(entry, index, false)}
		{/each}
	</div>
{:else}
	<DragDropProvider
		{sensors}
		onDragStart={handleDragStart}
		onDragOver={handleDragOver}
		onDragEnd={handleDragEnd}
	>
		<div class="grid gap-3">
			{#each visibleEntries as entry, index (entry.id)}
				{@render renderItem(entry, index, false)}
			{/each}
		</div>

		<DragOverlay>
			{#snippet children(source)}
				{@const entry = list.find((item) => item.id === source.id)}
				{#if entry}
					{@render renderItem(entry, 0, true)}
				{/if}
			{/snippet}
		</DragOverlay>
	</DragDropProvider>
{/if}
