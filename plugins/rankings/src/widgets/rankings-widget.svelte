<script lang="ts">
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { Badge } from '@stream-kit/ui/badge';
	import { Eyebrow } from '@stream-kit/ui/blueprint';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { WidgetFooterLink, WidgetList, WidgetRow, WidgetStat } from '@stream-kit/ui/widget';

	import { tryGetRankingsService } from '../app/lib/get-rankings';
	import { RankedUser } from '../app/lib/ranked-user.svelte';
	import RankIcon from '../app/ui/rank-icon.svelte';
	import { formatWatchTime } from '../lib/extract-user';
	import { orderRanks, resolveProgress } from '../lib/ranking-engine';

	const LEADERBOARD_PATH = '/plugins/rankings/rankings/leaderboard';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const stats = $derived(rankings?.getStats());
	const ordered = $derived(rankings ? orderRanks(rankings.tiers, rankings.ranks) : []);

	function openUser(user: NonNullable<typeof rankings>['users'][number]) {
		RankedUser.fromRecord(user).open();
	}
</script>

{#if rankings && stats}
	<div class="flex min-w-0 flex-1 flex-col gap-4">
		<div class="grid grid-cols-3 gap-3">
			<WidgetStat label={t('Users')} value={stats.totalUsers} />
			<WidgetStat label={t('Points')} value={stats.totalPointsAwarded} />
			<WidgetStat
				label={t('Watch time')}
				value={formatWatchTime(stats.totalWatchTimeSeconds)}
			/>
		</div>

		<div class="flex flex-col gap-2 border-t border-rule pt-3">
			<Eyebrow>{t('Top users')}</Eyebrow>
			{#if stats.topUsers.length > 0}
				<WidgetList>
					{#each stats.topUsers as user, index (user.userId)}
						{@const progress = resolveProgress(user.totalPoints, ordered)}
						<WidgetRow
							title={user.username}
							description={`${user.totalPoints} pts · ${formatWatchTime(user.watchTimeSeconds)}`}
							onclick={() => openUser(user)}
						>
							{#snippet leading()}
								<span
									class="grid size-7 shrink-0 place-items-center rounded-md border border-rule bg-dark-900/60 font-mono text-xs font-medium text-dark-300 tabular-nums"
									aria-hidden="true"
								>
									{index + 1}
								</span>
								<RankIcon icon={progress.rank?.icon} size="sm" />
							{/snippet}
							{#snippet trailing()}
								{#if progress.rank}
									<Badge variant="secondary" size="sm">{progress.rank.name}</Badge
									>
								{:else}
									<Badge variant="outline" size="sm">{t('Unranked')}</Badge>
								{/if}
							{/snippet}
						</WidgetRow>
					{/each}
				</WidgetList>
			{:else}
				<EmptyState compact icon="ri:trophy-line" title={t('No rankings yet.')} />
			{/if}
		</div>

		<WidgetFooterLink href={LEADERBOARD_PATH} class="mt-auto">
			{t('View leaderboard')}
		</WidgetFooterLink>
	</div>
{:else}
	<EmptyState compact icon="ri:plug-disconnected-line" title={t('Rankings plugin unavailable')} />
{/if}
