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

<div class="flex flex-col gap-1 text-sm">
	<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
		<div class="flex min-w-0 items-center gap-3">
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon icon="ri:twitch-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">Twitch</span>
		</div>
		<Badge variant={twitchConnected ? 'success' : 'default'} size="sm" class="shrink-0">
			{twitchConnected ? t('Connected') : t('Not connected')}
		</Badge>
	</div>

	<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
		<div class="flex min-w-0 items-center gap-3">
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon icon="ri:youtube-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">YouTube</span>
		</div>
		<div class="flex shrink-0 items-center gap-1.5">
			{#if youtubeLive}
				<Badge variant="default" size="sm">{t('Live')}</Badge>
			{/if}
			<Badge variant={youtubeConnected ? 'success' : 'default'} size="sm">
				{youtubeConnected ? t('Connected') : t('Not connected')}
			</Badge>
		</div>
	</div>

	<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
		<div class="flex min-w-0 items-center gap-3">
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon icon="ri:live-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">OBS</span>
		</div>
		<div class="flex shrink-0 items-center gap-1.5">
			{#if obs.isConnected && obs.version}
				<Badge variant="outline" size="sm">v{obs.version}</Badge>
			{/if}
			{#if obs.isConnecting}
				<Badge variant="warning" size="sm">{t('Connecting')}</Badge>
			{:else}
				<Badge variant={obs.isConnected ? 'success' : 'default'} size="sm">
					{obs.isConnected ? t('Connected') : t('Not connected')}
				</Badge>
			{/if}
		</div>
	</div>

	<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
		<div class="flex min-w-0 items-center gap-3">
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon icon="ri:links-line" class="size-4" />
			</div>
			<span class="truncate text-dark-100">{t('WebSocket connections')}</span>
		</div>
		<Badge variant={websocketConnected > 0 ? 'success' : 'default'} size="sm" class="shrink-0">
			{t('{connected} of {total} connected', {
				connected: websocketConnected,
				total: websocketTotal
			})}
		</Badge>
	</div>
</div>
