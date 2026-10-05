<script lang="ts">
	import type { DndWidgetItem } from '#lib/core/dashboard/dashboard-layout.js';
	import type { DashboardWidgetDefinition } from '#lib/core/dashboard/types.js';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import DashboardWidgetCard from './dashboard-widget-card.svelte';

	type Props = {
		id: string;
		index: number;
		item: DndWidgetItem;
		definition?: DashboardWidgetDefinition;
		unavailable?: boolean;
		sortableType: string;
		onRemove?: () => void;
		onColumnsChange?: (columns: 1 | 2) => void;
	};

	let {
		id,
		index,
		item,
		definition,
		unavailable = false,
		sortableType,
		onRemove,
		onColumnsChange
	}: Props = $props();

	const instance = $derived(item.instance);

	const { ref, handleRef, isDragging } = useSortable({
		id: () => id,
		index: () => index,
		type: () => sortableType,
		accept: () => sortableType,
		group: () => sortableType,
		feedback: 'move'
	});
</script>

<DashboardWidgetCard
	{instance}
	{definition}
	{unavailable}
	rootRef={ref}
	{handleRef}
	isPlaceholder={isDragging.current}
	{onRemove}
	{onColumnsChange}
/>
