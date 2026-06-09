<script lang="ts">
	import type { PageProps } from './$types';

	import PluginMenuPage from '$lib/components/core/plugins/plugin-menu-page.svelte';

	const { data }: PageProps = $props();
</script>

<PluginMenuPage
	pluginKey={data.pluginKey}
	itemKey={data.itemKey}
	childKey={data.childKey}
/>
