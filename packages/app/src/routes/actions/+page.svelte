<script lang="ts">
	import { capitalize, groupBy } from 'es-toolkit';

	import { ActionCard } from '$lib/components/core/action';
	import { createSelectableList } from '$lib/components/core/list/selectable-list.svelte';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';
	import { app } from '$lib/core';
	import { Action } from '$lib/core/action';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	const groups = $derived(groupBy(app.actions.items, (action) => action.group));

	const orderedSelectableIds = $derived(
		Object.keys(groups).flatMap((group) =>
			groups[group].filter((action) => action.id != null).map((action) => action.id!)
		)
	);

	const selection = createSelectableList(() => orderedSelectableIds);

	const selectableActions = $derived(app.actions.items.filter((action) => action.id != null));

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
		<div class="mt-6 flex flex-wrap items-center gap-4">
			<InputCheckbox
				inline
				label={t('Select all')}
				bind:checked={() => selection.allSelected, selection.selectAll}
			/>
			{#if selection.hasSelection}
				<span class="text-sm text-dark-300">
					{t('{count} selected', { count: selection.selectedIds.size })}
				</span>
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

	<div class="mt-8 grid gap-6">
		{#each Object.keys(groups) as group (group)}
			<div class="flex flex-col gap-2">
				<Heading level="4" class="text-dark-300 uppercase">{capitalize(group)}</Heading>
				{#each groups[group] as action (action.id)}
					{#if action.id != null}
						<ActionCard
							{action}
							selected={selection.selectedIds.has(action.id)}
							onSelectedChange={(value, shiftKey) =>
								selection.handleSelectedChange(action.id!, value, shiftKey)}
						/>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</Container>
