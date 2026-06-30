<script lang="ts">
	import type { PluginWidgetColumns } from '$lib/core/plugins/types';
	import type { DashboardWidgetDefinition } from '$lib/core/dashboard/types';
	import type { DndWidgetItem } from '$lib/core/dashboard/dashboard-layout';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import DashboardWidgetCard from './dashboard-widget-card.svelte';
	import { cn } from '$lib/utils';

	type Props = {
		id: string;
		index: number;
		item: DndWidgetItem;
		definition?: DashboardWidgetDefinition;
		unavailable?: boolean;
		sortableType: string;
		onRemove?: () => void;
		onColumnsChange?: (columns: PluginWidgetColumns) => void;
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
	editMode={true}
	rootRef={ref}
	handleRef={handleRef}
	class={cn(isDragging.current && 'opacity-0')}
	{onRemove}
	{onColumnsChange}
/>
