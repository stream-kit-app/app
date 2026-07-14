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
	import Icon from '@iconify/svelte';
	import { watch } from 'runed';

	import ActionGroupSection from '@stream-kit/plugin/action-ui/action-group-section.svelte';
	import { applyDndMove } from '@stream-kit/plugin/action-ui/dnd-events';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

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
	const totalCount = $derived(selectableCommands.length);
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

	$effect(() => {
		if (!pluginApp) {
			return;
		}

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
			primaryActions: [
				{
					id: 'add-command',
					label: t('Add Command'),
					icon: 'ri:add-fill',
					variant: 'outline',
					onClick: () => {
						void Command.createDraft().open();
					}
				}
			],
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

<Container class="px-6 py-6" size="md">
	<DragDropProvider
		{sensors}
		onDragStart={handleDragStart}
		onDragOver={handleDragOver}
		onDragEnd={handleDragEnd}
	>
		{#if selectableCommands.length === 0}
			<div
				class="relative mt-8 flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
			>
				<div class="boot-ambient pointer-events-none opacity-30"></div>
				<div
					class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
				>
					<Icon icon="ri:terminal-box-line" class="size-7" aria-hidden="true" />
				</div>
				<div class="relative flex flex-col gap-1.5">
					<p class="text-lg font-semibold text-dark-50">{t('No commands yet')}</p>
					<p class="text-sm text-dark-300">
						{t('Create your first command to respond in chat.')}
					</p>
				</div>
				<Button
					class="relative"
					icon="ri:add-fill"
					onclick={() => Command.createDraft().open()}
				>
					{t('Add Command')}
				</Button>
			</div>
		{/if}

		<div class="grid gap-4">
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
						<div class="flex flex-col gap-2">
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
								<div class="flex flex-col gap-2">
									{#each groupItems as item, commandIndex (item.id)}
										<CommandSortableItem
											command={item.command}
											groupId={source.id as string}
											index={commandIndex}
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
