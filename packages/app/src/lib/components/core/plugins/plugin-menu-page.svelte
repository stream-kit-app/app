<script lang="ts">
	import { Container } from '@stream-kit/ui';

	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	import PluginPageRenderer from './plugin-page-renderer.svelte';

	type Props = {
		pluginKey: string;
		itemKey: string;
		childKey?: string;
	};

	let { pluginKey, itemKey, childKey }: Props = $props();
	const { t } = useI18n();

	const entry = $derived(app.pluginMenuPages.resolve(pluginKey, itemKey, childKey));

	$effect(() => {
		if (entry) {
			return;
		}

		app.pageHeader.set({ title: t('Plugin page not found'), segments: [] });
	});
</script>

{#if entry}
	<PluginPageRenderer {entry} />
{:else}
	<Container class="px-6 py-6">
		<EmptyState
			icon="ri:puzzle-line"
			title={t('Plugin page not found')}
			description={t('This plugin page is unavailable or the plugin is disabled.')}
		/>
	</Container>
{/if}
