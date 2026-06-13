<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Command } from '../lib/command.svelte';
	import { tryGetCommandsService } from '../lib/get-commands';
	import CommandCard from './command-card.svelte';

	let { app, title, description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const commands = $derived(tryGetCommandsService());

	const selectedIds = new SvelteSet<string>();
	let anchorId: string | null = null;

	const selectableCommands = $derived(
		(commands?.items ?? []).filter((command) => command.id != null)
	);
	const orderedSelectableIds = $derived(selectableCommands.map((command) => command.id!));
	const allSelected = $derived(
		selectableCommands.length > 0 &&
			selectableCommands.every((command) => selectedIds.has(command.id!))
	);
	const hasSelection = $derived(selectedIds.size > 0);

	function setSelected(id: string, selected: boolean): void {
		if (selected) {
			selectedIds.add(id);
		} else {
			selectedIds.delete(id);
		}
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
			if (selected) {
				selectedIds.add(orderedSelectableIds[index]);
			} else {
				selectedIds.delete(orderedSelectableIds[index]);
			}
		}

		anchorId = id;
	}

	function handleSelectedChange(id: string, selected: boolean, shiftKey: boolean): void {
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
			for (const command of selectableCommands) {
				selectedIds.add(command.id!);
			}
		}
	}

	function clearSelection(): void {
		selectedIds.clear();
		anchorId = null;
	}

	async function enableSelected(): Promise<void> {
		if (!commands) return;
		await commands.setEnabledBulk([...selectedIds], true);
		clearSelection();
	}

	async function disableSelected(): Promise<void> {
		if (!commands) return;
		await commands.setEnabledBulk([...selectedIds], false);
		clearSelection();
	}

	async function deleteSelected(): Promise<void> {
		const count = selectedIds.size;

		const confirmed = await app.confirm.ask({
			title: t('Delete selected commands?'),
			description: t(
				'Are you sure you want to delete {count} commands? This cannot be undone.',
				{ count }
			),
			confirmLabel: t('Delete')
		});

		if (!confirmed || !commands) {
			return;
		}

		await commands.deleteBulk([...selectedIds]);
		clearSelection();
	}
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex justify-between gap-4">
		<Heading level="1" subTitle={description ?? t('Manage your chat commands')}>
			{title ?? t('Commands')}
		</Heading>
		<Button
			variant="outline"
			icon="ri:add-fill"
			size="lg"
			onclick={() => Command.createDraft().open()}
		>
			{t('Add Command')}
		</Button>
	</header>

	{#if selectableCommands.length > 0}
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
				<Button
					size="sm"
					variant="destructive"
					icon="ri:delete-bin-line"
					onclick={() => void deleteSelected()}
				>
					{t('Delete selected')}
				</Button>
				<Button size="sm" variant="ghost" onclick={clearSelection}>
					{t('Clear selection')}
				</Button>
			{/if}
		</div>
	{/if}

	<div class="mt-8 flex flex-col gap-2">
		{#if !commands || commands.items.length === 0}
			<p class="text-sm text-dark-300">{t('No commands added yet.')}</p>
		{:else}
			{#each commands?.items ?? [] as command (command.id)}
				{#if command.id != null}
					<CommandCard
						{command}
						selected={selectedIds.has(command.id)}
						onSelectedChange={(value, shiftKey) =>
							handleSelectedChange(command.id!, value, shiftKey)}
					/>
				{/if}
			{/each}
		{/if}
	</div>
</Container>
