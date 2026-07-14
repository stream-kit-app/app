<script lang="ts">
	import type { RankingsPluginApi } from '../../lib/plugin-api';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { InputText } from '@stream-kit/ui/input';

	import { Tier } from '../lib/tier.svelte';
	import RankRow from './rank-row.svelte';
	import RankingsEmptyState from './rankings-empty-state.svelte';
	import RankingsSectionCard from './rankings-section-card.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const plugin = $derived(app.plugins.tryGet<RankingsPluginApi>('rankings'));
	const rankings = $derived(plugin?.rankings);
	const tiers = $derived(rankings?.tiers ?? []);
	const ranks = $derived(rankings?.ranks ?? []);

	let rankDrafts = $state<Record<string, { name: string; pointsRequired: string }>>({});

	function ranksForTier(tierId: string) {
		return ranks
			.filter((rank) => rank.tierId === tierId)
			.sort(
				(left, right) =>
					left.sortOrder - right.sortOrder || left.pointsRequired - right.pointsRequired
			);
	}

	function getRankDraft(tierId: string) {
		return rankDrafts[tierId] ?? { name: '', pointsRequired: '' };
	}

	function setRankDraft(tierId: string, patch: Partial<{ name: string; pointsRequired: string }>) {
		rankDrafts = {
			...rankDrafts,
			[tierId]: { ...getRankDraft(tierId), ...patch }
		};
	}

	function openAddTierModal() {
		Tier.createDraft().open();
	}

	function openEditTierModal(tier: (typeof tiers)[number]) {
		Tier.fromRecord(tier).open();
	}

	async function createRank(tierId: string) {
		if (!rankings) {
			return;
		}

		const draft = getRankDraft(tierId);
		const name = draft.name.trim();
		const pointsRequired = Number(draft.pointsRequired);

		if (!name) {
			app.toast.create({
				title: t('Rank name is required'),
				variant: 'warning'
			});
			return;
		}

		if (!Number.isFinite(pointsRequired) || pointsRequired < 0) {
			app.toast.create({
				title: t('Points required must be a valid number'),
				variant: 'warning'
			});
			return;
		}

		try {
			await rankings.createRank({
				tierId,
				name,
				pointsRequired
			});
			setRankDraft(tierId, { name: '', pointsRequired: '' });
		} catch (error) {
			app.toast.create({
				title: t('Could not add rank'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}

	async function deleteRank(id: string, name: string) {
		if (!rankings) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Delete rank?'),
			description: t('Are you sure you want to delete {name}? This cannot be undone.', { name }),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		try {
			await rankings.deleteRank(id);
		} catch (error) {
			app.toast.create({
				title: t('Could not delete rank'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}

	$effect(() => {
		if (!rankings) {
			return;
		}

		app.toolbar.set({
			primaryActions: [
				{
					id: 'add-tier',
					label: t('Add tier'),
					icon: 'ri:add-fill',
					variant: 'outline',
					onClick: () => Tier.createDraft().open()
				}
			]
		});
	});
</script>

<Container class="px-6 py-6" size="md">
	{#if rankings}
		<div class="flex flex-col gap-2">
			{#if tiers.length === 0}
				<RankingsEmptyState
					icon="ri:medal-line"
					title={t('No tiers yet')}
					description={t('Create your first tier to start defining ranks.')}
					actionLabel={t('Add tier')}
					onAction={openAddTierModal}
				/>
			{/if}

			{#each tiers as tier (tier.id)}
				<RankingsSectionCard title={tier.name}>
					{#snippet actions()}
						<Button
							type="button"
							variant="outline"
							size="sm"
							icon="ri:pencil-line"
							onclick={() => openEditTierModal(tier)}
						>
							{t('Edit tier')}
						</Button>
					{/snippet}

					<div class="flex flex-col gap-2">
						{#each ranksForTier(tier.id) as rank (rank.id)}
							<RankRow
								{rank}
								pointsLabel={t('pts')}
								deleteLabel={t('Delete rank')}
								onDelete={() => void deleteRank(rank.id, rank.name)}
							/>
						{:else}
							<p class="text-sm text-dark-400">{t('No ranks in this tier yet.')}</p>
						{/each}

						<div
							class="grid gap-2 pt-1 sm:grid-cols-[minmax(0,1fr)_8rem_auto] sm:items-center"
						>
							<InputText
								value={getRankDraft(tier.id).name}
								placeholder={t('Rank name')}
								oninput={(event) => {
									setRankDraft(tier.id, {
										name: (event.currentTarget as HTMLInputElement).value
									});
								}}
							/>
							<InputText
								value={getRankDraft(tier.id).pointsRequired}
								placeholder={t('Points')}
								inputmode="numeric"
								oninput={(event) => {
									setRankDraft(tier.id, {
										pointsRequired: (event.currentTarget as HTMLInputElement).value
									});
								}}
							/>
							<Button
								type="button"
								size="sm"
								icon="ri:add-line"
								onclick={() => void createRank(tier.id)}
							>
								{t('Add rank')}
							</Button>
						</div>
					</div>
				</RankingsSectionCard>
			{/each}
		</div>
	{:else}
		<p class="text-sm text-dark-300">{t('Rankings plugin unavailable.')}</p>
	{/if}
</Container>
