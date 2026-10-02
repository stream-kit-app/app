<script lang="ts">
	import type { PointHistoryEntry } from '../../lib/types';
	import type { RankedUser } from '../lib/ranked-user.svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { CellGrid, Eyebrow } from '@stream-kit/ui/blueprint';
	import { DataTable } from '@stream-kit/ui/data-table';

	import { formatWatchTime } from '../../lib/extract-user';
	import { orderRanks, resolveProgress } from '../../lib/ranking-engine';
	import { formatSourceLabel } from '../../lib/source-labels';
	import { getRankingsService } from '../lib/get-rankings';
	import { platformIcon } from '../lib/leaderboard-format';
	import RankingsStatCell from './rankings-stat-cell.svelte';

	type Props = {
		rankedUser: RankedUser;
	};

	let { rankedUser }: Props = $props();

	const rankings = getRankingsService();
	const app = rankings.requireApp();
	const t = app.i18n.t;

	const user = $derived(rankings.getUser(rankedUser.userId));
	const history = $derived(rankings.getUserHistory(rankedUser.userId));
	const position = $derived(rankings.getUserLeaderboardPosition(rankedUser.userId));
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
		<CellGrid cols={4}>
			<RankingsStatCell
				icon="ri:coin-line"
				label={t('Points')}
				value={user.totalPoints.toLocaleString()}
				description={position != null ? t('#{position} on the leaderboard', { position }) : undefined}
			/>
			<RankingsStatCell icon="ri:award-line" label={t('Rank')}>
				<div class="flex min-h-8 flex-wrap items-center gap-1">
					{#if progress.rank}
						<Badge variant="secondary">{progress.rank.name}</Badge>
					{:else}
						<Badge variant="outline">{t('Unranked')}</Badge>
					{/if}
					{#if progress.tier}
						<Badge variant="outline">{progress.tier.name}</Badge>
					{/if}
				</div>
			</RankingsStatCell>
			<RankingsStatCell
				icon="ri:time-line"
				label={t('Watch time')}
				value={formatWatchTime(user.watchTimeSeconds)}
			/>
			<RankingsStatCell
				icon={platformIcon(user.platform)}
				label={t('Platform')}
				value={user.platform.charAt(0).toUpperCase() + user.platform.slice(1)}
			/>
		</CellGrid>

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
