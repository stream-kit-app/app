<script lang="ts">
	import type { PluginWidgetColumns } from '$lib/core/plugins/types';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { watch } from 'runed';

	import { Alert } from '@stream-kit/ui/alert';

	import { applyDndMove, type DndDragEvent } from '$lib/components/core/action/dnd-events';
	import DashboardEmptyState from '$lib/components/core/dashboard/dashboard-empty-state.svelte';
	import DashboardWidgetCard from '$lib/components/core/dashboard/dashboard-widget-card.svelte';
	import DashboardWidgetItem from '$lib/components/core/dashboard/dashboard-widget-item.svelte';
	import { app } from '$lib/core';
	import {
		buildLayoutUpdates,
		compareLayoutUpdates,
		instancesFromDndItems,
		toDndWidgetItems,
		type DndWidgetItem
	} from '$lib/core/dashboard/dashboard-layout';
	import { useI18n } from '$lib/i18n';

	type Props = {
		editMode?: boolean;
		onAddWidget?: () => void;
	};

	const SORTABLE_TYPE = 'dashboard-widget';

	let { editMode = false, onAddWidget }: Props = $props();

	const { t } = useI18n();

	const sensors = [KeyboardSensor, PointerSensor];

	let list = $state<DndWidgetItem[]>([]);
	let isDragging = $state(false);
	let isSavingLayout = $state(false);

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
		if (!editMode) {
			return;
		}

		list = applyDndMove(list, event);
	}

	async function handleDragEnd(): Promise<void> {
		isDragging = false;

		if (!editMode) {
			return;
		}

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

	async function handleColumnsChange(id: number, columns: PluginWidgetColumns): Promise<void> {
		await app.dashboard.setColumns(id, columns);
	}
</script>

{#if editMode}
	<Alert
		class="mb-4"
		icon="ri:sparkling-2-line"
		description={t(
			'Drag widgets to reorder. Pick a width from 1 to 4 columns, or remove widgets you no longer need.'
		)}
	/>
{/if}

<div class="relative">
	{#if editMode}
		<div class="boot-grid pointer-events-none absolute inset-0 rounded-lg opacity-30" aria-hidden="true"></div>
	{/if}

	{#if list.length === 0}
		<DashboardEmptyState {editMode} {onAddWidget} />
	{:else if editMode}
		<DragDropProvider
			{sensors}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={() => void handleDragEnd()}
		>
			<div class="relative grid grid-cols-4 gap-4">
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
						onColumnsChange={(columns) => void handleColumnsChange(entry.instance.id, columns)}
					/>
				{/each}
			</div>

			<DragOverlay>
				{#snippet children(source)}
					{@const entry = list.find((item) => item.id === source.id)}
					{#if entry}
						{@const definition = app.dashboard.resolveDefinition(entry.instance.definitionId)}
						<DashboardWidgetCard
							instance={entry.instance}
							{definition}
							editMode={true}
							isOverlay={true}
						/>
					{/if}
				{/snippet}
			</DragOverlay>
		</DragDropProvider>
	{:else}
		<div class="grid grid-cols-4 gap-4">
			{#each sortedInstances as instance (instance.id)}
				{@const definition = app.dashboard.resolveDefinition(instance.definitionId)}
				{@const unavailable =
					definition != null && !app.dashboard.isDefinitionAvailable(definition, app)}
				<DashboardWidgetCard
					instance={instance}
					{definition}
					{unavailable}
					editMode={false}
				/>
			{/each}
		</div>
	{/if}
</div>
