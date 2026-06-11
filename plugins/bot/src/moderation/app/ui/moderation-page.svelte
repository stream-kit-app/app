<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	import { ModRule } from '../lib/mod-rule.svelte';
	import { tryGetModerationService } from '../lib/get-moderation';
	import ModRuleCard from './mod-rule-card.svelte';

	type Props = {
		title?: string;
		description?: string;
	};

	let { title, description }: Props = $props();
	const { t } = useI18n();

	const moderation = $derived(tryGetModerationService());
	const selectedIds = new SvelteSet<number>();

	const selectableRules = $derived(
		(moderation?.items ?? []).filter((rule) => rule.id != null)
	);
	const allSelected = $derived(
		selectableRules.length > 0 &&
			selectableRules.every((rule) => selectedIds.has(rule.id!))
	);
	const hasSelection = $derived(selectedIds.size > 0);

	function selectAll(selected: boolean): void {
		selectedIds.clear();
		if (selected) {
			for (const rule of selectableRules) selectedIds.add(rule.id!);
		}
	}
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex justify-between gap-4">
		<Heading level="1" subTitle={description ?? t('Create custom moderation rules')}>
			{title ?? t('Moderation')}
		</Heading>
		<Button
			variant="outline"
			icon="ri:add-fill"
			size="lg"
			onclick={() => ModRule.createDraft().open()}
		>
			{t('Add Rule')}
		</Button>
	</header>

	{#if selectableRules.length > 0}
		<div class="mt-6 flex flex-wrap items-center gap-4">
			<InputCheckbox inline label={t('Select all')} bind:checked={() => allSelected, selectAll} />
			{#if hasSelection}
				<span class="text-sm text-dark-300">{t('{count} selected', { count: selectedIds.size })}</span>
				<Button
					size="sm"
					variant="destructive"
					icon="ri:delete-bin-line"
					onclick={async () => {
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
							selectedIds.clear();
						}
					}}
				>
					{t('Delete selected')}
				</Button>
			{/if}
		</div>
	{/if}

	<div class="mt-8 flex flex-col gap-2">
		{#if !moderation || moderation.items.length === 0}
			<p class="text-sm text-dark-300">{t('No moderation rules added yet.')}</p>
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
