<script lang="ts">
	import { Badge } from '@stream-kit/ui/badge';
	import { WidgetList, WidgetRow } from '@stream-kit/ui/widget';

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

<WidgetList>
	<WidgetRow icon="ri:twitch-line" title="Twitch">
		{#snippet trailing()}
			<Badge variant={twitchConnected ? 'success' : 'default'} size="sm">
				{twitchConnected ? t('Connected') : t('Not connected')}
			</Badge>
		{/snippet}
	</WidgetRow>

	<WidgetRow icon="ri:youtube-line" title="YouTube">
		{#snippet trailing()}
			{#if youtubeLive}
				<Badge variant="destructive" size="sm">{t('Live')}</Badge>
			{/if}
			<Badge variant={youtubeConnected ? 'success' : 'default'} size="sm">
				{youtubeConnected ? t('Connected') : t('Not connected')}
			</Badge>
		{/snippet}
	</WidgetRow>

	<WidgetRow
		icon="ri:live-line"
		title="OBS"
		description={obs.isConnected && obs.version ? `v${obs.version}` : undefined}
	>
		{#snippet trailing()}
			{#if obs.isConnecting}
				<Badge variant="warning" size="sm">{t('Connecting')}</Badge>
			{:else}
				<Badge variant={obs.isConnected ? 'success' : 'default'} size="sm">
					{obs.isConnected ? t('Connected') : t('Not connected')}
				</Badge>
			{/if}
		{/snippet}
	</WidgetRow>

	<WidgetRow icon="ri:links-line" title={t('WebSocket connections')}>
		{#snippet trailing()}
			<Badge
				variant={websocketConnected > 0 ? 'success' : 'default'}
				size="sm"
				class="tabular-nums"
			>
				{t('{connected} of {total} connected', {
					connected: websocketConnected,
					total: websocketTotal
				})}
			</Badge>
		{/snippet}
	</WidgetRow>
</WidgetList>
