<script lang="ts">
	import type { DndDragEvent } from '#lib/components/core/action/dnd-events.js';
	import type { DndActionLayout } from '#lib/core/action/action-layout.js';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { open } from '@tauri-apps/plugin-dialog';
	import { watch } from 'runed';
	import { untrack } from 'svelte';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import {
		collapsedGroups,
		setActionGroupCollapsed
	} from '#lib/components/core/action/action-group-collapse.svelte.js';
	import ActionGroupSection from '#lib/components/core/action/action-group-section.svelte';
	import { ActionBulkEditForm } from '#lib/components/core/action/action-bulk-edit.svelte.js';
	import ActionBulkEditFormContent from '#lib/components/core/action/action-bulk-edit-form.svelte';
	import ActionBulkEditFormFooter from '#lib/components/core/action/action-bulk-edit-form-footer.svelte';
	import ActionSortableItem from '#lib/components/core/action/action-sortable-item.svelte';
	import { applyDndMove } from '#lib/components/core/action/dnd-events.js';
	import { createSelectableList } from '#lib/components/core/list/selectable-list.svelte.js';
	import { app } from '#lib/core/index.js';
	import { Action } from '#lib/core/action/index.js';
	import {
		buildDndLayout,
		dndLayoutToUpdates,
		getGroupOrder
	} from '#lib/core/action/action-layout.js';
	import { useI18n } from '#lib/i18n.js';

	const { t } = useI18n();
	const sensors = [KeyboardSensor, PointerSensor];

	type DragEvent = DndDragEvent;

	let layout = $state<DndActionLayout>(buildDndLayout(app.actions.items));
	let groupOrder = $state<string[]>(untrack(() => getGroupOrder(layout)));
	let isDragging = $state(false);
	let isImporting = $state(false);

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
	const exportableActions = $derived(app.actions.getExportableActions());
	const totalCount = $derived(selectableActions.length);
	const groupCount = $derived(groupOrder.length);
	const hasSelection = $derived(selection.selectedIds.size > 0);

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

	function openBulkEdit(ids: number[]): void {
		if (ids.length === 0) {
			return;
		}

		const modalId = 'action-bulk-edit';
		const form = new ActionBulkEditForm({
			modalId,
			selectedIds: ids,
			groupOrder,
			onApplied: () => {
				selection.clearSelection();
				layout = buildDndLayout(app.actions.items);
				groupOrder = getGroupOrder(layout);
			}
		});

		app
			.createModal({
				id: modalId,
				title: t('Edit selected actions'),
				description: t('{count} selected', { count: ids.length }),
				content: ActionBulkEditFormContent,
				footer: ActionBulkEditFormFooter,
				props: { form },
				size: 'sm'
			})
			.open();
	}

	function openGlobalBulkEdit(): void {
		openBulkEdit([...selection.selectedIds]);
	}

	async function exportActions(): Promise<void> {
		const toExport = hasSelection
			? exportableActions.filter(
					(action) => action.id != null && selection.selectedIds.has(action.id)
				)
			: exportableActions;

		await app.actions.exportToJson(toExport);
	}

	async function importActions(): Promise<void> {
		if (isImporting) {
			return;
		}

		const picked = await open({
			multiple: false,
			directory: false,
			filters: [{ name: t('Actions JSON'), extensions: ['json'] }]
		});

		if (!picked || Array.isArray(picked)) {
			return;
		}

		isImporting = true;

		try {
			await app.actions.importFromJsonPath(picked);
			layout = buildDndLayout(app.actions.items);
			groupOrder = getGroupOrder(layout);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : t('Unknown import error.');

			app.toast.create({
				title: t('Actions could not be imported'),
				description: message,
				variant: 'error'
			});
		} finally {
			isImporting = false;
		}
	}

	$effect(() => {
		const primaryActions = [
			{
				id: 'import-actions',
				label: t('Import'),
				icon: 'ri:upload-2-line',
				variant: 'outline' as const,
				disabled: isImporting,
				onClick: () => void importActions()
			},
			...(exportableActions.length > 0
				? [
						{
							id: 'export-actions',
							label: hasSelection ? t('Export selected') : t('Export all'),
							icon: 'ri:download-2-line',
							variant: 'outline' as const,
							onClick: () => void exportActions()
						}
					]
				: []),
			{
				id: 'add-action',
				label: t('Add Action'),
				icon: 'ri:add-fill',
				onClick: () => {
					void Action.createDraft().open();
				}
			}
		];

		app.toolbar.set({
			meta:
				totalCount > 0
					? [
							{
								icon: 'ri:flashlight-line',
								label: t('{count} actions', { count: totalCount })
							},
							{
								icon: 'ri:folder-3-line',
								label: t('{count} groups', { count: groupCount })
							}
						]
					: [],
			primaryActions,
			selectAll:
				selectableActions.length > 0
					? {
							label: t('Select all'),
							checked: selection.allSelected,
							onChange: selection.selectAll
						}
					: null,
			actions:
				selectableActions.length > 0
					? [
							{
								id: 'edit-selected',
								label: t('Edit selected'),
								icon: 'ri:edit-2-line',
								disabled: selection.selectedIds.size === 0,
								onClick: openGlobalBulkEdit
							},
							{
								id: 'enable-selected',
								label: t('Enable selected'),
								icon: 'ri:checkbox-circle-line',
								disabled: selection.selectedIds.size === 0,
								onClick: () => void enableSelected()
							},
							{
								id: 'disable-selected',
								label: t('Disable selected'),
								icon: 'ri:indeterminate-circle-line',
								disabled: selection.selectedIds.size === 0,
								onClick: () => void disableSelected()
							},
							{
								id: 'delete-selected',
								label: t('Delete selected'),
								variant: 'destructive',
								icon: 'ri:delete-bin-line',
								disabled: selection.selectedIds.size === 0,
								onClick: () => void deleteSelected()
							},
							{
								id: 'clear-selection',
								label: t('Clear selection'),
								icon: 'ri:close-line',
								disabled: selection.selectedIds.size === 0,
								onClick: selection.clearSelection
							}
						]
					: []
		});
	});
