<script lang="ts">
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import StatCard from '../stat-card.svelte';
	import { getApp } from '$lib/core/registry';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);

	const pluginStats = $derived.by(() => {
		const enabledPlugins = getApp().plugins.items.filter((plugin) => plugin.isEnabled);
		const configured = enabledPlugins.filter((plugin) => plugin.isConfigured(getApp())).length;

		return { total: enabledPlugins.length, configured };
	});

	const value = $derived(
		t('{configured} of {total} configured', {
			configured: pluginStats.configured,
			total: pluginStats.total
		})
	);
</script>

<StatCard
	icon="ri:plug-line"
	{value}
	href="/plugins"
	embedded
	description={t('View all plugins')}
/>
