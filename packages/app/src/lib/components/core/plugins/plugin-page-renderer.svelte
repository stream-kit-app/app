<script lang="ts">
	import type { PluginPageFormBlock } from '$lib/core/plugins';
	import type { PluginMenuPageEntry } from '$lib/core/plugins/plugin-menu-pages.svelte';

	import { PageBlocks } from '@stream-kit/ui/blocks';

	import { isPageBlocksDefinition, isPageCustomViewDefinition } from '$lib/core/plugins/page-definition';
	import {
		isRegisteredCustomView,
		pluginCustomViewRegistry
	} from '$lib/core/plugins/plugin-custom-view-registry';

	import PluginPageForm from './plugin-page-form.svelte';

	type Props = {
		entry: PluginMenuPageEntry;
	};

	let { entry }: Props = $props();

	const customView = $derived(
		isPageCustomViewDefinition(entry.page) ? entry.page.customView : undefined
	);
	const CustomViewComponent = $derived(
		customView && isRegisteredCustomView(customView)
			? pluginCustomViewRegistry[customView]
			: undefined
	);
</script>

{#snippet renderForm(block: PluginPageFormBlock)}
	<PluginPageForm
		plugin={entry.plugin}
		scope={`${entry.plugin.key}.${entry.key}.${block.title ?? 'form'}`}
		title={block.title}
		description={block.description}
		fields={block.fields}
		submitLabel={block.submitLabel}
		successMessage={block.successMessage}
	/>
{/snippet}

{#if CustomViewComponent}
	<CustomViewComponent title={entry.page.title} description={entry.page.description} />
{:else if isPageBlocksDefinition(entry.page)}
	<PageBlocks
		title={entry.page.title}
		description={entry.page.description}
		blocks={entry.page.blocks}
		{renderForm}
	/>
{/if}
