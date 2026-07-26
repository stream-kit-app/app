<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputText } from '@stream-kit/ui/input';

	import { formatWatchTime } from '../../lib/extract-user';
	import { orderRanks, resolveProgress, sortUsersByPoints } from '../../lib/ranking-engine';
	import { tryGetRankingsService } from '../lib/get-rankings';
	import { RankedUser } from '../lib/ranked-user.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const rankings = $derived(tryGetRankingsService());
	const leaderboard = $derived(rankings ? sortUsersByPoints(rankings.users) : []);
	const ignoredUsers = $derived(rankings ? rankings.ignoredUsers : []);
	const ordered = $derived(rankings ? orderRanks(rankings.tiers, rankings.ranks) : []);

	let search = $state('');
	let editPoints = $state<Record<string, string>>({});

	const filtered = $derived.by(() => {
		const query = search.trim().toLowerCase();

		if (!query) {
			return leaderboard;
		}

		return leaderboard.filter((user) => user.username.toLowerCase().includes(query));
	});

	function platformIcon(platform: 'twitch' | 'youtube' | 'unknown'): string {
		switch (platform) {
			case 'twitch':
				return 'ri:twitch-line';
			case 'youtube':
				return 'ri:youtube-line';
			default:
				return 'ri:user-line';
		}
	}

	function getEditValue(userId: string, currentPoints: number) {
		return editPoints[userId] ?? String(currentPoints);
	}

	function setEditValue(userId: string, value: string) {
		editPoints = { ...editPoints, [userId]: value };
	}

	function clearEditValue(userId: string) {
		if (!(userId in editPoints)) {
			return;
		}

		const { [userId]: _removed, ...rest } = editPoints;
		editPoints = rest;
	}

	async function savePoints(
		userId: string,
		username: string,
		platform: 'twitch' | 'youtube' | 'unknown'
	) {
		if (!rankings) {
			return;
		}

		const amount = Number(getEditValue(userId, 0));

		if (!Number.isFinite(amount)) {
			app.toast.create({
				title: t('Points must be a valid number'),
				variant: 'warning'
			});
			return;
		}

		await rankings.setPoints({
			userId,
			username,
			platform,
			amount: Math.max(0, Math.floor(amount)),
			source: 'manual'
		});
		clearEditValue(userId);
	}

	function openUser(user: (typeof filtered)[number]) {
		RankedUser.fromRecord(user).open();
	}

	async function deleteUser(userId: string, username: string) {
		if (!rankings) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Remove user from rankings?'),
			description: t(
				'Are you sure you want to remove {name} from rankings? Their points and history will be deleted. This cannot be undone.',
				{ name: username }
			),
			confirmLabel: t('Remove')
		});

		if (!confirmed) {
			return;
		}

		try {
			await rankings.deleteUser(userId);
			clearEditValue(userId);
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

	async function ignoreUser(userId: string, username: string) {
		if (!rankings) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Ignore user from rankings?'),
			description: t(
				'Are you sure you want to ignore {name}? Their points and history will be deleted, and they will not earn points until you un-ignore them.',
				{ name: username }
			),
			confirmLabel: t('Ignore')
		});

		if (!confirmed) {
			return;
		}

		try {
			await rankings.ignoreUser(userId);
			clearEditValue(userId);
			app.toast.create({
				title: t('User ignored'),
				description: t('{name} will no longer earn rankings points.', { name: username }),
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

	async function unignoreUser(userId: string, username: string) {
		if (!rankings) {
			return;
		}

		try {
			await rankings.unignoreUser(userId);
			app.toast.create({
				title: t('User un-ignored'),
				description: t('{name} can earn rankings points again.', { name: username }),
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
</script>

{#if !rankings}
	<Container class="px-6 py-6" size="md">
		<p class="text-sm text-dark-300">{t('Rankings plugin unavailable.')}</p>
	</Container>
{:else}
	<div class="flex min-h-full flex-1 flex-col">
		{#if leaderboard.length > 0}
			<Container class="shrink-0 px-6 pt-6" size="md">
				<InputText
					label={t('Search')}
					value={search}
					placeholder={t('Search users')}
					class="max-w-md"
					oninput={(event) => {
						search = (event.currentTarget as HTMLInputElement).value;
					}}
				/>
			</Container>
			{#if filtered.length === 0}
				<EmptyState
					icon="ri:trophy-line"
					title={t('No users found.')}
					description={t('Try a different search term.')}
				/>
			{:else}
				<Container class="px-6 py-6" size="md">
					<ul class="flex flex-col gap-2">
						{#each filtered as user, index (user.userId)}
							{@const progress = resolveProgress(user.totalPoints, ordered)}
							<li
								class="grid grid-cols-1 gap-3 rounded-xl border border-dark-600 bg-dark-800 p-3 transition-colors hover:border-dark-500 sm:grid-cols-[1fr_auto] sm:items-center"
							>
								<button
									type="button"
									class="group flex min-w-0 cursor-pointer items-center gap-3 text-left"
									onclick={() => openUser(user)}
								>
									<span
										class="grid size-8 shrink-0 place-items-center rounded-md bg-dark-900 text-xs font-medium text-dark-300"
										aria-hidden="true"
									>
										{index + 1}
									</span>
									<div
										class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
										aria-hidden="true"
									>
										<Icon icon={platformIcon(user.platform)} class="size-5" />
									</div>
									<div class="min-w-0 flex-1">
										<p class="truncate font-medium text-dark-50 group-hover:text-primary">
											{user.username}
										</p>
										<p class="truncate text-sm text-dark-300">
											{user.totalPoints} pts · {formatWatchTime(user.watchTimeSeconds)}
										</p>
									</div>
									<div class="flex shrink-0 flex-wrap justify-end gap-1">
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

								<div class="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
									<InputText
										value={getEditValue(user.userId, user.totalPoints)}
										class="max-w-28"
										aria-label={t('Adjust')}
										inputmode="numeric"
										oninput={(event) => {
											setEditValue(
												user.userId,
												(event.currentTarget as HTMLInputElement).value
											);
										}}
										size="sm"
									/>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onclick={() => void savePoints(user.userId, user.username, user.platform)}
									>
										{t('Save')}
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="icon-sm"
										icon="ri:eye-off-line"
										aria-label={t('Ignore user')}
										onclick={() => void ignoreUser(user.userId, user.username)}
										{@attach tooltip(() => t('Ignore user'))}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon-sm"
										icon="ri:delete-bin-line"
										aria-label={t('Remove user')}
										onclick={() => void deleteUser(user.userId, user.username)}
										{@attach tooltip(() => t('Remove user'))}
									/>
								</div>
							</li>
						{/each}
					</ul>
				</Container>
			{/if}
		{:else}
			<EmptyState
				icon="ri:trophy-line"
				title={t('No users ranked yet.')}
				description={t('Users will appear here as they earn points.')}
			/>
		{/if}

		{#if ignoredUsers.length > 0}
			<Container class="px-6 py-6" size="md">
				<div class="flex flex-col gap-3">
					<Heading
						level={3}
						class="text-dark-50"
						subTitle={t('These users will not earn points until you un-ignore them.')}
					>
						{t('Ignored users')}
					</Heading>
					<ul class="flex flex-col gap-2">
						{#each ignoredUsers as user (user.userId)}
							<li
								class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dark-600 bg-dark-800 p-3"
							>
								<div class="flex min-w-0 items-center gap-3">
									<div
										class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-dark-300"
										aria-hidden="true"
									>
										<Icon icon={platformIcon(user.platform)} class="size-5" />
									</div>
									<div class="min-w-0">
										<p class="truncate font-medium text-dark-50">{user.username}</p>
										<p class="truncate text-sm text-dark-300">{t('Ignored')}</p>
									</div>
								</div>
								<Button
									type="button"
									variant="outline"
									size="sm"
									icon="ri:eye-line"
									onclick={() => void unignoreUser(user.userId, user.username)}
								>
									{t('Un-ignore')}
								</Button>
							</li>
						{/each}
					</ul>
				</div>
			</Container>
		{/if}
	</div>
{/if}
