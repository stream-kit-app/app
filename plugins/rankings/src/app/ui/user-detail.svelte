<script lang="ts">
	import type { PointHistoryEntry } from '../../lib/types';
	import type { RankedUser } from '../lib/ranked-user.svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Eyebrow, Panel } from '@stream-kit/ui/blueprint';
	import { DataTable } from '@stream-kit/ui/data-table';

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

	function changeClass(entry: PointHistoryEntry): string {
		if (entry.kind === 'set') {
			return 'text-dark-100';
		}

		if (entry.amount > 0) {
			return 'text-success';
		}

		if (entry.amount < 0) {
			return 'text-destructive';
		}

		return 'text-dark-100';
	}
</script>

{#snippet whenCell(entry: PointHistoryEntry)}
	<span class="tabular-nums text-dark-300">{formatWhen(entry)}</span>
{/snippet}

{#snippet sourceCell(entry: PointHistoryEntry)}
	<span class="text-dark-200">{formatSourceLabel(entry.source)}</span>
{/snippet}

{#snippet changeCell(entry: PointHistoryEntry)}
	<span class="tabular-nums font-medium {changeClass(entry)}">{formatChange(entry)}</span>
{/snippet}

{#snippet totalCell(entry: PointHistoryEntry)}
	<span class="tabular-nums text-dark-200">{entry.balanceAfter}</span>
{/snippet}

{#if user && progress}
	<div class="flex flex-col gap-6">
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			<RankingsStatCard icon="ri:coin-line" value={user.totalPoints} label={t('Points')} />
			<Panel tone="flush" class="p-3">
				<div class="flex min-w-0 items-start gap-2.5">
					<div
						class="flex size-8 shrink-0 items-center justify-center border border-rule text-primary"
						aria-hidden="true"
					>
						<span class="text-xs font-semibold">#</span>
					</div>
					<div class="min-w-0 flex-1 space-y-1">
						<p class="truncate text-xs text-dark-300">{t('Rank')}</p>
						<div class="flex flex-wrap items-center gap-1">
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
			</Panel>
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

		<div class="flex flex-col gap-3">
			<Eyebrow>{t('Point history')}</Eyebrow>
			<DataTable
				data={history}
				getRowKey={(entry) => entry.id}
				empty={t('No point history yet.')}
				columns={[
					{ id: 'when', header: t('When'), cell: whenCell },
					{ id: 'source', header: t('Source'), cell: sourceCell },
					{ id: 'change', header: t('Change'), align: 'right', cell: changeCell },
					{ id: 'total', header: t('Total after'), align: 'right', cell: totalCell }
				]}
			/>
		</div>
	</div>
{:else}
	<p class="text-sm text-dark-300">{t('User not found.')}</p>
{/if}
