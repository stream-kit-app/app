<script lang="ts">
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import StatCard from '../stat-card.svelte';
	import { getApp } from '$lib/core/registry';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);

	const actionStats = $derived.by(() => {
		const items = getApp().actions.items;
		const enabled = items.filter((action) => action.enabled).length;

		return { total: items.length, enabled };
	});

	const value = $derived(
		t('{enabled} of {total} enabled', {
			enabled: actionStats.enabled,
			total: actionStats.total
		})
	);
</script>

<StatCard icon="carbon:trigger" {value} href="/actions" embedded />
