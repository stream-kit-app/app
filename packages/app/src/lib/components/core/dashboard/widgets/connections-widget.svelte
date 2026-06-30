<script lang="ts">
	import type { ObsPluginApi } from '@stream-kit/plugin-obs';
	import type { WebSocketPluginApi } from '@stream-kit/plugin-websocket';
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import ConnectionsPanel from '../connections-panel.svelte';

	let { app }: PluginWidgetProps = $props();

	let revision = $state(0);

	const twitch = $derived(
		app.plugins.tryGet<{ isConnected?: boolean; subscribe?: (listener: () => void) => () => void }>(
			'twitch'
		)
	);
	const youtube = $derived(
		app.plugins.tryGet<{
			isConnected?: boolean;
			isLive?: boolean;
			subscribe?: (listener: () => void) => () => void;
		}>('youtube')
	);
	const obs = $derived(app.plugins.tryGet<ObsPluginApi>('obs'));
	const websocket = $derived(
		app.plugins.tryGet<{ websocket: WebSocketPluginApi }>('websocket')?.websocket
	);

	$effect(() => {
		const cleanups = [
			twitch?.subscribe?.(() => {
				revision += 1;
			}),
			youtube?.subscribe?.(() => {
				revision += 1;
			}),
			obs?.subscribe?.(() => {
				revision += 1;
			}),
			websocket?.subscribe?.(() => {
				revision += 1;
			})
		];

		return () => {
			for (const cleanup of cleanups) {
				cleanup?.();
			}
		};
	});

	const obsConnection = $derived.by(() => {
		void revision;

		return {
			isConnected: obs?.isConnected ?? false,
			isConnecting: obs?.isConnecting ?? false,
			version: obs?.obsVersion
		};
	});

	const twitchConnected = $derived.by(() => {
		void revision;

		return twitch?.isConnected ?? false;
	});

	const youtubeConnected = $derived.by(() => {
		void revision;

		return youtube?.isConnected ?? false;
	});

	const youtubeLive = $derived.by(() => {
		void revision;

		return youtube?.isLive ?? false;
	});

	const websocketStats = $derived.by(() => {
		void revision;

		if (!websocket) {
			return { connected: 0, total: 0 };
		}

		const connections = websocket.getConnections();
		const connected = connections.filter(
			(connection) => websocket.getConnectionStatus(connection.id) === 'connected'
		).length;

		return { connected, total: connections.length };
	});
</script>

<ConnectionsPanel
	{twitchConnected}
	{youtubeConnected}
	{youtubeLive}
	obs={obsConnection}
	websocketConnected={websocketStats.connected}
	websocketTotal={websocketStats.total}
/>
