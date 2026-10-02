<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import type { UserRankingRecord } from '../../lib/types';

	import Icon from '@iconify/svelte';

	import { cn } from '@stream-kit/plugin/utils';
	import { Badge } from '@stream-kit/ui/badge';
	import { CellGrid } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { formatWatchTime } from '../../lib/extract-user';
	import { orderRanks, resolveProgress } from '../../lib/ranking-engine';
	import { tryGetRankingsService } from '../lib/get-rankings';
	import { platformIcon, podiumClass } from '../lib/leaderboard-format';
	import { RankedUser } from '../lib/ranked-user.svelte';
	import RankIcon from './rank-icon.svelte';
	import RankingsSectionCard from './rankings-section-card.svelte';
	import RankingsStatCell from './rankings-stat-cell.svelte';

	const LEADERBOARD_PATH = '/plugins/rankings/rankings/leaderboard';
	const TIERS_PATH = '/plugins/rankings/rankings/tiers-ranks';

	/** Podium columns left to right: silver, gold, bronze. */
	const PODIUM_ORDER = [2, 1, 3] as const;
	const PLINTH_HEIGHT: Record<number, string> = { 1: 'h-24', 2: 'h-16', 3: 'h-12' };

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const stats = $derived(rankings?.getStats());
	const settings = $derived(rankings?.settings);
	const ordered = $derived(rankings ? orderRanks(rankings.tiers, rankings.ranks) : []);
	const topTen = $derived(rankings ? rankings.getLeaderboard(10) : []);
	const runnersUp = $derived(topTen.slice(3));
	const largestTierCount = $derived(
		Math.max(1, ...(stats?.tierDistribution.map((entry) => entry.count) ?? []))
	);

	function openUser(user: UserRankingRecord) {
		RankedUser.fromRecord(user).open();
	}
</script>

