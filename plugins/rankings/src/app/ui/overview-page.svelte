<script lang="ts">
	import type { RankingsPluginApi } from '../../lib/plugin-api';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Container } from '@stream-kit/ui/container';

	import { orderRanks, resolveProgress } from '../../lib/ranking-engine';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const plugin = $derived(app.plugins.tryGet<RankingsPluginApi>('rankings'));
	const rankings = $derived(plugin?.rankings);
	const stats = $derived(rankings?.getStats());
	const settings = $derived(rankings?.settings);
</script>

<Container class="px-6 py-6" size="md">
	{#if rankings && stats && settings}
		<div class="flex flex-col gap-4">
			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<div class="rounded-xl border border-dark-600 bg-dark-900 px-4 py-4">
					<p class="text-xs uppercase tracking-wide text-dark-400">{t('Total viewers')}</p>
					<p class="mt-2 text-3xl font-semibold text-dark-50">{stats.totalUsers}</p>
				</div>
				<div class="rounded-xl border border-dark-600 bg-dark-900 px-4 py-4">
					<p class="text-xs uppercase tracking-wide text-dark-400">{t('Points awarded')}</p>
					<p class="mt-2 text-3xl font-semibold text-dark-50">{stats.totalPointsAwarded}</p>
				</div>
				<div class="rounded-xl border border-dark-600 bg-dark-900 px-4 py-4">
					<p class="text-xs uppercase tracking-wide text-dark-400">{t('Tiers')}</p>
					<p class="mt-2 text-3xl font-semibold text-dark-50">{rankings.tiers.length}</p>
				</div>
				<div class="rounded-xl border border-dark-600 bg-dark-900 px-4 py-4">
					<p class="text-xs uppercase tracking-wide text-dark-400">{t('Watch time')}</p>
					<p class="mt-2 text-lg font-semibold text-dark-50">
						{settings.watchTimeEnabled ? t('Enabled') : t('Disabled')}
					</p>
					<p class="mt-1 text-xs text-dark-300">
						{t('{points} pts/min every {seconds}s', {
							points: settings.pointsPerMinute,
							seconds: settings.awardIntervalSeconds
						})}
					</p>
				</div>
			</div>

			<div class="grid gap-4 lg:grid-cols-2">
				<section class="rounded-xl border border-dark-600 bg-dark-900 px-4 py-4">
					<h2 class="text-sm font-semibold text-dark-100">{t('Top viewers')}</h2>
					<ul class="mt-3 divide-y divide-dark-600">
						{#each stats.topUsers as user, index (user.userId)}
							{@const progress = resolveProgress(
								user.totalPoints,
								orderRanks(rankings.tiers, rankings.ranks)
							)}
							<li class="flex items-center justify-between gap-3 py-2 text-sm">
								<span class="text-dark-100">{index + 1}. {user.username}</span>
								<span class="text-dark-300">
									{user.totalPoints} pts · {progress.rank?.name ?? t('Unranked')}
								</span>
							</li>
						{:else}
							<li class="py-2 text-sm text-dark-400">{t('No viewers ranked yet.')}</li>
						{/each}
					</ul>
				</section>

				<section class="rounded-xl border border-dark-600 bg-dark-900 px-4 py-4">
					<h2 class="text-sm font-semibold text-dark-100">{t('Tier distribution')}</h2>
					<ul class="mt-3 divide-y divide-dark-600">
						{#each stats.tierDistribution as entry (entry.tier.id)}
							<li class="flex items-center justify-between gap-3 py-2 text-sm">
								<span class="text-dark-100">{entry.tier.name}</span>
								<span class="text-dark-300">{entry.count}</span>
							</li>
						{/each}
					</ul>
				</section>
			</div>
		</div>
	{:else}
		<p class="text-sm text-dark-300">{t('Rankings plugin unavailable.')}</p>
	{/if}
</Container>
