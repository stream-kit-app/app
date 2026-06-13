<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';

	import { useI18n } from '$lib/i18n';

	type ObsConnection = {
		isConnected: boolean;
		isConnecting: boolean;
		version?: string;
	};

	type Props = {
		twitchConnected: boolean;
		youtubeConnected: boolean;
		youtubeLive: boolean;
		obs: ObsConnection;
		websocketConnected: number;
		websocketTotal: number;
	};

	let {
		twitchConnected,
		youtubeConnected,
		youtubeLive,
		obs,
		websocketConnected,
		websocketTotal
	}: Props = $props();

	const { t } = useI18n();
</script>

<section class="flex flex-col gap-3">
	<h2 class="text-lg font-medium text-dark-50">{t('Connections')}</h2>
	<div class="rounded-xl border border-dark-600 bg-dark-800 p-2">
		<div class="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5">
			<div class="flex min-w-0 items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
					<Icon icon="ri:twitch-line" class="size-4" />
				</div>
				<span class="truncate font-medium text-dark-50">Twitch</span>
			</div>
			<Badge variant={twitchConnected ? 'success' : 'secondary'} class="shrink-0">
				{twitchConnected ? t('Connected') : t('Not connected')}
			</Badge>
		</div>

		<div class="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5">
			<div class="flex min-w-0 items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
					<Icon icon="ri:youtube-line" class="size-4" />
				</div>
				<span class="truncate font-medium text-dark-50">YouTube</span>
			</div>
			<div class="flex shrink-0 items-center gap-2">
				{#if youtubeLive}
					<Badge variant="default">{t('Live')}</Badge>
				{/if}
				<Badge variant={youtubeConnected ? 'success' : 'secondary'}>
					{youtubeConnected ? t('Connected') : t('Not connected')}
				</Badge>
			</div>
		</div>

		<div class="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5">
			<div class="flex min-w-0 items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
					<Icon icon="ri:live-line" class="size-4" />
				</div>
				<span class="truncate font-medium text-dark-50">OBS</span>
			</div>
			<div class="flex shrink-0 items-center gap-2">
				{#if obs.isConnected && obs.version}
					<Badge variant="outline">v{obs.version}</Badge>
				{/if}
				{#if obs.isConnecting}
					<Badge variant="warning">{t('Connecting')}</Badge>
				{:else}
					<Badge variant={obs.isConnected ? 'success' : 'secondary'}>
						{obs.isConnected ? t('Connected') : t('Not connected')}
					</Badge>
				{/if}
			</div>
		</div>

		<div class="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5">
			<div class="flex min-w-0 items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
					<Icon icon="ri:links-line" class="size-4" />
				</div>
				<span class="truncate font-medium text-dark-50">{t('WebSocket connections')}</span>
			</div>
			<Badge variant={websocketConnected > 0 ? 'success' : 'secondary'} class="shrink-0">
				{t('{connected} of {total} connected', {
					connected: websocketConnected,
					total: websocketTotal
				})}
			</Badge>
		</div>
	</div>
</section>
