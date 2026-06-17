<script lang="ts">
	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';

	import { watch } from 'runed';

	import ActionGroupSection from '$lib/components/core/action/action-group-section.svelte';
	import {
		collapsedGroups,
		setActionGroupCollapsed
	} from '$lib/components/core/action/action-group-collapse.svelte';
	import ActionSortableItem from '$lib/components/core/action/action-sortable-item.svelte';
	import { createSelectableList } from '$lib/components/core/list/selectable-list.svelte';
	import { applyDndMove, type DndDragEvent } from '$lib/components/core/action/dnd-events';
	import {
		buildDndLayout,
		dndLayoutToUpdates,
		getGroupOrder,
		type DndActionLayout
	} from '$lib/core/action/action-layout';
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';
	import { app } from '$lib/core';
	import { Action } from '$lib/core/action';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	const sensors = [KeyboardSensor, PointerSensor];

	type DragEvent = DndDragEvent;

	let layout = $state<DndActionLayout>(buildDndLayout(app.actions.items));
	let groupOrder = $state<string[]>(getGroupOrder(layout));
	let isDragging = $state(false);

	watch(
		() =>
			app.actions.items
				.filter((action) => action.id != null)
				.map(
					(action) =>
						`${action.id}:${action.group}:${action.groupSortOrder}:${action.sortOrder}`
				)
				.join('|'),
		() => {
			if (isDragging) {
				return;
			}

			layout = buildDndLayout(app.actions.items);
			groupOrder = getGroupOrder(layout);
		}
	);

	const orderedSelectableIds = $derived(
		groupOrder.flatMap((groupId) => layout[groupId]?.map((item) => item.id) ?? [])
	);

	const selection = createSelectableList(() => orderedSelectableIds);

	const selectableActions = $derived(app.actions.items.filter((action) => action.id != null));

	function handleDragStart(): void {
		isDragging = true;
	}

	function handleDragOver(event: DragEvent): void {
		if (event.operation.source?.type === 'group') {
			groupOrder = applyDndMove(groupOrder, event);
			return;
		}

		layout = applyDndMove(layout, event);
	}

	async function handleDragEnd(): Promise<void> {
		isDragging = false;

		const updates = dndLayoutToUpdates(layout, groupOrder);
		const current = dndLayoutToUpdates(buildDndLayout(app.actions.items));

		if (JSON.stringify(updates) === JSON.stringify(current)) {
			return;
		}

		await app.actions.applyLayout(updates);
		layout = buildDndLayout(app.actions.items);
		groupOrder = getGroupOrder(layout);
	}

	async function enableSelected(): Promise<void> {
		await app.actions.setEnabledBulk([...selection.selectedIds], true);
		selection.clearSelection();
	}

	async function disableSelected(): Promise<void> {
		await app.actions.setEnabledBulk([...selection.selectedIds], false);
		selection.clearSelection();
	}

	async function deleteSelected(): Promise<void> {
		const count = selection.selectedIds.size;

		const confirmed = await app.confirm.ask({
			title: t('Delete selected actions?'),
			description: t(
				'Are you sure you want to delete {count} actions? This cannot be undone.',
				{ count }
			),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		await app.actions.deleteBulk([...selection.selectedIds]);
		selection.clearSelection();
	}
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex justify-between gap-4">
		<Heading level="1" subTitle={t('Manage your actions')}>{t('Actions')}</Heading>
		<Button
			icon="ri:add-fill"
			size="lg"
			variant="outline"
			onclick={() => Action.createDraft().open()}
		>
			{t('Add Action')}
		</Button>
	</header>

	{#if selectableActions.length > 0}
		<div
			class="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-dark-600 bg-dark-800 px-4 py-2.5"
		>
			<InputCheckbox
				inline
				label={t('Select all')}
				bind:checked={() => selection.allSelected, selection.selectAll}
			/>
			{#if selection.hasSelection}
				<span class="text-sm text-dark-300">
					{t('{count} selected', { count: selection.selectedIds.size })}
				</span>
				<div class="h-4 w-px bg-dark-600"></div>
				<Button size="sm" variant="outline" onclick={() => void enableSelected()}>
					{t('Enable selected')}
				</Button>
				<Button size="sm" variant="outline" onclick={() => void disableSelected()}>
					{t('Disable selected')}
				</Button>
				<Button
					size="sm"
					variant="destructive"
					icon="ri:delete-bin-line"
					onclick={() => void deleteSelected()}
				>
					{t('Delete selected')}
				</Button>
				<Button size="sm" variant="ghost" onclick={selection.clearSelection}>
					{t('Clear selection')}
				</Button>
			{/if}
		</div>
	{/if}

	<DragDropProvider
		{sensors}
		onDragStart={handleDragStart}
		onDragOver={handleDragOver}
		onDragEnd={handleDragEnd}
	>
		{#if selectableActions.length === 0}
			<div class="mt-12 flex flex-col items-center gap-4 py-12 text-center">
				<div class="flex size-16 items-center justify-center rounded-2xl border border-dark-600 bg-dark-800">
					<Icon icon="ri:flashlight-line" class="size-8 text-dark-400" aria-hidden="true" />
				</div>
				<div class="flex flex-col gap-1.5">
					<p class="text-base font-medium text-dark-200">{t('No actions yet')}</p>
					<p class="text-sm text-dark-400">{t('Create your first action to automate tasks.')}</p>
				</div>
				<Button
					icon="ri:add-fill"
					variant="outline"
					onclick={() => Action.createDraft().open()}
				>
					{t('Add Action')}
				</Button>
			</div>
		{/if}

		<div class="mt-8 grid gap-6">
			{#each groupOrder as groupId, groupIndex (groupId)}
				{@const groupActions = layout[groupId] ?? []}
				<ActionGroupSection
					{groupId}
					index={groupIndex}
					count={groupActions.length}
					collapsed={collapsedGroups.current[groupId] ?? false}
					onCollapsedChange={(value) => setActionGroupCollapsed(groupId, value)}
				>
					{#snippet children()}
						<div class="flex flex-col gap-2">
							{#each groupActions as item, actionIndex (item.id)}
								<ActionSortableItem
									action={item.action}
									{groupId}
									index={actionIndex}
									selected={selection.selectedIds.has(item.id)}
									onSelectedChange={(value, shiftKey) =>
										selection.handleSelectedChange(item.id, value, shiftKey)}
								/>
							{/each}
						</div>
					{/snippet}
				</ActionGroupSection>
			{/each}
		</div>

		<DragOverlay>
			{#snippet children(source)}
				{#if source.data.group}
					{@const item = layout[source.data.group as string]?.find(
						(entry) => entry.id === source.id
					)}
					{#if item}
						<ActionSortableItem
							action={item.action}
							groupId={source.data.group as string}
							index={0}
							isOverlay
						/>
					{/if}
				{:else}
					{@const groupItems = layout[source.id as string]}
					{#if groupItems}
						<ActionGroupSection groupId={source.id as string} index={0} isOverlay>
							{#snippet children()}
								<div class="flex flex-col gap-2">
									{#each groupItems as item, actionIndex (item.id)}
										<ActionSortableItem
											action={item.action}
											groupId={source.id as string}
											index={actionIndex}
											isOverlay
										/>
									{/each}
								</div>
							{/snippet}
						</ActionGroupSection>
					{/if}
				{/if}
			{/snippet}
		</DragOverlay>
	</DragDropProvider>
</Container>
