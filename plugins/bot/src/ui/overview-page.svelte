<script lang="ts">
	import type { BotPluginRegistrationApi } from '../lib/plugin-api';
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Badge } from '@stream-kit/ui/badge';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputSwitch, InputText } from '@stream-kit/ui/input';

	import { tryGetCommandsService } from '../commands/app/lib/get-commands';
	import { tryGetModerationService } from '../moderation/app/lib/get-moderation';
	import { tryGetTimersService } from '../timers/app/lib/get-timers';

	let { app, title, description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const botApi = $derived(app.plugins.tryGet<BotPluginRegistrationApi>('bot'));
	const twitch = $derived(app.plugins.tryGet<{ isConnected?: boolean }>('twitch'));
	const youtube = $derived(
		app.plugins.tryGet<{ isConnected?: boolean; isLive?: boolean }>('youtube')
	);
	const commands = $derived(tryGetCommandsService());
	const timers = $derived(tryGetTimersService());
	const moderation = $derived(tryGetModerationService());

	const settings = $derived(botApi?.settings);
	const isConfigured = $derived(Boolean(twitch?.isConnected || youtube?.isConnected));

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

	<section class="mt-8 grid gap-4">
		<h2 class="text-lg font-medium text-dark-50">{t('Connections')}</h2>
		<div class="border-border-dark-600 grid gap-3 rounded-xl border bg-dark-800 p-4">
			<div class="flex items-center justify-between gap-4">
				<span>Twitch</span>
				<Badge variant={twitch?.isConnected ? 'default' : 'secondary'}>
					{twitch?.isConnected ? t('Connected') : t('Not connected')}
				</Badge>
			</div>
			<div class="flex items-center justify-between gap-4">
				<span>YouTube</span>
				<div class="flex items-center gap-2">
					{#if youtube?.isLive}
						<Badge variant="default">{t('Live')}</Badge>
					{/if}
					<Badge variant={youtube?.isConnected ? 'default' : 'secondary'}>
						{youtube?.isConnected ? t('Connected') : t('Not connected')}
					</Badge>
				</div>
			</div>
		</div>
		{#if !isConfigured}
			<p class="text-sm text-dark-300">
				{t('Connect Twitch or YouTube from the Plugins page to use the bot.')}
			</p>
		{/if}
	</section>

	{#if settings}
		<section class="mt-8 grid gap-4">
			<h2 class="text-lg font-medium text-dark-50">{t('Bot Settings')}</h2>
			<div class="border-border-dark-600 grid gap-4 rounded-xl border bg-dark-800 p-4">
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
		</section>
	{/if}

	<section class="mt-8 grid gap-4">
		<h2 class="text-lg font-medium text-dark-50">{t('Summary')}</h2>
		<div class="grid gap-3 sm:grid-cols-3">
			<div class="border-border-dark-600 rounded-xl border bg-dark-800 p-4">
				<p class="text-2xl font-semibold">{commands?.items.length ?? 0}</p>
				<p class="text-sm text-dark-300">{t('Commands')}</p>
			</div>
			<div class="border-border-dark-600 rounded-xl border bg-dark-800 p-4">
				<p class="text-2xl font-semibold">{timers?.items.length ?? 0}</p>
				<p class="text-sm text-dark-300">{t('Timers')}</p>
			</div>
			<div class="border-border-dark-600 rounded-xl border bg-dark-800 p-4">
				<p class="text-2xl font-semibold">{moderation?.items.length ?? 0}</p>
				<p class="text-sm text-dark-300">{t('Moderation rules')}</p>
			</div>
		</div>
	</section>
</Container>
