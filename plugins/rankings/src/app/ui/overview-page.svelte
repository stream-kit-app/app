<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Badge } from '@stream-kit/ui/badge';
	import { Container } from '@stream-kit/ui/container';

	import { formatWatchTime } from '../../lib/extract-user';
	import { orderRanks, resolveProgress } from '../../lib/ranking-engine';
	import { tryGetRankingsService } from '../lib/get-rankings';
	import { RankedUser } from '../lib/ranked-user.svelte';
	import RankIcon from './rank-icon.svelte';
	import RankingsSectionCard from './rankings-section-card.svelte';
	import RankingsStatCard from './rankings-stat-card.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const stats = $derived(rankings?.getStats());
	const settings = $derived(rankings?.settings);

	function openUser(user: NonNullable<typeof rankings>['users'][number]) {
		RankedUser.fromRecord(user).open();
	}
</script>

<Container class="px-6 py-6" size="md">
	{#if rankings && stats && settings}
		<div class="flex flex-col gap-4">
			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<RankingsStatCard
					icon="ri:group-line"
					value={stats.totalUsers}
					label={t('Total users')}
				/>
				<RankingsStatCard
					icon="ri:coin-line"
					value={stats.totalPointsAwarded}
					label={t('Points awarded')}
				/>
				<RankingsStatCard
					icon="ri:stack-line"
					value={rankings.tiers.length}
					label={t('Tiers')}
				/>
				<RankingsStatCard
					icon="ri:time-line"
					value={formatWatchTime(stats.totalWatchTimeSeconds)}
					label={t('Watch time')}
					description={settings.watchTimeEnabled
						? t('Enabled · {points} pts/min every {seconds}s', {
								points: settings.pointsPerMinute,
								seconds: settings.awardIntervalSeconds
							})
						: t('Disabled')}
				/>
			</div>

			<div class="grid gap-4 lg:grid-cols-2">
				<RankingsSectionCard title={t('Top users')}>
					{#if stats.topUsers.length > 0}
						<ul class="flex flex-col gap-1">
							{#each stats.topUsers as user, index (user.userId)}
								{@const progress = resolveProgress(
									user.totalPoints,
									orderRanks(rankings.tiers, rankings.ranks)
								)}
								<li>
									<button
										type="button"
										class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-dark-700/60"
										onclick={() => openUser(user)}
									>
										<span
											class="grid size-8 shrink-0 place-items-center border border-rule text-xs font-medium text-dark-300"
											aria-hidden="true"
										>
											{index + 1}
										</span>
										<RankIcon icon={progress.rank?.icon} size="sm" />
										<span class="min-w-0 flex-1 truncate font-medium text-dark-50">
											{user.username}
										</span>
										<div class="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
											<span class="text-sm text-dark-300">
												{user.totalPoints} pts · {formatWatchTime(user.watchTimeSeconds)}
											</span>
											{#if progress.rank}
												<Badge variant="secondary" size="sm">{progress.rank.name}</Badge>
											{:else}
												<Badge variant="outline" size="sm">{t('Unranked')}</Badge>
											{/if}
											{#if progress.tier}
												<Badge variant="outline" size="sm">{progress.tier.name}</Badge>
											{/if}
										</div>
									</button>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="py-2 text-sm text-dark-400">{t('No users ranked yet.')}</p>
					{/if}
				</RankingsSectionCard>

				<RankingsSectionCard title={t('Tier distribution')}>
					{#if stats.tierDistribution.length > 0}
						<ul class="flex flex-col gap-1">
							{#each stats.tierDistribution as entry (entry.tier.id)}
								<li
									class="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm"
								>
									<span class="font-medium text-dark-50">{entry.tier.name}</span>
									<Badge variant="ghost" size="sm">{entry.count}</Badge>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="py-2 text-sm text-dark-400">{t('No tiers yet.')}</p>
					{/if}
				</RankingsSectionCard>
			</div>
		</div>
	{:else}
		<p class="text-sm text-dark-300">{t('Rankings plugin unavailable.')}</p>
	{/if}
</Container>
