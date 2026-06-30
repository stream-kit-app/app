<script lang="ts">
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import PluginStatusList from '../plugin-status-list.svelte';
	import { getApp } from '$lib/core/registry';

	let { app }: PluginWidgetProps = $props();

	let revision = $state(0);
</script>

<PluginStatusList plugins={getApp().plugins.items} {revision} />
