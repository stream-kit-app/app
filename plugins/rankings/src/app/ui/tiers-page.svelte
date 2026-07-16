<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';
	import type { DndDragEvent } from '$lib/components/core/action/dnd-events';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@stream-kit/plugin/action-ui/dnd-kit';
	import { watch } from 'runed';

	import ActionGroupSection from '@stream-kit/plugin/action-ui/action-group-section.svelte';
	import { applyDndMove } from '@stream-kit/plugin/action-ui/dnd-events';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

	import { createSelectableList } from '$lib/components/core/list/selectable-list.svelte';

	import { buildTierOrder, compareTierOrders } from '../lib/tier-layout';
	import { Tier } from '../lib/tier.svelte';
	import { tryGetRankingsService } from '../lib/get-rankings';
	import { countUsersByRank, orderRanks } from '../../lib/ranking-engine';
	import RankCard from './rank-card.svelte';
	import RankingsEmptyState from './rankings-empty-state.svelte';
	import TierAddRankRow from './tier-add-rank-row.svelte';
	import { collapsedGroups, setTierGroupCollapsed } from './tier-group-collapse.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const tiers = $derived(rankings?.tiers ?? []);
	const ranks = $derived(rankings?.ranks ?? []);
	const users = $derived(rankings?.users ?? []);

	const orderedRanks = $derived(
		rankings ? orderRanks(rankings.tiers, rankings.ranks) : []
	);

	const rankUserCounts = $derived(countUsersByRank(users, orderedRanks));

	const sensors = [KeyboardSensor, PointerSensor];
	type DragEvent = DndDragEvent;

	let tierOrder = $state<string[]>([]);
	let isDragging = $state(false);
	let rankDrafts = $state<Record<string, { name: string; pointsRequired: string }>>({});

	const tierById = $derived(new Map(tiers.map((tier) => [tier.id, tier])));

	watch(
		() => tiers.map((tier) => `${tier.id}:${tier.sortOrder}:${tier.name}`).join('|'),
		() => {
			if (isDragging) {
				return;
			}

			tierOrder = buildTierOrder(tiers);
		}
	);

	const orderedSelectableIds = $derived(
		tierOrder.flatMap((tierId) => ranksForTier(tierId).map((rank) => rank.id))
	);

	const selection = createSelectableList(() => orderedSelectableIds);

	const totalRankCount = $derived(ranks.length);
	const tierCount = $derived(tiers.length);

	function ranksForTier(tierId: string) {
		return ranks
			.filter((rank) => rank.tierId === tierId)
			.sort(
				(left, right) =>
					left.pointsRequired - right.pointsRequired || left.sortOrder - right.sortOrder
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

	function openEditTierModal(tierId: string) {
		const tier = tierById.get(tierId);

		if (!tier) {
			return;
		}

		Tier.fromRecord(tier).open();
	}

	function handleDragStart(): void {
		isDragging = true;
	}

	function handleDragOver(event: DragEvent): void {
		if (event.operation.source?.type === 'group') {
			tierOrder = applyDndMove(tierOrder, event);
		}
	}

	async function handleDragEnd(): Promise<void> {
		isDragging = false;

		if (!rankings) {
			return;
		}

		const current = buildTierOrder(rankings.tiers);

		if (compareTierOrders(tierOrder, current)) {
			return;
		}

		try {
			await rankings.applyTierOrder(tierOrder);
		} catch (error) {
			tierOrder = buildTierOrder(rankings.tiers);
			app.toast.create({
				title: t('Could not reorder tiers'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
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
			selection.setSelected(id, false);
		} catch (error) {
			app.toast.create({
				title: t('Could not delete rank'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}

	async function deleteSelected(): Promise<void> {
		if (!rankings) {
			return;
		}

		const count = selection.selectedIds.size;

		const confirmed = await app.confirm.ask({
			title: t('Delete selected ranks?'),
			description: t(
				'Are you sure you want to delete {count} ranks? This cannot be undone.',
				{ count }
			),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		try {
			await rankings.deleteRankBulk([...selection.selectedIds]);
			selection.clearSelection();
		} catch (error) {
			app.toast.create({
				title: t('Could not delete ranks'),
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
			meta:
				tierCount > 0
					? [
							{
								icon: 'ri:medal-line',
								label: t('{count} tiers', { count: tierCount })
							},
							{
								icon: 'ri:award-line',
								label: t('{count} ranks', { count: totalRankCount })
							}
						]
					: [],
			primaryActions: [
				{
					id: 'add-tier',
					label: t('Add tier'),
					icon: 'ri:add-fill',
					variant: 'outline',
					onClick: openAddTierModal
				}
			],
			selectAll:
				totalRankCount > 0
					? {
							label: t('Select all'),
							checked: selection.allSelected,
							onChange: selection.selectAll
						}
					: null,
			actions:
				totalRankCount > 0
					? [
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
	{#if rankings}
		<DragDropProvider
			{sensors}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			{#if tiers.length === 0}
				<RankingsEmptyState
					class="mt-8"
					icon="ri:medal-line"
					title={t('No tiers yet')}
					description={t('Create your first tier to start defining ranks.')}
					actionLabel={t('Add tier')}
					onAction={openAddTierModal}
				/>
			{/if}

			<div class="grid gap-3">
				{#each tierOrder as tierId, tierIndex (tierId)}
					{@const tier = tierById.get(tierId)}
					{@const tierRanks = ranksForTier(tierId)}
					{@const tierRankIds = tierRanks.map((rank) => rank.id)}
					{#if tier}
						<ActionGroupSection
							{t}
							groupId={tierId}
							label={tier.name}
							index={tierIndex}
							count={tierRanks.length}
							groupActionIds={tierRankIds}
							{selection}
							collapsed={collapsedGroups.current[tierId] ?? false}
							onCollapsedChange={(value) => setTierGroupCollapsed(tierId, value)}
						>
							{#snippet headerActions()}
								<Button
									type="button"
									variant="outline"
									size="sm"
									icon="ri:pencil-line"
									onclick={() => openEditTierModal(tierId)}
								>
									{t('Edit tier')}
								</Button>
							{/snippet}

							{#snippet children()}
								{#each tierRanks as rank (rank.id)}
									<RankCard
										{rank}
										pointsLabel={t('pts')}
										usersLabel={t('{count} users', {
											count: rankUserCounts.get(rank.id) ?? 0
										})}
										selectLabel={t('Select {name}', { name: rank.name })}
										deleteLabel={t('Delete rank')}
										selected={selection.selectedIds.has(rank.id)}
										onSelectedChange={(value, shiftKey) =>
											selection.handleSelectedChange(rank.id, value, shiftKey)}
										onDelete={() => void deleteRank(rank.id, rank.name)}
									/>
								{:else}
									<p class="px-2 py-3 text-sm text-dark-400">
										{t('No ranks in this tier yet.')}
									</p>
								{/each}

								<TierAddRankRow
									name={getRankDraft(tierId).name}
									pointsRequired={getRankDraft(tierId).pointsRequired}
									namePlaceholder={t('Rank name')}
									pointsPlaceholder={t('Points')}
									addLabel={t('Add rank')}
									onNameInput={(value) => setRankDraft(tierId, { name: value })}
									onPointsInput={(value) => setRankDraft(tierId, { pointsRequired: value })}
									onAdd={() => void createRank(tierId)}
								/>
							{/snippet}
						</ActionGroupSection>
					{/if}
				{/each}
			</div>

			<DragOverlay>
				{#snippet children(source)}
					{@const overlayTier = tierById.get(source.id as string)}
					{#if overlayTier}
						<ActionGroupSection
							{t}
							groupId={overlayTier.id}
							label={overlayTier.name}
							index={0}
							count={ranksForTier(overlayTier.id).length}
							isOverlay
						>
							{#snippet children()}
								{#each ranksForTier(overlayTier.id) as rank (rank.id)}
									<RankCard
										{rank}
										pointsLabel={t('pts')}
										usersLabel={t('{count} users', {
											count: rankUserCounts.get(rank.id) ?? 0
										})}
										selectLabel={t('Select {name}', { name: rank.name })}
										deleteLabel={t('Delete rank')}
										onDelete={() => {}}
									/>
								{/each}
							{/snippet}
						</ActionGroupSection>
					{/if}
				{/snippet}
			</DragOverlay>
		</DragDropProvider>
	{:else}
		<p class="text-sm text-dark-300">{t('Rankings plugin unavailable.')}</p>
	{/if}
</Container>
