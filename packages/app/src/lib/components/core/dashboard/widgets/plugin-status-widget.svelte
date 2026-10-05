<script lang="ts">
	import type { PluginWidgetProps } from '#lib/core/plugins/types.js';

	import { getApp } from '#lib/core/registry.js';

	import PluginStatusList from '../plugin-status-list.svelte';

	let { app }: PluginWidgetProps = $props();

	let revision = $state(0);
</script>

<PluginStatusList plugins={getApp().plugins.items} {revision} />
