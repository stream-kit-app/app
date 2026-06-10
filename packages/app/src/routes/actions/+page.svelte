<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { capitalize, groupBy } from 'es-toolkit';

	import { ActionCard } from '$lib/components/core/action';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';
	import { app } from '$lib/core';
	import { Action } from '$lib/core/action';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	const groups = $derived(groupBy(app.actions.items, (action) => action.group));
	const selectedIds = new SvelteSet<number>();
	let anchorId: number | null = null;

	const selectableActions = $derived(app.actions.items.filter((action) => action.id != null));
	const orderedSelectableIds = $derived(
		Object.keys(groups).flatMap((group) =>
			groups[group].filter((action) => action.id != null).map((action) => action.id!)
		)
	);
	const allSelected = $derived(
		selectableActions.length > 0 &&
			selectableActions.every((action) => selectedIds.has(action.id!))
	);
	const hasSelection = $derived(selectedIds.size > 0);

	function setSelected(id: number, selected: boolean): void {
		if (selected) {
			selectedIds.add(id);
		} else {
			selectedIds.delete(id);
		}
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
			if (selected) {
				selectedIds.add(orderedSelectableIds[index]);
			} else {
				selectedIds.delete(orderedSelectableIds[index]);
			}
		}

		anchorId = id;
	}

	function handleSelectedChange(id: number, selected: boolean, shiftKey: boolean): void {
		if (shiftKey) {
			selectRange(id, selected);
			return;
		}

		setSelected(id, selected);
		anchorId = id;
	}

	function selectAll(selected: boolean): void {
		selectedIds.clear();
		anchorId = null;

		if (selected) {
			for (const action of selectableActions) {
				selectedIds.add(action.id!);
			}
		}
	}

	function clearSelection(): void {
		selectedIds.clear();
		anchorId = null;
	}

	async function enableSelected(): Promise<void> {
		await app.actions.setEnabledBulk([...selectedIds], true);
		clearSelection();
	}

	async function disableSelected(): Promise<void> {
		await app.actions.setEnabledBulk([...selectedIds], false);
		clearSelection();
	}
</script>

<div class="p-4">
	<Container size="md">
		<header class="flex justify-between">
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
			<div class="mt-6 flex flex-wrap items-center gap-4">
				<InputCheckbox
					inline
					label={t('Select all')}
					bind:checked={() => allSelected, selectAll}
				/>
				{#if hasSelection}
					<span class="text-sm text-dark-300">
						{t('{count} selected', { count: selectedIds.size })}
					</span>
					<Button size="sm" variant="outline" onclick={() => void enableSelected()}>
						{t('Enable selected')}
					</Button>
					<Button size="sm" variant="outline" onclick={() => void disableSelected()}>
						{t('Disable selected')}
					</Button>
					<Button size="sm" variant="ghost" onclick={clearSelection}>
						{t('Clear selection')}
					</Button>
				{/if}
			</div>
		{/if}

		<div class="mt-8 grid gap-6">
			{#each Object.keys(groups) as group (group)}
				<div class="flex flex-col gap-2">
					<Heading level="4" class="text-dark-300 uppercase">{capitalize(group)}</Heading>
					{#each groups[group] as action (action.id)}
						{#if action.id != null}
							<ActionCard
								{action}
								selected={selectedIds.has(action.id)}
								onSelectedChange={(value, shiftKey) =>
									handleSelectedChange(action.id!, value, shiftKey)}
							/>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</Container>
</div>
