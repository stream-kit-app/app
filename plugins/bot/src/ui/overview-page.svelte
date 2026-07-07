<script lang="ts">
	import Icon from '@iconify/svelte';

	import type { BotPluginRegistrationApi } from '../lib/plugin-api';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputSwitch, InputText } from '@stream-kit/ui/input';

	import { tryGetCommandsService } from '../commands/app/lib/get-commands';
	import { tryGetModerationService } from '../moderation/app/lib/get-moderation';
	import { tryGetTimersService } from '../timers/app/lib/get-timers';
	import BotSectionCard from './bot-section-card.svelte';
	import BotStatCard from './bot-stat-card.svelte';

	type TwitchPluginApi = {
		readonly isConnected?: boolean;
		readonly subscribe?: (listener: () => void) => () => void;
		readonly botAccount: {
			readonly isConnected: boolean;
			readonly isAuthenticating: boolean;
			readonly userName?: string;
			startOAuth(): Promise<void>;
			disconnect(): Promise<void>;
			subscribe(listener: () => void): () => void;
		};
	};

	type YouTubePluginApi = {
		readonly isConnected?: boolean;
		readonly isLive?: boolean;
		readonly subscribe?: (listener: () => void) => () => void;
	};

	const BOT_BASE_PATH = '/plugins/bot/bot';

	let { app, title, description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	let revision = $state(0);

	const botApi = $derived(app.plugins.tryGet<BotPluginRegistrationApi>('bot'));
	const twitch = $derived(app.plugins.tryGet<TwitchPluginApi>('twitch'));
	const youtube = $derived(app.plugins.tryGet<YouTubePluginApi>('youtube'));
	const commands = $derived(tryGetCommandsService());
	const timers = $derived(tryGetTimersService());
	const moderation = $derived(tryGetModerationService());

	const settings = $derived(botApi?.settings);

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

	const botAccountConnected = $derived.by(() => {
		void revision;

		return twitch?.botAccount.isConnected ?? false;
	});

	const botAccountAuthenticating = $derived.by(() => {
		void revision;

		return twitch?.botAccount.isAuthenticating ?? false;
	});

	const botAccountUserName = $derived.by(() => {
		void revision;

		return twitch?.botAccount.userName;
	});

	const isConfigured = $derived(twitchConnected || youtubeConnected);

	$effect(() => {
		const cleanups = [
			twitch?.subscribe?.(() => {
				revision += 1;
			}),
			twitch?.botAccount.subscribe?.(() => {
				revision += 1;
			}),
			youtube?.subscribe?.(() => {
				revision += 1;
			})
		];

		return () => {
			for (const cleanup of cleanups) {
				cleanup?.();
			}
		};
	});

	async function saveSettings(): Promise<void> {
		const context = app.plugins.getSettingsContext('bot');

		if (!context || !settings) {
			return;
		}

		await settings.save(context.store);
	}
</script>

<Container class="px-6 py-6" size="md">
	<Heading level="1" subTitle={description ?? t('Bot connection and settings')}>
		{title ?? t('Overview')}
	</Heading>

	<div class="mt-8 grid gap-6 lg:grid-cols-2">
		<BotSectionCard
			title={t('Connections')}
			description={!isConfigured
				? t('Connect Twitch or YouTube from the Plugins page to use the bot.')
				: undefined}
		>
			<div class="flex flex-col gap-1 text-sm">
				<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
					<div class="flex min-w-0 items-center gap-3">
						<div
							class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
						>
							<Icon icon="ri:twitch-line" class="size-4" aria-hidden="true" />
						</div>
						<span class="truncate text-dark-100">{t('Twitch')}</span>
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
							<Icon icon="ri:youtube-line" class="size-4" aria-hidden="true" />
						</div>
						<span class="truncate text-dark-100">{t('YouTube')}</span>
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
			</div>
		</BotSectionCard>

		<BotSectionCard
			title={t('Bot account (Twitch)')}
			description={botAccountConnected && botAccountUserName
				? t('Connected as @{username}', { username: botAccountUserName })
				: t('Connect a separate Twitch account for command responses.')}
		>
			{#snippet actions()}
				{#if botAccountConnected}
					<Button variant="outline" size="sm" onclick={() => twitch?.botAccount.disconnect()}>
						{t('Disconnect')}
					</Button>
				{:else}
					<Button
						variant="outline"
						size="sm"
						disabled={botAccountAuthenticating}
						onclick={() => twitch?.botAccount.startOAuth()}
					>
						{botAccountAuthenticating ? t('Connecting…') : t('Connect bot account')}
					</Button>
				{/if}
			{/snippet}

			<div class="grid gap-4">
				<div class="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5">
					<div class="flex min-w-0 items-center gap-3">
						<div
							class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
						>
							<Icon icon="ri:robot-2-line" class="size-4" aria-hidden="true" />
						</div>
						<span class="truncate text-dark-100">{t('Twitch bot account')}</span>
					</div>
					<Badge variant={botAccountConnected ? 'success' : 'default'} size="sm">
						{botAccountConnected ? t('Connected') : t('Not connected')}
					</Badge>
				</div>

				<Alert
					icon="ri:information-line"
					description={t(
						'Your main Twitch account must stay connected for chat and EventSub. Mod the bot account in your channel so it can send messages.'
					)}
				/>
			</div>
		</BotSectionCard>
	</div>

	{#if settings}
		<BotSectionCard class="mt-6" title={t('Bot Settings')}>
			<div class="grid gap-4 sm:grid-cols-2">
				<InputSwitch
					label={t('Bot enabled')}
					bind:checked={
						() => settings.enabled,
						(value) => {
							settings.enabled = value;
							void saveSettings();
						}
					}
				/>
				<InputText
					label={t('Command prefix')}
					value={settings.prefix}
					onchange={(event) => {
						settings.prefix = (event.currentTarget as HTMLInputElement).value;
						void saveSettings();
					}}
				/>
				<InputSwitch
					label={t('Auto-moderation enabled')}
					bind:checked={
						() => settings.moderationEnabled,
						(value) => {
							settings.moderationEnabled = value;
							void saveSettings();
						}
					}
				/>
				<InputSwitch
					label={t('Send responses as bot account')}
					bind:checked={
						() => settings.sendAsBot,
						(value) => {
							settings.sendAsBot = value;
							void saveSettings();
						}
					}
				/>
				<InputSwitch
					label={t('Twitch chat')}
					bind:checked={
						() => settings.platforms.twitch,
						(value) => {
							settings.platforms.twitch = value;
							void saveSettings();
						}
					}
				/>
				<InputSwitch
					label={t('YouTube chat')}
					bind:checked={
						() => settings.platforms.youtube,
						(value) => {
							settings.platforms.youtube = value;
							void saveSettings();
						}
					}
				/>
			</div>
		</BotSectionCard>
	{/if}

	<section class="mt-6 grid gap-4">
		<h2 class="text-base font-semibold text-dark-50">{t('Summary')}</h2>
		<div class="grid gap-3 sm:grid-cols-3">
			<BotStatCard
				icon="ri:terminal-box-line"
				value={commands?.items.length ?? 0}
				label={t('Commands')}
				description={t('Manage chat commands')}
				href={`${BOT_BASE_PATH}/commands`}
			/>
			<BotStatCard
				icon="ri:timer-line"
				value={timers?.items.length ?? 0}
				label={t('Timers')}
				description={t('Schedule automatic messages')}
				href={`${BOT_BASE_PATH}/timers`}
			/>
			<BotStatCard
				icon="ri:shield-check-line"
				value={moderation?.items.length ?? 0}
				label={t('Moderation rules')}
				description={t('Configure auto-moderation')}
				href={`${BOT_BASE_PATH}/moderation`}
			/>
		</div>
	</section>
</Container>
