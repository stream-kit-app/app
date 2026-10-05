<script lang="ts">
	import type { PluginAppApi } from '#lib/core/plugins/app-api.js';
	import type { PluginCustomViewProps } from '#lib/core/plugins/types.js';
	import type { Component } from 'svelte';

	import PluginComponentHost from './plugin-component-host.svelte';

	type Props = PluginCustomViewProps & {
		component: Component<PluginCustomViewProps>;
		app: PluginAppApi;
	};

	let { component, app, title, description }: Props = $props();
</script>

<PluginComponentHost {component} props={{ app, title, description }} />
