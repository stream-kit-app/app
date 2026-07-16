<script lang="ts">
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { tryGetRankingsService } from '../app/lib/get-rankings';
	import { orderRanks, resolveProgress } from '../lib/ranking-engine';

	const LEADERBOARD_PATH = '/plugins/rankings/rankings/leaderboard';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const stats = $derived(rankings?.getStats());
	const ordered = $derived(rankings ? orderRanks(rankings.tiers, rankings.ranks) : []);
</script>

{#if rankings && stats}
	<a href={LEADERBOARD_PATH} class="block space-y-4 text-sm transition hover:opacity-90">
		<div class="grid grid-cols-2 gap-3">
			<div>
				<p class="text-xs uppercase tracking-wide text-dark-400">{t('Users')}</p>
				<p class="text-2xl font-semibold text-dark-50">{stats.totalUsers}</p>
			</div>
			<div>
				<p class="text-xs uppercase tracking-wide text-dark-400">{t('Points')}</p>
				<p class="text-2xl font-semibold text-dark-50">{stats.totalPointsAwarded}</p>
			</div>
		</div>

		<div>
			<p class="text-xs uppercase tracking-wide text-dark-400">{t('Top 5')}</p>
			<ul class="mt-2 space-y-1">
				{#each stats.topUsers as user, index (user.userId)}
					{@const progress = resolveProgress(user.totalPoints, ordered)}
					<li class="flex justify-between gap-2 text-dark-200">
						<span>{index + 1}. {user.username}</span>
						<span class="text-dark-400">{progress.rank?.name ?? t('Unranked')}</span>
					</li>
				{:else}
					<li class="text-dark-400">{t('No rankings yet.')}</li>
				{/each}
			</ul>
		</div>
	</a>
{:else}
	<div class="text-sm text-dark-300">{t('Rankings plugin unavailable')}</div>
{/if}
