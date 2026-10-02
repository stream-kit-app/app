<script lang="ts">
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import { WidgetStat } from '@stream-kit/ui/widget';

	import { getApp } from '$lib/core/registry';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);

	const actionStats = $derived.by(() => {
		const items = getApp().actions.items;
		const enabled = items.filter((action) => action.enabled).length;

		return { total: items.length, enabled };
	});
</script>

<WidgetStat
	label={t('Enabled')}
	value={actionStats.enabled}
	total={actionStats.total}
	hint={t('View all actions')}
	href="/actions"
/>
