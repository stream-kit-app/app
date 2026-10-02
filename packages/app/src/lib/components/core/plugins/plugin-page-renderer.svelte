<script lang="ts">
	import type { PluginPageFormBlock } from '$lib/core/plugins';
	import type { PluginMenuPageEntry } from '$lib/core/plugins/plugin-menu-pages.svelte';

	import { PageBlocks } from '@stream-kit/ui/blocks';

	import { app } from '$lib/core/app-init';
	import {
		isPageBlocksDefinition,
		isPageCustomViewDefinition
	} from '$lib/core/plugins/page-definition';

	import PluginPageForm from './plugin-page-form.svelte';
	import PluginCustomViewHost from './plugin-custom-view-host.svelte';

	type Props = {
		entry: PluginMenuPageEntry;
	};

	let { entry }: Props = $props();

	// Scoped to the page's plugin so plugin-owned APIs (e.g. app.records) work in custom views.
	const pluginApp = $derived(entry.plugin.createContext(app).app);

	const customView = $derived(
		isPageCustomViewDefinition(entry.page) ? entry.page.customView : undefined
	);

	const CustomViewComponent = $derived(
		customView ? entry.plugin.getCustomView(customView) : undefined
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
	<PluginCustomViewHost
		component={CustomViewComponent}
		app={pluginApp}
		title={entry.page.title}
		description={entry.page.description}
	/>
{:else if isPageBlocksDefinition(entry.page)}
	<PageBlocks
		title={entry.page.title}
		description={entry.page.description}
		blocks={entry.page.blocks}
		showTitle={false}
		{renderForm}
	/>
{/if}
