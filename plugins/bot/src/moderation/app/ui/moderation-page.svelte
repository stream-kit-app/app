<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	import { Container } from '@stream-kit/ui/container';

	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import BotEmptyState from '../../../ui/bot-empty-state.svelte';
	import { ModRule } from '../lib/mod-rule.svelte';
	import { tryGetModerationService } from '../lib/get-moderation';
	import ModRuleCard from './mod-rule-card.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const moderation = $derived(tryGetModerationService());
	const selectedIds = new SvelteSet<string>();

	const selectableRules = $derived(
		(moderation?.items ?? []).filter((rule) => rule.id != null)
	);
	const allSelected = $derived(
		selectableRules.length > 0 &&
			selectableRules.every((rule) => selectedIds.has(rule.id!))
	);

	function selectAll(selected: boolean): void {
		selectedIds.clear();

		if (selected) {
			for (const rule of selectableRules) selectedIds.add(rule.id!);
		}
	}

	function clearSelection(): void {
		selectedIds.clear();
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
			primaryActions: [
				{
					id: 'add-rule',
					label: t('Add Rule'),
					icon: 'ri:add-fill',
					variant: 'outline',
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
		{#if !moderation || moderation.items.length === 0}
			<BotEmptyState
				icon="ri:shield-check-line"
				title={t('No moderation rules yet')}
				description={t('Create your first rule to automatically moderate chat messages.')}
				actionLabel={t('Add Rule')}
				onAction={() => ModRule.createDraft().open()}
			/>
		{:else}
			{#each moderation.items as rule (rule.id)}
				{#if rule.id != null}
					<ModRuleCard
						{rule}
						selected={selectedIds.has(rule.id)}
						onSelectedChange={(value) => {
							if (value) selectedIds.add(rule.id!);
							else selectedIds.delete(rule.id!);
						}}
					/>
				{/if}
			{/each}
		{/if}
	</div>
</Container>
