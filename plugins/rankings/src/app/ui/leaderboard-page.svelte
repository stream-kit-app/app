<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import type { NextRankProgress } from '../../lib/ranking-engine';
	import type { IgnoredUserRecord, RankProgress, UserRankingRecord } from '../../lib/types';

	import Icon from '@iconify/svelte';

	import { cn } from '@stream-kit/plugin/utils';
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { DataTable } from '@stream-kit/ui/data-table';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';

	import { formatWatchTime } from '../../lib/extract-user';
	import {
		orderRanks,
		resolveNextRankProgress,
		resolveProgress,
		sortUsersByPoints
	} from '../../lib/ranking-engine';
	import { tryGetRankingsService } from '../lib/get-rankings';
	import { PointsEditor } from '../lib/points-editor.svelte';
	import { RankedUser } from '../lib/ranked-user.svelte';
	import { platformIcon, podiumClass } from '../lib/leaderboard-format';
	import RankIcon from './rank-icon.svelte';

	type LeaderboardRow = {
		user: UserRankingRecord;
		position: number;
		progress: RankProgress;
		next: NextRankProgress;
	};

	const PAGE_SIZE = 50;

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const leaderboard = $derived(rankings ? sortUsersByPoints(rankings.users) : []);
	const ignoredUsers = $derived(rankings ? rankings.ignoredUsers : []);
	const ordered = $derived(rankings ? orderRanks(rankings.tiers, rankings.ranks) : []);

	let search = $state('');
	let visibleCount = $state(PAGE_SIZE);

	const filtered = $derived.by(() => {
		const query = search.trim().toLowerCase();
		const rows = leaderboard.map((user, index) => ({ user, position: index + 1 }));

		if (!query) {
			return rows;
		}

		return rows.filter(({ user }) => user.username.toLowerCase().includes(query));
	});

	// Progress is only resolved for rows on screen; large chats can have thousands of users.
	const rows = $derived<LeaderboardRow[]>(
		filtered.slice(0, visibleCount).map(({ user, position }) => ({
			user,
			position,
			progress: resolveProgress(user.totalPoints, ordered),
			next: resolveNextRankProgress(user.totalPoints, ordered)
		}))
	);

	$effect(() => {
		app.toolbar.set({
			meta:
				leaderboard.length > 0
					? [
							{
								icon: 'ri:group-line',
								label: t('{count} users', { count: leaderboard.length })
							}
						]
					: [],
			primaryActions: []
		});
	});

	function openUser(user: UserRankingRecord) {
		RankedUser.fromRecord(user).open();
	}

	function editPoints(user: UserRankingRecord) {
		PointsEditor.fromRecord(user).open();
	}

	async function deleteUser(user: UserRankingRecord) {
		if (!rankings) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Remove user from rankings?'),
			description: t(
				'Are you sure you want to remove {name} from rankings? Their points and history will be deleted. This cannot be undone.',
				{ name: user.username }
			),
			confirmLabel: t('Remove')
		});

		if (!confirmed) {
			return;
		}

		try {
			await rankings.deleteUser(user.userId);
			app.toast.create({
				title: t('User removed'),
				description: t('The user has been removed from rankings'),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Could not remove user'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}

	async function ignoreUser(user: UserRankingRecord) {
		if (!rankings) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Ignore user from rankings?'),
			description: t(
				'Are you sure you want to ignore {name}? Their points and history will be deleted, and they will not earn points until you un-ignore them.',
				{ name: user.username }
			),
			confirmLabel: t('Ignore')
		});

		if (!confirmed) {
			return;
		}

		try {
			await rankings.ignoreUser(user.userId);
			app.toast.create({
				title: t('User ignored'),
				description: t('{name} will no longer earn rankings points.', { name: user.username }),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Could not ignore user'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}

	async function unignoreUser(user: IgnoredUserRecord) {
		if (!rankings) {
			return;
		}

		try {
			await rankings.unignoreUser(user.userId);
			app.toast.create({
				title: t('User un-ignored'),
				description: t('{name} can earn rankings points again.', { name: user.username }),
				variant: 'success'
			});
		} catch (error) {
			app.toast.create({
				title: t('Could not un-ignore user'),
				description: error instanceof Error ? error.message : String(error),
				variant: 'warning'
			});
		}
	}

	function formatDate(value: string): string {
		const date = new Date(value);

		return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
	}
</script>

{#snippet positionCell(row: LeaderboardRow)}
	<span
		class={cn(
			'inline-flex items-center gap-1 font-mono text-sm font-semibold tabular-nums',
			podiumClass(row.position) ?? 'text-dark-300'
		)}
	>
		{#if podiumClass(row.position)}
			<Icon icon="ri:trophy-fill" class="size-3.5" aria-hidden="true" />
		{/if}
		{row.position}
	</span>
{/snippet}

{#snippet userCell(row: LeaderboardRow)}
	<button
		type="button"
		class="group flex min-w-0 cursor-pointer items-center gap-3 text-left"
		onclick={() => openUser(row.user)}
	>
		<RankIcon icon={row.progress.rank?.icon} size="sm" />
		<span class="flex min-w-0 flex-col">
			<span class="truncate font-medium text-dark-50 group-hover:text-primary">
				{row.user.username}
			</span>
			<span class="flex items-center gap-1 text-xs text-dark-400">
				<Icon icon={platformIcon(row.user.platform)} class="size-3.5" aria-hidden="true" />
				{formatWatchTime(row.user.watchTimeSeconds)}
			</span>
		</span>
	</button>
{/snippet}

{#snippet rankCell(row: LeaderboardRow)}
	<div class="flex flex-wrap items-center gap-1">
		{#if row.progress.rank}
			<Badge variant="secondary" size="sm">{row.progress.rank.name}</Badge>
		{:else}
			<Badge variant="outline" size="sm">{t('Unranked')}</Badge>
		{/if}
		{#if row.progress.tier}
			<Badge variant="outline" size="sm">{row.progress.tier.name}</Badge>
		{/if}
	</div>
{/snippet}

{#snippet progressCell(row: LeaderboardRow)}
	<div class="flex min-w-32 flex-col gap-1.5">
		<div class="h-1.5 overflow-hidden rounded-full bg-dark-700">
			<div class="h-full rounded-full bg-primary" style:width="{row.next.percent}%"></div>
		</div>
		<span class="truncate text-xs text-dark-400">
			{#if row.next.next}
				{t('{points} to {rank}', {
					points: row.next.pointsToNext,
					rank: row.next.next.rank.name
				})}
			{:else}
				{t('Highest rank')}
			{/if}
		</span>
	</div>
{/snippet}

{#snippet pointsCell(row: LeaderboardRow)}
	<span class="font-mono font-semibold text-dark-50 tabular-nums">
		{row.user.totalPoints.toLocaleString()}
	</span>
{/snippet}

{#snippet actionsCell(row: LeaderboardRow)}
	<div class="flex items-center justify-end gap-1">
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:edit-line"
			aria-label={t('Edit points')}
			onclick={() => editPoints(row.user)}
			{@attach tooltip(() => t('Edit points'))}
		/>
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:eye-off-line"
			aria-label={t('Ignore user')}
			onclick={() => void ignoreUser(row.user)}
			{@attach tooltip(() => t('Ignore user'))}
		/>
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			icon="ri:delete-bin-line"
			aria-label={t('Remove user')}
			onclick={() => void deleteUser(row.user)}
			{@attach tooltip(() => t('Remove user'))}
		/>
	</div>
{/snippet}

{#snippet ignoredUserCell(user: IgnoredUserRecord)}
	<span class="flex min-w-0 items-center gap-2">
		<Icon icon={platformIcon(user.platform)} class="size-4 text-dark-400" aria-hidden="true" />
		<span class="truncate font-medium text-dark-100">{user.username}</span>
	</span>
{/snippet}

{#snippet ignoredAtCell(user: IgnoredUserRecord)}
	<span class="text-dark-400 tabular-nums">{formatDate(user.ignoredAt)}</span>
{/snippet}

{#snippet ignoredActionsCell(user: IgnoredUserRecord)}
	<Button
		type="button"
		variant="outline"
		size="sm"
		icon="ri:eye-line"
		onclick={() => void unignoreUser(user)}
	>
		{t('Un-ignore')}
	</Button>
{/snippet}

{#if !rankings}
	<EmptyState
		icon="ri:plug-disconnected-line"
		title={t('Rankings plugin unavailable')}
		description={t('Enable the Rankings plugin to see the leaderboard.')}
	/>
{:else if leaderboard.length === 0 && ignoredUsers.length === 0}
	<EmptyState
		icon="ri:trophy-line"
		title={t('No users ranked yet.')}
		description={t('Users will appear here as they earn points.')}
	/>
{:else}
	<Container class="px-6 py-6" size="md">
		<div class="flex flex-col gap-6">
			{#if leaderboard.length > 0}
				<div class="flex flex-col gap-4">
					<InputText
						label={t('Search')}
						value={search}
						placeholder={t('Search users')}
						prependIcon="ri:search-line"
						class="max-w-md"
						oninput={(event) => {
							search = (event.currentTarget as HTMLInputElement).value;
							visibleCount = PAGE_SIZE;
						}}
					/>

					{#if filtered.length === 0}
						<EmptyState
							compact
							icon="ri:search-line"
							title={t('No users found.')}
							description={t('Try a different search term.')}
						/>
					{:else}
						<DataTable
							data={rows}
							getRowKey={(row) => row.user.userId}
							empty={t('No users found.')}
							maxHeight="max-h-none"
							columns={[
								{ id: 'position', header: '#', cell: positionCell, class: 'w-16' },
								{ id: 'user', header: t('User'), cell: userCell },
								{ id: 'rank', header: t('Rank'), cell: rankCell, class: 'w-48' },
								{
									id: 'progress',
									header: t('Next rank'),
									cell: progressCell,
									class: 'w-48 max-lg:hidden'
								},
								{
									id: 'points',
									header: t('Points'),
									align: 'right',
									cell: pointsCell,
									class: 'w-28'
								},
								{
									id: 'actions',
									header: '',
									align: 'right',
									cell: actionsCell,
									class: 'w-32'
								}
							]}
						/>

						{#if filtered.length > PAGE_SIZE}
							<div class="flex items-center justify-between gap-3">
								<span class="text-sm text-dark-400 tabular-nums">
									{t('Showing {shown} of {total}', {
										shown: Math.min(visibleCount, filtered.length),
										total: filtered.length
									})}
								</span>
								<div class="flex items-center gap-2">
									{#if visibleCount > PAGE_SIZE}
										<Button
											type="button"
											variant="ghost"
											size="sm"
											icon="ri:arrow-up-line"
											onclick={() => {
												visibleCount = Math.max(PAGE_SIZE, visibleCount - PAGE_SIZE);
											}}
										>
											{t('Show less')}
										</Button>
									{/if}
									{#if filtered.length > visibleCount}
										<Button
											type="button"
											variant="outline"
											size="sm"
											icon="ri:arrow-down-line"
											onclick={() => {
												visibleCount += PAGE_SIZE;
											}}
										>
											{t('Show more')}
										</Button>
									{/if}
								</div>
							</div>
						{/if}
					{/if}
				</div>
			{:else}
				<EmptyState
					compact
					icon="ri:trophy-line"
					title={t('No users ranked yet.')}
					description={t('Users will appear here as they earn points.')}
				/>
			{/if}

			{#if ignoredUsers.length > 0}
				<div class="flex flex-col gap-2">
					<DataTable
						title={t('Ignored users')}
						data={ignoredUsers}
						getRowKey={(user) => user.userId}
						empty={t('No ignored users.')}
						maxHeight="max-h-80"
						columns={[
							{ id: 'user', header: t('User'), cell: ignoredUserCell },
							{
								id: 'ignoredAt',
								header: t('Ignored since'),
								cell: ignoredAtCell,
								class: 'w-40'
							},
							{
								id: 'actions',
								header: '',
								align: 'right',
								cell: ignoredActionsCell,
								class: 'w-36'
							}
						]}
					/>
					<p class="text-xs text-dark-400">
						{t('These users will not earn points until you un-ignore them.')}
					</p>
				</div>
			{/if}
		</div>
	</Container>
{/if}
