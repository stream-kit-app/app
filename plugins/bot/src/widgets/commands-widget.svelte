<script lang="ts">
	import type { BotPluginRegistrationApi } from '../lib/plugin-api';
	import type { PluginWidgetProps } from '@stream-kit/plugin';

	import { WidgetStat } from '@stream-kit/ui/widget';

	const BOT_COMMANDS_PATH = '/plugins/bot/bot/commands';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);
	const bot = $derived(app.plugins.tryGet<BotPluginRegistrationApi>('bot'));

	const botStats = $derived.by(() => {
		if (!bot?.commands) {
			return null;
		}

		return {
			commands: bot.commands.items.length,
			timers: bot.timers.items.length
		};
	});
</script>

{#if botStats}
	<WidgetStat
		label={t('Commands')}
		value={botStats.commands}
		hint={t('{count} timers', { count: botStats.timers })}
		href={BOT_COMMANDS_PATH}
	/>
{:else}
	<WidgetStat label={t('Commands')} value="—" hint={t('Bot plugin unavailable')} />
{/if}
