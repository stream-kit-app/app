<script lang="ts">
	import type { BotPluginRegistrationApi } from '../lib/plugin-api';
	import type { PluginWidgetProps } from '@stream-kit/plugin';

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

	const value = $derived(botStats ? String(botStats.commands) : '—');
	const description = $derived(
		botStats ? t('{count} timers', { count: botStats.timers }) : t('Bot plugin unavailable')
	);
</script>

<div class="text-sm">
	<p class="text-2xl font-semibold text-dark-50">{value}</p>
	{#if description}
		<p class="mt-1 text-dark-100">{description}</p>
	{/if}
</div>
