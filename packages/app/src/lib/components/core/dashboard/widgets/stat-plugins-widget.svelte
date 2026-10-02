<script lang="ts">
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import { WidgetStat } from '@stream-kit/ui/widget';

	import { getApp } from '$lib/core/registry';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);

	const pluginStats = $derived.by(() => {
		const enabledPlugins = getApp().plugins.items.filter((plugin) => plugin.isEnabled);
		const configured = enabledPlugins.filter((plugin) => plugin.isConfigured(getApp())).length;

		return { total: enabledPlugins.length, configured };
	});
</script>

<WidgetStat
	label={t('Configured')}
	value={pluginStats.configured}
	total={pluginStats.total}
	hint={t('View all plugins')}
	href="/plugins"
/>
