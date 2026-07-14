<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	import { Container } from '@stream-kit/ui/container';

	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import BotEmptyState from '../../../ui/bot-empty-state.svelte';
	import { Timer } from '../lib/timer.svelte';
	import { tryGetTimersService } from '../lib/get-timers';
	import TimerCard from './timer-card.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const timers = $derived(tryGetTimersService());
	const selectedIds = new SvelteSet<string>();
	let anchorId: string | null = null;

	const selectableTimers = $derived((timers?.items ?? []).filter((timer) => timer.id != null));
	const orderedSelectableIds = $derived(selectableTimers.map((timer) => timer.id!));
	const allSelected = $derived(
		selectableTimers.length > 0 &&
			selectableTimers.every((timer) => selectedIds.has(timer.id!))
	);

	function setSelected(id: string, selected: boolean): void {
		if (selected) selectedIds.add(id);
		else selectedIds.delete(id);
	}

	function selectRange(id: string, selected: boolean): void {
		if (anchorId == null) {
			setSelected(id, selected);
			anchorId = id;
			return;
		}

		const anchorIndex = orderedSelectableIds.indexOf(anchorId);
		const currentIndex = orderedSelectableIds.indexOf(id);

		if (anchorIndex === -1 || currentIndex === -1) {
			setSelected(id, selected);
			anchorId = id;
			return;
		}

		const start = Math.min(anchorIndex, currentIndex);
		const end = Math.max(anchorIndex, currentIndex);

		for (let index = start; index <= end; index++) {
			if (selected) selectedIds.add(orderedSelectableIds[index]);
			else selectedIds.delete(orderedSelectableIds[index]);
		}

		anchorId = id;
	}

	function handleSelectedChange(id: string, selected: boolean, shiftKey: boolean): void {
		if (shiftKey) selectRange(id, selected);
		else {
			setSelected(id, selected);
			anchorId = id;
		}
	}

	function selectAll(selected: boolean): void {
		selectedIds.clear();
		anchorId = null;
		if (selected) {
			for (const timer of selectableTimers) selectedIds.add(timer.id!);
		}
	}

	function clearSelection(): void {
		selectedIds.clear();
		anchorId = null;
	}

	async function deleteSelected(): Promise<void> {
		const confirmed = await app.confirm.ask({
			title: t('Delete selected timers?'),
			description: t(
				'Are you sure you want to delete {count} timers? This cannot be undone.',
				{ count: selectedIds.size }
			),
			confirmLabel: t('Delete')
		});

		if (confirmed && timers) {
			await timers.deleteBulk([...selectedIds]);
			clearSelection();
		}
	}

	$effect(() => {
		app.toolbar.set({
			primaryActions: [
				{
					id: 'add-timer',
					label: t('Add Timer'),
					icon: 'ri:add-fill',
					variant: 'outline',
					onClick: () => Timer.createDraft().open()
				}
			],
			selectAll:
				selectableTimers.length > 0
					? {
							label: t('Select all'),
							checked: allSelected,
							onChange: selectAll
						}
					: null,
			actions:
				selectableTimers.length > 0
					? [
							{
								id: 'enable-selected',
								label: t('Enable selected'),
								disabled: selectedIds.size === 0,
								onClick: () => void timers?.setEnabledBulk([...selectedIds], true)
							},
							{
								id: 'disable-selected',
								label: t('Disable selected'),
								disabled: selectedIds.size === 0,
								onClick: () => void timers?.setEnabledBulk([...selectedIds], false)
							},
							{
								id: 'delete-selected',
								label: t('Delete selected'),
								variant: 'destructive',
								icon: 'ri:delete-bin-line',
								disabled: selectedIds.size === 0,
								onClick: () => void deleteSelected()
							},
							{
								id: 'clear-selection',
								label: t('Clear selection'),
								disabled: selectedIds.size === 0,
								onClick: clearSelection
							}
						]
					: []
		});
	});
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-2">
		{#if !timers || timers.items.length === 0}
			<BotEmptyState
				icon="ri:timer-line"
				title={t('No timers yet')}
				description={t('Create your first timer to send automatic chat messages.')}
				actionLabel={t('Add Timer')}
				onAction={() => Timer.createDraft().open()}
			/>
		{:else}
			{#each timers.items as timer (timer.id)}
				{#if timer.id != null}
					<TimerCard
						{timer}
						selected={selectedIds.has(timer.id)}
						onSelectedChange={(value, shiftKey) =>
							handleSelectedChange(timer.id!, value, shiftKey)}
					/>
				{/if}
			{/each}
		{/if}
	</div>
</Container>
