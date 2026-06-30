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

<div class="flex flex-col gap-2 text-sm">
	<div class="flex items-center justify-between gap-3">
		<div class="flex min-w-0 items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
				<Icon icon="ri:twitch-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">Twitch</span>
		</div>
		<Badge variant={twitchConnected ? 'success' : 'default'} class="shrink-0">
			{twitchConnected ? t('Connected') : t('Not connected')}
		</Badge>
	</div>

	<div class="flex items-center justify-between gap-3">
		<div class="flex min-w-0 items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
				<Icon icon="ri:youtube-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">YouTube</span>
		</div>
		<div class="flex shrink-0 items-center gap-2">
			{#if youtubeLive}
				<Badge variant="default">{t('Live')}</Badge>
			{/if}
			<Badge variant={youtubeConnected ? 'success' : 'default'}>
				{youtubeConnected ? t('Connected') : t('Not connected')}
			</Badge>
		</div>
	</div>

	<div class="flex items-center justify-between gap-3">
		<div class="flex min-w-0 items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
				<Icon icon="ri:live-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">OBS</span>
		</div>
		<div class="flex shrink-0 items-center gap-2">
			{#if obs.isConnected && obs.version}
				<Badge variant="outline">v{obs.version}</Badge>
			{/if}
			{#if obs.isConnecting}
				<Badge variant="warning">{t('Connecting')}</Badge>
			{:else}
				<Badge variant={obs.isConnected ? 'success' : 'default'}>
					{obs.isConnected ? t('Connected') : t('Not connected')}
				</Badge>
			{/if}
		</div>
	</div>

	<div class="flex items-center justify-between gap-3">
		<div class="flex min-w-0 items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-700">
				<Icon icon="ri:links-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">{t('WebSocket connections')}</span>
		</div>
		<Badge variant={websocketConnected > 0 ? 'success' : 'default'} class="shrink-0">
			{t('{connected} of {total} connected', {
				connected: websocketConnected,
				total: websocketTotal
			})}
		</Badge>
	</div>
</div>
