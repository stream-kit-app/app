<script lang="ts">
	import type { PageProps } from './$types';

	import PluginDetailPage from '#lib/components/core/plugins/plugin-detail-page.svelte';

	const { data }: PageProps = $props();
</script>

<PluginDetailPage pluginKey={data.pluginKey} />
