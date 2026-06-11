<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	import { Timer } from '../lib/timer.svelte';
	import { tryGetTimersService } from '../lib/get-timers';
	import TimerCard from './timer-card.svelte';

	type Props = {
		title?: string;
		description?: string;
	};

	let { title, description }: Props = $props();
	const { t } = useI18n();

	const timers = $derived(tryGetTimersService());
	const selectedIds = new SvelteSet<number>();
	let anchorId: number | null = null;

	const selectableTimers = $derived((timers?.items ?? []).filter((timer) => timer.id != null));
	const orderedSelectableIds = $derived(selectableTimers.map((timer) => timer.id!));
	const allSelected = $derived(
		selectableTimers.length > 0 &&
			selectableTimers.every((timer) => selectedIds.has(timer.id!))
	);
	const hasSelection = $derived(selectedIds.size > 0);

	function setSelected(id: number, selected: boolean): void {
		if (selected) selectedIds.add(id);
		else selectedIds.delete(id);
	}

	function selectRange(id: number, selected: boolean): void {
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

	function handleSelectedChange(id: number, selected: boolean, shiftKey: boolean): void {
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
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex justify-between gap-4">
		<Heading level="1" subTitle={description ?? t('Schedule automatic chat messages')}>
			{title ?? t('Timers')}
		</Heading>
		<Button variant="outline" icon="ri:add-fill" size="lg" onclick={() => Timer.createDraft().open()}>
			{t('Add Timer')}
		</Button>
	</header>

	{#if selectableTimers.length > 0}
		<div class="mt-6 flex flex-wrap items-center gap-4">
			<InputCheckbox inline label={t('Select all')} bind:checked={() => allSelected, selectAll} />
			{#if hasSelection}
				<span class="text-sm text-dark-300">{t('{count} selected', { count: selectedIds.size })}</span>
				<Button
					size="sm"
					variant="outline"
					onclick={() => void timers?.setEnabledBulk([...selectedIds], true)}
				>
					{t('Enable selected')}
				</Button>
				<Button
					size="sm"
					variant="outline"
					onclick={() => void timers?.setEnabledBulk([...selectedIds], false)}
				>
					{t('Disable selected')}
				</Button>
				<Button
					size="sm"
					variant="destructive"
					icon="ri:delete-bin-line"
					onclick={async () => {
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
					}}
				>
					{t('Delete selected')}
				</Button>
				<Button size="sm" variant="ghost" onclick={clearSelection}>{t('Clear selection')}</Button>
			{/if}
		</div>
	{/if}

	<div class="mt-8 flex flex-col gap-2">
		{#if !timers || timers.items.length === 0}
			<p class="text-sm text-dark-300">{t('No timers added yet.')}</p>
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
