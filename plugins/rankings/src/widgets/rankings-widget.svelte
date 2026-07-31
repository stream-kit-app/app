<script lang="ts">
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { Badge } from '@stream-kit/ui/badge';
	import { Eyebrow } from '@stream-kit/ui/blueprint';

	import { tryGetRankingsService } from '../app/lib/get-rankings';
	import { RankedUser } from '../app/lib/ranked-user.svelte';
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
	<div class="space-y-3 text-sm">
		<div class="grid grid-cols-3 gap-2">
			<div>
				<Eyebrow>{t('Users')}</Eyebrow>
				<p class="text-xl font-semibold text-dark-50">{stats.totalUsers}</p>
			</div>
			<div>
				<Eyebrow>{t('Points')}</Eyebrow>
				<p class="text-xl font-semibold text-dark-50">{stats.totalPointsAwarded}</p>
			</div>
			<div>
				<Eyebrow>{t('Watch time')}</Eyebrow>
				<p class="text-xl font-semibold text-dark-50">
					{formatWatchTime(stats.totalWatchTimeSeconds)}
				</p>
			</div>
		</div>

		<div>
			<Eyebrow>{t('Top users')}</Eyebrow>
			{#if stats.topUsers.length > 0}
				<ul class="mt-1.5 flex flex-col gap-0.5">
					{#each stats.topUsers as user, index (user.userId)}
						{@const progress = resolveProgress(user.totalPoints, ordered)}
						<li>
							<button
								type="button"
								class="flex w-full cursor-pointer items-center gap-2.5 rounded-none px-1.5 py-1.5 text-left transition-colors hover:bg-dark-700/60"
								onclick={() => openUser(user)}
							>
								<span
									class="grid size-7 shrink-0 place-items-center border border-rule text-xs font-medium text-dark-300"
									aria-hidden="true"
								>
									{index + 1}
								</span>
								<span class="min-w-0 flex-1 truncate font-medium text-dark-50">
									{user.username}
								</span>
								<div class="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
									<span class="text-xs text-dark-300">
										{user.totalPoints} pts · {formatWatchTime(user.watchTimeSeconds)}
									</span>
									{#if progress.rank}
										<Badge variant="secondary" size="sm">{progress.rank.name}</Badge>
									{:else}
										<Badge variant="outline" size="sm">{t('Unranked')}</Badge>
									{/if}
								</div>
							</button>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-1.5 text-dark-400">{t('No rankings yet.')}</p>
			{/if}
		</div>

		<a
			href={LEADERBOARD_PATH}
			class="inline-block cursor-pointer text-xs font-medium text-primary hover:underline"
		>
			{t('View leaderboard')}
		</a>
	</div>
{:else}
	<div class="text-sm text-dark-300">{t('Rankings plugin unavailable')}</div>
{/if}
