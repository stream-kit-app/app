<script lang="ts">
	import type { PointHistoryEntry } from '../../lib/types';
	import type { RankedUser } from '../lib/ranked-user.svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import { formatWatchTime } from '../../lib/extract-user';
	import { orderRanks, resolveProgress } from '../../lib/ranking-engine';
	import { formatSourceLabel } from '../../lib/source-labels';
	import { getRankingsService } from '../lib/get-rankings';
	import RankingsStatCard from './rankings-stat-card.svelte';

	type Props = {
		rankedUser: RankedUser;
	};

	let { rankedUser }: Props = $props();

	const rankings = getRankingsService();
	const app = rankings.requireApp();
	const t = app.i18n.t;

	const user = $derived(rankings.getUser(rankedUser.userId));
	const history = $derived(rankings.getUserHistory(rankedUser.userId));
	const progress = $derived(
		user ? resolveProgress(user.totalPoints, orderRanks(rankings.tiers, rankings.ranks)) : null
	);

	function formatWhen(entry: PointHistoryEntry): string {
		const start = new Date(entry.createdAt);
		const end = entry.updatedAt ? new Date(entry.updatedAt) : null;

		if (end && end.getTime() !== start.getTime()) {
			return `${start.toLocaleString()} – ${end.toLocaleString()}`;
		}

		return start.toLocaleString();
	}

	function formatChange(entry: PointHistoryEntry): string {
		if (entry.kind === 'set') {
			return t('Set to {points}', { points: entry.balanceAfter });
		}

		if (entry.amount > 0) {
			return `+${entry.amount}`;
		}

		return String(entry.amount);
	}
</script>

{#if user && progress}
	<div class="flex flex-col gap-4">
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			<RankingsStatCard icon="ri:coin-line" value={user.totalPoints} label={t('Points')} />
			<div class="rounded-xl border border-dark-600 bg-dark-800 p-4">
				<div class="flex items-start gap-3">
					<div
						class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
						aria-hidden="true"
					>
						<span class="text-sm font-semibold">#</span>
					</div>
					<div class="min-w-0 flex-1 space-y-1.5">
						<p class="text-sm text-dark-100">{t('Rank')}</p>
						<div class="flex flex-wrap items-center gap-1.5">
							{#if progress.rank}
								<Badge variant="secondary" size="sm">{progress.rank.name}</Badge>
							{:else}
								<Badge variant="outline" size="sm">{t('Unranked')}</Badge>
							{/if}
							{#if progress.tier}
								<Badge variant="outline" size="sm">{progress.tier.name}</Badge>
							{/if}
						</div>
					</div>
				</div>
			</div>
			<RankingsStatCard
				icon="ri:time-line"
				value={formatWatchTime(user.watchTimeSeconds)}
				label={t('Watch time')}
			/>
			<RankingsStatCard
				icon={user.platform === 'twitch'
					? 'ri:twitch-line'
					: user.platform === 'youtube'
						? 'ri:youtube-line'
						: 'ri:user-line'}
				value={user.platform.charAt(0).toUpperCase() + user.platform.slice(1)}
				label={t('Platform')}
			/>
		</div>

		<section class="overflow-hidden rounded-xl border border-dark-600 bg-dark-800">
			<div class="border-b border-dark-700/80 px-4 py-3">
				<h3 class="text-base font-semibold text-dark-50">{t('Point history')}</h3>
			</div>

			{#if history.length > 0}
				<div class="bg-dark-900/50">
					<ScrollArea class="max-h-96">
						<table class="min-w-full text-sm">
							<thead
								class="sticky top-0 border-b border-dark-600 bg-dark-900 text-left text-dark-300"
							>
								<tr>
									<th class="px-4 py-2 font-medium">{t('When')}</th>
									<th class="px-4 py-2 font-medium">{t('Source')}</th>
									<th class="px-4 py-2 font-medium">{t('Change')}</th>
									<th class="px-4 py-2 font-medium">{t('Total after')}</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-dark-600">
								{#each history as entry (entry.id)}
									<tr>
										<td class="px-4 py-2 text-dark-300">{formatWhen(entry)}</td>
										<td class="px-4 py-2 text-dark-200">{formatSourceLabel(entry.source)}</td>
										<td class="px-4 py-2 text-dark-100">{formatChange(entry)}</td>
										<td class="px-4 py-2 text-dark-200">{entry.balanceAfter}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</ScrollArea>
				</div>
			{:else}
				<p class="bg-dark-900/50 px-4 py-8 text-center text-sm text-dark-400">
					{t('No point history yet.')}
				</p>
			{/if}
		</section>
	</div>
{:else}
	<p class="text-sm text-dark-300">{t('User not found.')}</p>
{/if}
