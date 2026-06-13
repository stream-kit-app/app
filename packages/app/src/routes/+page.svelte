<script lang="ts">
	import type { CorePluginApi } from '@stream-kit/app/api';
	import type { BotPluginRegistrationApi } from '@stream-kit/plugin-bot';
	import type { ObsPluginApi } from '@stream-kit/plugin-obs';
	import type { WebSocketPluginApi } from '@stream-kit/plugin-websocket';

	import {
		ConnectionsPanel,
		PluginStatusList,
		StatCard
	} from '$lib/components/core/dashboard';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let revision = $state(0);

	const core = $derived(app.plugins.tryGet<CorePluginApi>('core'));
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
	const bot = $derived(app.plugins.tryGet<BotPluginRegistrationApi>('bot'));

	$effect(() => {
		const cleanups: Array<(() => void) | undefined> = [
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

		const logsApi = core?.logs;

		if (logsApi) {
			revision = logsApi.revision;
			cleanups.push(
				logsApi.subscribe(() => {
					revision = logsApi.revision;
				})
			);
		}

		return () => {
			for (const cleanup of cleanups) {
				cleanup?.();
			}
		};
	});

	const actionStats = $derived.by(() => {
		void revision;

		const items = app.actions.items;
		const enabled = items.filter((action) => action.enabled).length;

		return { total: items.length, enabled };
	});

	const pluginStats = $derived.by(() => {
		void revision;

		const enabledPlugins = app.plugins.items.filter((plugin) => plugin.isEnabled);
		const configured = enabledPlugins.filter((plugin) => plugin.isConfigured(app)).length;

		return { total: enabledPlugins.length, configured };
	});

	const botStats = $derived.by(() => {
		void revision;

		if (!bot?.commands) {
			return null;
		}

		return {
			commands: bot.commands.items.length,
			timers: bot.timers.items.length
		};
	});

	const logCount = $derived.by(() => {
		void revision;

		return core?.logs.getEntries().length ?? 0;
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

	const actionStatValue = $derived(
		t('{enabled} of {total} enabled', {
			enabled: actionStats.enabled,
			total: actionStats.total
		})
	);

	const pluginStatValue = $derived(
		t('{configured} of {total} configured', {
			configured: pluginStats.configured,
			total: pluginStats.total
		})
	);

	const botStatValue = $derived(botStats ? String(botStats.commands) : '—');

	const botStatDescription = $derived(
		botStats
			? t('{count} timers', { count: botStats.timers })
			: t('Bot plugin unavailable')
	);
</script>

<Container class="px-6 py-6" size="md">
	<Heading level="1" subTitle={t('Your streaming automation at a glance')} class="mb-8">
		{t('Dashboard')}
	</Heading>

	<section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
		<StatCard
			icon="carbon:trigger"
			value={actionStatValue}
			label={t('Actions')}
			href="/actions"
		/>
		<StatCard
			icon="ri:plug-line"
			value={pluginStatValue}
			label={t('Plugins')}
			href="/plugins"
		/>
		<StatCard
			icon="ri:robot-2-line"
			value={botStatValue}
			label={t('Commands')}
			description={botStatDescription}
		/>
		<StatCard
			icon="ri:file-list-3-line"
			value={String(logCount)}
			label={t('Log entries')}
			href="/logs"
		/>
	</section>

	<div class="mt-8 grid items-start gap-6 lg:grid-cols-2">
		<ConnectionsPanel
			{twitchConnected}
			{youtubeConnected}
			{youtubeLive}
			obs={obsConnection}
			websocketConnected={websocketStats.connected}
			websocketTotal={websocketStats.total}
		/>
		<PluginStatusList plugins={app.plugins.items} {revision} />
	</div>
</Container>
