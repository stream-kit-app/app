<script lang="ts">
	import type { DndDragEvent } from '$lib/components/core/action/dnd-events';
	import type { DndActionLayout } from '$lib/core/action/action-layout';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import Icon from '@iconify/svelte';
	import { watch } from 'runed';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import {
		collapsedGroups,
		setActionGroupCollapsed
	} from '$lib/components/core/action/action-group-collapse.svelte';
	import ActionGroupSection from '$lib/components/core/action/action-group-section.svelte';
	import ActionSortableItem from '$lib/components/core/action/action-sortable-item.svelte';
	import { applyDndMove } from '$lib/components/core/action/dnd-events';
	import { createSelectableList } from '$lib/components/core/list/selectable-list.svelte';
	import { app } from '$lib/core';
	import { Action } from '$lib/core/action';
	import {
		buildDndLayout,
		dndLayoutToUpdates,
		getGroupOrder
	} from '$lib/core/action/action-layout';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

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
	const totalCount = $derived(selectableActions.length);
	const groupCount = $derived(groupOrder.length);

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
	<header class="flex flex-wrap items-start justify-between gap-4">
		<div class="flex flex-col gap-3">
			<Heading level="1" subTitle={t('Manage your actions')}>{t('Actions')}</Heading>
			{#if totalCount > 0}
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-dark-200">
					<span
						class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-800 px-2.5 py-1"
					>
						<Icon
							icon="ri:flashlight-line"
							class="size-3.5 text-primary"
							aria-hidden="true"
						/>
						{t('{count} actions', { count: totalCount })}
					</span>
					<span
						class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-800 px-2.5 py-1"
					>
						<Icon
							icon="ri:folder-3-line"
							class="size-3.5 text-dark-400"
							aria-hidden="true"
						/>
						{t('{count} groups', { count: groupCount })}
					</span>
				</div>
			{/if}
		</div>
		<Button icon="ri:add-fill" size="lg" onclick={() => Action.createDraft().open()}>
			{t('Add Action')}
		</Button>
	</header>

	{#if selectableActions.length > 0}
		<div
			class="sticky top-4 z-10 mt-6 flex h-12 items-center justify-between gap-3 rounded-xl border border-dark-700 bg-dark-800 px-3 shadow-lg shadow-dark-950/40"
		>
			<InputCheckbox
				inline
				label={t('Select all')}
				bind:checked={() => selection.allSelected, selection.selectAll}
			/>
			<div
				class={cn(
					'flex items-center gap-2 transition-opacity',
					!selection.hasSelection && 'pointer-events-none invisible'
				)}
				aria-hidden={!selection.hasSelection}
			>
				<span class="mr-1 text-sm text-dark-300">
					{t('{count} selected', { count: selection.selectedIds.size })}
				</span>
				<Button
					size="sm"
					variant="outline"
					tabindex={selection.hasSelection ? undefined : -1}
					onclick={() => void enableSelected()}
				>
					{t('Enable selected')}
				</Button>
				<Button
					size="sm"
					variant="outline"
					tabindex={selection.hasSelection ? undefined : -1}
					onclick={() => void disableSelected()}
				>
					{t('Disable selected')}
				</Button>
				<Button
					size="sm"
					variant="destructive"
					icon="ri:delete-bin-line"
					tabindex={selection.hasSelection ? undefined : -1}
					onclick={() => void deleteSelected()}
				>
					{t('Delete selected')}
				</Button>
				<Button
					size="sm"
					variant="ghost"
					tabindex={selection.hasSelection ? undefined : -1}
					onclick={selection.clearSelection}
				>
					{t('Clear selection')}
				</Button>
			</div>
		</div>
	{/if}

	<DragDropProvider
		{sensors}
		onDragStart={handleDragStart}
		onDragOver={handleDragOver}
		onDragEnd={handleDragEnd}
	>
		{#if selectableActions.length === 0}
			<div
				class="relative mt-8 flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
			>
				<div class="boot-ambient pointer-events-none opacity-30"></div>
				<div
					class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
				>
					<Icon icon="ri:flashlight-line" class="size-7" aria-hidden="true" />
				</div>
				<div class="relative flex flex-col gap-1.5">
					<p class="text-lg font-semibold text-dark-50">{t('No actions yet')}</p>
					<p class="text-sm text-dark-300">
						{t('Create your first action to automate tasks.')}
					</p>
				</div>
				<Button
					class="relative"
					icon="ri:add-fill"
					onclick={() => Action.createDraft().open()}
				>
					{t('Add Action')}
				</Button>
			</div>
		{/if}

		<div class="mt-8 grid gap-4">
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
