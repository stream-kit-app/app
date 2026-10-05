<script lang="ts">
	import type { DndDragEvent } from '#lib/components/core/action/dnd-events.js';
	import type { DndWidgetItem } from '#lib/core/dashboard/dashboard-layout.js';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { watch } from 'runed';

	import { applyDndMove } from '#lib/components/core/action/dnd-events.js';
	import DashboardAddTile from '#lib/components/core/dashboard/dashboard-add-tile.svelte';
	import DashboardWidgetCard from '#lib/components/core/dashboard/dashboard-widget-card.svelte';
	import DashboardWidgetItem from '#lib/components/core/dashboard/dashboard-widget-item.svelte';
	import { app } from '#lib/core/index.js';
	import {
		buildLayoutUpdates,
		compareLayoutUpdates,
		instancesFromDndItems,
		toDndWidgetItems
	} from '#lib/core/dashboard/dashboard-layout.js';
	import { useI18n } from '#lib/i18n.js';

	type Props = {
		onAddWidget?: () => void;
	};

	const SORTABLE_TYPE = 'dashboard-widget';

	let { onAddWidget }: Props = $props();

	const { t } = useI18n();

	const sensors = [KeyboardSensor, PointerSensor];

	let list = $state<DndWidgetItem[]>([]);
	let isDragging = $state(false);
	let isSavingLayout = $state(false);

	const canAddWidgets = $derived(app.dashboard.getAddableDefinitions(app).length > 0);

	const sortedInstances = $derived(
		[...app.dashboard.instances].sort(
			(left, right) => left.sortOrder - right.sortOrder || left.id - right.id
		)
	);

	watch(
		() => sortedInstances,
		(instances) => {
			if (isDragging) {
				return;
			}

			list = toDndWidgetItems(instances);
		}
	);

	function handleDragStart(): void {
		isDragging = true;
	}

	function handleDragOver(event: DndDragEvent): void {
		list = applyDndMove(list, event);
	}

	async function handleDragEnd(): Promise<void> {
		isDragging = false;

		const instances = instancesFromDndItems(list);
		const updates = buildLayoutUpdates(instances);
		const current = buildLayoutUpdates(app.dashboard.instances);

		if (compareLayoutUpdates(updates, current) || isSavingLayout) {
			return;
		}

		isSavingLayout = true;

		try {
			await app.dashboard.applyLayout(updates);
		} finally {
			isSavingLayout = false;
		}
	}

	async function handleRemove(id: number): Promise<void> {
		const definition = app.dashboard.resolveDefinition(
			app.dashboard.instances.find((instance) => instance.id === id)?.definitionId ?? ''
		);

		const confirmed = await app.confirm.ask({
			title: t('Remove widget?'),
			description: t('Remove "{name}" from your dashboard?', {
				name: definition ? t(definition.title) : t('Widget')
			}),
			confirmLabel: t('Remove'),
			cancelLabel: t('Cancel')
		});

		if (!confirmed) {
			return;
		}

		await app.dashboard.removeInstance(id);
	}

	async function handleColumnsChange(id: number, columns: 1 | 2): Promise<void> {
		await app.dashboard.setColumns(id, columns);
	}
</script>

<!--
	Masonry: tiny implicit rows + per-card row spans (`masonryItem` on the card).
	Column count follows the dashboard width via container queries.
-->
<div class="@container/dashboard relative">
	{#if isDragging}
		<div
			class="boot-grid pointer-events-none absolute -inset-2 rounded-xl opacity-30"
			aria-hidden="true"
		></div>
	{/if}

	<DragDropProvider
		{sensors}
		onDragStart={handleDragStart}
		onDragOver={handleDragOver}
		onDragEnd={() => void handleDragEnd()}
	>
		<div
			class="relative grid auto-rows-[4px] grid-cols-1 gap-x-4 @2xl/dashboard:grid-cols-2 @6xl/dashboard:grid-cols-3 @[108rem]/dashboard:grid-cols-4"
		>
			{#each list as entry, index (entry.id)}
				{@const definition = app.dashboard.resolveDefinition(entry.instance.definitionId)}
				{@const unavailable =
					definition != null && !app.dashboard.isDefinitionAvailable(definition, app)}
				<DashboardWidgetItem
					id={entry.id}
					{index}
					item={entry}
					{definition}
					{unavailable}
					sortableType={SORTABLE_TYPE}
					onRemove={() => void handleRemove(entry.instance.id)}
					onColumnsChange={(columns) =>
						void handleColumnsChange(entry.instance.id, columns)}
				/>
			{/each}

			{#if canAddWidgets}
				<DashboardAddTile onclick={() => onAddWidget?.()} />
			{/if}
		</div>

		<DragOverlay>
			{#snippet children(source)}
				{@const entry = list.find((item) => item.id === source.id)}
				{#if entry}
					{@const definition = app.dashboard.resolveDefinition(
						entry.instance.definitionId
					)}
					<DashboardWidgetCard instance={entry.instance} {definition} isOverlay={true} />
				{/if}
			{/snippet}
		</DragOverlay>
	</DragDropProvider>
</div>
