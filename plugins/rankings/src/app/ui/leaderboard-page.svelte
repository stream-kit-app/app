<script lang="ts">
	import type { RankingsPluginApi } from '../../lib/plugin-api';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { InputText } from '@stream-kit/ui/input';

	import { formatWatchTime } from '../../lib/extract-user';
	import { orderRanks, resolveProgress } from '../../lib/ranking-engine';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();

	const t = $derived(app.i18n.t);
	const plugin = $derived(app.plugins.tryGet<RankingsPluginApi>('rankings'));
	const rankings = $derived(plugin?.rankings);
	const leaderboard = $derived(rankings?.getLeaderboard() ?? []);
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

	function getEditValue(userId: string, currentPoints: number) {
		return editPoints[userId] ?? String(currentPoints);
	}

	function setEditValue(userId: string, value: string) {
		editPoints = { ...editPoints, [userId]: value };
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
	}
</script>

<Container class="px-6 py-6" size="md">
	{#if rankings}
		<div class="flex flex-col gap-4">
			<InputText
				label={t('Search')}
				value={search}
				placeholder={t('Search viewers')}
				class="max-w-md"
				oninput={(event) => {
					search = (event.currentTarget as HTMLInputElement).value;
				}}
			/>

			<div class="overflow-hidden rounded-xl border border-dark-600 bg-dark-900">
				<table class="min-w-full text-sm">
					<thead class="border-b border-dark-600 bg-dark-900 text-left text-dark-300">
						<tr>
							<th class="px-4 py-3 font-medium">{t('Viewer')}</th>
							<th class="px-4 py-3 font-medium">{t('Points')}</th>
							<th class="px-4 py-3 font-medium">{t('Rank')}</th>
							<th class="px-4 py-3 font-medium">{t('Watch time')}</th>
							<th class="px-4 py-3 font-medium">{t('Adjust')}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-dark-600">
						{#each filtered as user (user.userId)}
							{@const progress = resolveProgress(user.totalPoints, ordered)}
							<tr>
								<td class="px-4 py-3 text-dark-100">{user.username}</td>
								<td class="px-4 py-3 text-dark-200">{user.totalPoints}</td>
								<td class="px-4 py-3 text-dark-300">
									{progress.rank?.name ?? t('Unranked')} · {progress.tier?.name ?? '—'}
								</td>
								<td class="px-4 py-3 text-dark-300">{formatWatchTime(user.watchTimeSeconds)}</td>
								<td class="px-4 py-3">
									<div class="flex items-center gap-2">
										<InputText
											value={getEditValue(user.userId, user.totalPoints)}
											class="max-w-[8rem]"
											inputmode="numeric"
											oninput={(event) => {
												setEditValue(
													user.userId,
													(event.currentTarget as HTMLInputElement).value
												);
											}}
										/>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onclick={() => void savePoints(user.userId, user.username, user.platform)}
										>
											{t('Save')}
										</Button>
									</div>
								</td>
							</tr>
						{:else}
							<tr>
								<td colspan="5" class="px-4 py-8 text-center text-dark-400">
									{t('No viewers found.')}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else}
		<p class="text-sm text-dark-300">{t('Rankings plugin unavailable.')}</p>
	{/if}
</Container>
