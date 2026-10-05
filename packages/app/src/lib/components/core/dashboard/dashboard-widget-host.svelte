<script lang="ts">
	import type { DashboardWidgetDefinition } from '#lib/core/dashboard/types.js';

	import { Alert } from '@stream-kit/ui/alert';

	import PluginComponentHost from '#lib/components/core/plugins/plugin-component-host.svelte';
	import { app } from '#lib/core/index.js';

	type Props = {
		definition: DashboardWidgetDefinition;
		unavailable?: boolean;
	};

	let { definition, unavailable = false }: Props = $props();

	const pluginApp = $derived(app.plugins.appApi(app, definition.pluginKey));
	const View = $derived(definition.component);
</script>

{#if unavailable}
	<Alert
		variant="warning"
		icon="ri:plug-disconnected-line"
		title={pluginApp.i18n.t('Widget unavailable')}
		description={definition.title}
	/>
{:else if definition.pluginKey}
	<PluginComponentHost component={definition.component} props={{ app: pluginApp }} />
{:else}
	<View app={pluginApp} />
{/if}