{#snippet podiumPlace(position: number)}
	{@const user = topTen[position - 1]}
	{@const progress = user ? resolveProgress(user.totalPoints, ordered) : null}
	<div class="flex min-w-0 flex-col items-center justify-end">
		{#if user && progress}
			<button
				type="button"
				class="group flex w-full min-w-0 cursor-pointer flex-col items-center gap-2 rounded-md px-2 pt-2 pb-3 text-center transition-colors hover:bg-dark-700/40"
				onclick={() => openUser(user)}
			>
				<RankIcon icon={progress.rank?.icon} size={position === 1 ? 'lg' : 'md'} />
				<span
					class="w-full truncate font-semibold text-dark-50 group-hover:text-primary"
				>
					{user.username}
				</span>
				<span class="font-mono text-sm text-dark-200 tabular-nums">
					{user.totalPoints.toLocaleString()}
					{t('pts')}
				</span>
				{#if progress.rank}
					<Badge variant="secondary" size="sm">{progress.rank.name}</Badge>
				{:else}
					<Badge variant="outline" size="sm">{t('Unranked')}</Badge>
				{/if}
			</button>
		{:else}
			<div class="flex flex-col items-center gap-2 pb-3 text-dark-500">
				<div
					class="flex size-10 items-center justify-center rounded-md border border-dashed border-rule"
				>
					<Icon icon="ri:user-line" class="size-5" aria-hidden="true" />
				</div>
				<span class="text-sm">{t('Open spot')}</span>
			</div>
		{/if}
		<div
			class={cn(
				'flex w-full items-start justify-center rounded-t-md border border-b-0 border-rule bg-dark-700/30 pt-2',
				PLINTH_HEIGHT[position]
			)}
		>
			<span
				class={cn(
					'inline-flex items-center gap-1 font-mono text-lg font-semibold tabular-nums',
					podiumClass(position)
				)}
			>
				<Icon icon="ri:trophy-fill" class="size-4" aria-hidden="true" />
				{position}
			</span>
		</div>
	</div>
{/snippet}

{#if !rankings || !stats || !settings}
	<EmptyState
		icon="ri:plug-disconnected-line"
		title={t('Rankings plugin unavailable')}
		description={t('Enable the Rankings plugin to see the overview.')}
	/>
{:else}
	<Container class="px-6 py-6" size="md">
		<div class="flex flex-col gap-6">
			<CellGrid cols={4}>
				<RankingsStatCell
					icon="ri:group-line"
					label={t('Total users')}
					value={stats.totalUsers.toLocaleString()}
					description={t('{count} ignored', { count: rankings.ignoredUsers.length })}
					href={LEADERBOARD_PATH}
				/>
				<RankingsStatCell
					icon="ri:coin-line"
					label={t('Points awarded')}
					value={stats.totalPointsAwarded.toLocaleString()}
				/>
				<RankingsStatCell
					icon="ri:stack-line"
					label={t('Tiers')}
					value={rankings.tiers.length}
					description={t('{count} ranks', { count: rankings.ranks.length })}
					href={TIERS_PATH}
				/>
				<RankingsStatCell
					icon="ri:time-line"
					label={t('Watch time')}
					value={formatWatchTime(stats.totalWatchTimeSeconds)}
					description={settings.watchTimeEnabled
						? t('{points} pts/min every {seconds}s', {
								points: settings.pointsPerMinute,
								seconds: settings.awardIntervalSeconds
							})
						: t('Disabled')}
				/>
			</CellGrid>

			<RankingsSectionCard title={t('Top 3')} bodyClass="px-4 pt-4 pb-0">
				{#snippet actions()}
					<Button
						href={LEADERBOARD_PATH}
						variant="outline"
						size="sm"
						icon="ri:trophy-line"
					>
						{t('View leaderboard')}
					</Button>
				{/snippet}

				{#if topTen.length > 0}
					<div class="mx-auto grid max-w-2xl grid-cols-3 items-end gap-3">
						{#each PODIUM_ORDER as position (position)}
							{@render podiumPlace(position)}
						{/each}
					</div>
				{:else}
					<EmptyState
						compact
						class="pb-4"
						icon="ri:trophy-line"
						title={t('No users ranked yet.')}
						description={t('Users will appear here as they earn points.')}
					/>
				{/if}
			</RankingsSectionCard>

			<div class="grid gap-6 lg:grid-cols-2">
				<RankingsSectionCard title={t('Runners-up')} bodyClass="p-2">
					{#if runnersUp.length > 0}
						<ul class="flex flex-col">
							{#each runnersUp as user, index (user.userId)}
								{@const progress = resolveProgress(user.totalPoints, ordered)}
								<li>
									<button
										type="button"
										class="group flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-dark-700/40"
										onclick={() => openUser(user)}
									>
										<span
											class="w-6 shrink-0 text-right font-mono text-sm font-medium text-dark-400 tabular-nums"
										>
											{index + 4}
										</span>
										<RankIcon icon={progress.rank?.icon} size="sm" />
										<span class="flex min-w-0 flex-1 flex-col">
											<span
												class="truncate font-medium text-dark-50 group-hover:text-primary"
											>
												{user.username}
											</span>
											<span class="flex items-center gap-1 text-xs text-dark-400">
												<Icon
													icon={platformIcon(user.platform)}
													class="size-3.5"
													aria-hidden="true"
												/>
												{progress.rank?.name ?? t('Unranked')}
											</span>
										</span>
										<span class="shrink-0 font-mono text-sm text-dark-200 tabular-nums">
											{user.totalPoints.toLocaleString()}
										</span>
									</button>
								</li>
							{/each}
						</ul>
					{:else}
						<EmptyState
							compact
							class="p-2"
							icon="ri:list-ordered"
							title={t('Nobody behind the podium yet.')}
						/>
					{/if}
				</RankingsSectionCard>

				<RankingsSectionCard title={t('Tier distribution')}>
					{#if stats.tierDistribution.length > 0}
						<ul class="flex flex-col gap-4">
							{#each stats.tierDistribution as entry (entry.tier.id)}
								<li class="flex flex-col gap-1.5">
									<div class="flex items-center justify-between gap-3 text-sm">
										<span class="flex min-w-0 items-center gap-2">
											<RankIcon icon={entry.tier.icon} size="sm" />
											<span class="truncate font-medium text-dark-50">
												{entry.tier.name}
											</span>
										</span>
										<span class="shrink-0 font-mono text-dark-200 tabular-nums">
											{t('{count} users', { count: entry.count })}
										</span>
									</div>
									<div class="h-1.5 overflow-hidden rounded-full bg-dark-700">
										<div
											class="h-full rounded-full bg-primary"
											style:width="{(entry.count / largestTierCount) * 100}%"
										></div>
									</div>
								</li>
							{/each}
						</ul>
					{:else}
						<EmptyState
							compact
							icon="ri:stack-line"
							title={t('No tiers yet.')}
						/>
					{/if}
				</RankingsSectionCard>
			</div>
		</div>
	</Container>
{/if}