</script>

{#if selectableActions.length === 0}
	<EmptyState
		icon="ri:flashlight-line"
		title={t('No actions yet')}
		description={t('Create your first action to automate tasks.')}
	>
		<Button
			class="relative"
			variant="outline"
			icon="ri:upload-2-line"
			disabled={isImporting}
			isLoading={isImporting}
			onclick={() => void importActions()}
		>
			{isImporting ? t('Importing...') : t('Import')}
		</Button>
		<Button class="relative" icon="ri:add-fill" onclick={() => Action.createDraft().open()}>
			{t('Add Action')}
		</Button>
	</EmptyState>
{:else}
	<Container class="px-6 py-6" size="md">
		<DragDropProvider
			{sensors}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			<div class="grid gap-3">
				{#each groupOrder as groupId, groupIndex (groupId)}
					{@const groupActions = layout[groupId] ?? []}
					{@const groupActionIds = groupActions.map((item) => item.id)}
					<ActionGroupSection
						{groupId}
						index={groupIndex}
						count={groupActions.length}
						groupActionIds={groupActionIds}
						{selection}
						collapsed={collapsedGroups.current[groupId] ?? false}
						onCollapsedChange={(value) => setActionGroupCollapsed(groupId, value)}
					>
						{#snippet children()}
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
									{#each groupItems as item, actionIndex (item.id)}
										<ActionSortableItem
											action={item.action}
											groupId={source.id as string}
											index={actionIndex}
											isOverlay
										/>
									{/each}
								{/snippet}
							</ActionGroupSection>
						{/if}
					{/if}
				{/snippet}
			</DragOverlay>
		</DragDropProvider>
	</Container>
{/if}
