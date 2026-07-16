<script lang="ts">
	import type { DndCommandLayout } from '../lib/command-layout';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';
	import type { DndDragEvent } from '$lib/components/core/action/dnd-events';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { watch } from 'runed';

	import ActionGroupSection from '@stream-kit/plugin/action-ui/action-group-section.svelte';
	import { applyDndMove } from '@stream-kit/plugin/action-ui/dnd-events';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { createSelectableList } from '$lib/components/core/list/selectable-list.svelte';

	import { buildDndLayout, dndLayoutToUpdates, getGroupOrder } from '../lib/command-layout';
	import { Command } from '../lib/command.svelte';
	import { tryGetCommandsService } from '../lib/get-commands';
	import CommandBulkEditForm from './command-bulk-edit-form.svelte';
	import { collapsedGroups, setCommandGroupCollapsed } from './command-group-collapse.svelte';
	import CommandSortableItem from './command-sortable-item.svelte';

	let { title: _title, description: _description }: PluginCustomViewProps = $props();

	const commands = $derived(tryGetCommandsService());
	const pluginApp = $derived(commands ? commands.requireApp() : undefined);
	const t = $derived(pluginApp?.i18n.t ?? ((key: string) => key));

	const sensors = [KeyboardSensor, PointerSensor];
	type DragEvent = DndDragEvent;

	let layout = $state<DndCommandLayout>({});
	let groupOrder = $state<string[]>([]);
	let isDragging = $state(false);
	let isImporting = $state(false);

	watch(
		() =>
			(commands?.items ?? [])
				.filter((command) => command.id != null)
				.map(
					(command) =>
						`${command.id}:${command.group}:${command.groupSortOrder}:${command.sortOrder}`
				)
				.join('|'),
		() => {
			if (isDragging || !commands) {
				return;
			}

			layout = buildDndLayout(commands.items);
			groupOrder = getGroupOrder(layout);
		}
	);

	const orderedSelectableIds = $derived(
		groupOrder.flatMap((groupId) => layout[groupId]?.map((item) => item.id) ?? [])
	);

	const selection = createSelectableList<string>(() => orderedSelectableIds);

	const selectableCommands = $derived(
		(commands?.items ?? []).filter((command) => command.id != null)
	);
	const exportableCommands = $derived(commands?.getExportableCommands() ?? []);
	const totalCount = $derived(selectableCommands.length);
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

		if (!commands) {
			return;
		}

		const updates = dndLayoutToUpdates(layout, groupOrder);
		const current = dndLayoutToUpdates(buildDndLayout(commands.items));

		if (JSON.stringify(updates) === JSON.stringify(current)) {
			return;
		}

		await commands.applyLayout(updates);
		layout = buildDndLayout(commands.items);
		groupOrder = getGroupOrder(layout);
	}

	async function enableSelected(): Promise<void> {
		if (!commands) return;
		await commands.setEnabledBulk([...selection.selectedIds], true);
		selection.clearSelection();
	}

	async function disableSelected(): Promise<void> {
		if (!commands) return;
		await commands.setEnabledBulk([...selection.selectedIds], false);
		selection.clearSelection();
	}

	async function deleteSelected(): Promise<void> {
		if (!commands) return;

		const count = selection.selectedIds.size;
		const app = commands.requireApp();

		const confirmed = await app.confirm.ask({
			title: t('Delete selected commands?'),
			description: t(
				'Are you sure you want to delete {count} commands? This cannot be undone.',
				{ count }
			),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		await commands.deleteBulk([...selection.selectedIds]);
		selection.clearSelection();
	}

	function openBulkEdit(ids: string[]): void {
		if (ids.length === 0 || !commands) {
			return;
		}

		const app = commands.requireApp();
		const modalId = 'command-bulk-edit';
		const modalProps = {
			selectedIds: ids,
			groupOrder,
			onClose: () => app.modal.get(modalId)?.close(),
			onApplied: () => {
				selection.clearSelection();
				if (!commands) return;
				layout = buildDndLayout(commands.items);
				groupOrder = getGroupOrder(layout);
			}
		};

		const existing = app.modal.get(modalId);

		if (existing) {
			existing.props = modalProps;
			existing.open();
			return;
		}

		app.modal
			.create({
				id: modalId,
				title: app.i18n.translate('Edit selected commands'),
				content: CommandBulkEditForm,
				props: modalProps
			})
			.open();
	}

	function openGlobalBulkEdit(): void {
		openBulkEdit([...selection.selectedIds]);
	}

	async function exportCommands(): Promise<void> {
		if (!commands) {
			return;
		}

		const toExport = hasSelection
			? exportableCommands.filter(
					(command) => command.id != null && selection.selectedIds.has(command.id)
				)
			: exportableCommands;

		await commands.exportToJson(toExport);
	}

	async function importCommands(): Promise<void> {
		if (!commands || !pluginApp || isImporting) {
			return;
		}

		const picked = await pluginApp.fs.select({
			type: 'file',
			filters: [{ name: t('Commands JSON'), extensions: ['json'] }]
		});

		if (!picked) {
			return;
		}

		isImporting = true;

		try {
			await commands.importFromJsonPath(picked);
			layout = buildDndLayout(commands.items);
			groupOrder = getGroupOrder(layout);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : t('Unknown import error.');

			pluginApp.toast.create({
				title: t('Commands could not be imported'),
				description: message,
				variant: 'error'
			});
		} finally {
			isImporting = false;
		}
	}

	$effect(() => {
		if (!pluginApp) {
			return;
		}

		const primaryActions = [
			{
				id: 'import-commands',
				label: t('Import'),
				icon: 'ri:upload-2-line',
				variant: 'outline' as const,
				disabled: isImporting,
				onClick: () => void importCommands()
			},
			...(exportableCommands.length > 0
				? [
						{
							id: 'export-commands',
							label: hasSelection ? t('Export selected') : t('Export all'),
							icon: 'ri:download-2-line',
							variant: 'outline' as const,
							onClick: () => void exportCommands()
						}
					]
				: []),
			{
				id: 'add-command',
				label: t('Add Command'),
				icon: 'ri:add-fill',
				onClick: () => {
					void Command.createDraft().open();
				}
			}
		];

		pluginApp.toolbar.set({
			meta:
				totalCount > 0
					? [
							{
								icon: 'ri:terminal-box-line',
								label: t('{count} commands', { count: totalCount })
							},
							{
								icon: 'ri:folder-3-line',
								label: t('{count} groups', { count: groupCount })
							}
						]
					: [],
			primaryActions,
			selectAll:
				selectableCommands.length > 0
					? {
							label: t('Select all'),
							checked: selection.allSelected,
							onChange: selection.selectAll
						}
					: null,
			actions:
				selectableCommands.length > 0
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

{#if selectableCommands.length === 0}
	<EmptyState
		icon="ri:terminal-box-line"
		title={t('No commands yet')}
		description={t('Create your first command to respond in chat.')}
	>
		<Button
			class="relative"
			variant="outline"
			icon="ri:upload-2-line"
			disabled={isImporting}
			isLoading={isImporting}
			onclick={() => void importCommands()}
		>
			{isImporting ? t('Importing...') : t('Import')}
		</Button>
		<Button class="relative" icon="ri:add-fill" onclick={() => Command.createDraft().open()}>
			{t('Add Command')}
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
					{@const groupCommands = layout[groupId] ?? []}
					{@const groupCommandIds = groupCommands.map((item) => item.id)}
					<ActionGroupSection
						{t}
						{groupId}
						index={groupIndex}
						count={groupCommands.length}
						groupActionIds={groupCommandIds}
						{selection}
						collapsed={collapsedGroups.current[groupId] ?? false}
						onCollapsedChange={(value) => setCommandGroupCollapsed(groupId, value)}
					>
						{#snippet children()}
							{#each groupCommands as item, commandIndex (item.id)}
								<CommandSortableItem
									command={item.command}
									{groupId}
									index={commandIndex}
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
							<CommandSortableItem
								command={item.command}
								groupId={source.data.group as string}
								index={0}
								isOverlay
							/>
						{/if}
					{:else}
						{@const groupItems = layout[source.id as string]}
						{#if groupItems}
							<ActionGroupSection {t} groupId={source.id as string} index={0} isOverlay>
								{#snippet children()}
									{#each groupItems as item, commandIndex (item.id)}
										<CommandSortableItem
											command={item.command}
											groupId={source.id as string}
											index={commandIndex}
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
