<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { SvelteSet } from 'svelte/reactivity';

	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { tryGetModerationService } from '../lib/get-moderation';
	import { ModRule } from '../lib/mod-rule.svelte';
	import ModRuleCard from './mod-rule-card.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const moderation = $derived(tryGetModerationService());
	const selectedIds = new SvelteSet<string>();
	let anchorId: string | null = null;

	const selectableRules = $derived((moderation?.items ?? []).filter((rule) => rule.id != null));
	const orderedSelectableIds = $derived(selectableRules.map((rule) => rule.id!));
	const allSelected = $derived(
		selectableRules.length > 0 && selectableRules.every((rule) => selectedIds.has(rule.id!))
	);
	const totalCount = $derived(selectableRules.length);

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
			for (const rule of selectableRules) selectedIds.add(rule.id!);
		}
	}

	function clearSelection(): void {
		selectedIds.clear();
		anchorId = null;
	}

	async function deleteSelected(): Promise<void> {
		const confirmed = await app.confirm.ask({
			title: t('Delete selected rules?'),
			description: t(
				'Are you sure you want to delete {count} rules? This cannot be undone.',
				{ count: selectedIds.size }
			),
			confirmLabel: t('Delete')
		});

		if (confirmed && moderation) {
			await moderation.deleteBulk([...selectedIds]);
			clearSelection();
		}
	}

	$effect(() => {
		app.toolbar.set({
			meta:
				totalCount > 0
					? [
							{
								icon: 'ri:shield-check-line',
								label: t('{count} rules', { count: totalCount })
							}
						]
					: [],
			primaryActions: [
				{
					id: 'add-rule',
					label: t('Add Rule'),
					icon: 'ri:add-fill',
					onClick: () => ModRule.createDraft().open()
				}
			],
			selectAll:
				selectableRules.length > 0
					? {
							label: t('Select all'),
							checked: allSelected,
							onChange: selectAll
						}
					: null,
			actions:
				selectableRules.length > 0
					? [
							{
								id: 'enable-selected',
								label: t('Enable selected'),
								icon: 'ri:checkbox-circle-line',
								disabled: selectedIds.size === 0,
								onClick: () =>
									void moderation?.setEnabledBulk([...selectedIds], true)
							},
							{
								id: 'disable-selected',
								label: t('Disable selected'),
								icon: 'ri:indeterminate-circle-line',
								disabled: selectedIds.size === 0,
								onClick: () =>
									void moderation?.setEnabledBulk([...selectedIds], false)
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
								icon: 'ri:close-line',
								disabled: selectedIds.size === 0,
								onClick: clearSelection
							}
						]
					: []
		});
	});
</script>

{#if !moderation || moderation.items.length === 0}
	<EmptyState
		icon="ri:shield-check-line"
		title={t('No moderation rules yet')}
		description={t('Create your first rule to automatically moderate chat messages.')}
		actionLabel={t('Add Rule')}
		onAction={() => ModRule.createDraft().open()}
	/>
{:else}
	<Container class="px-6 py-6" size="md">
		<div class="grid gap-3">
			{#each moderation.items as rule (rule.id)}
				{#if rule.id != null}
					<div
						class="border-border-dark-600 rounded-xl border bg-dark-800 px-4 py-2 transition-colors hover:bg-dark-700"
					>
						<ModRuleCard
							{rule}
							selected={selectedIds.has(rule.id)}
							onSelectedChange={(value, shiftKey) =>
								handleSelectedChange(rule.id!, value, shiftKey)}
						/>
					</div>
				{/if}
			{/each}
		</div>
	</Container>
{/if}
