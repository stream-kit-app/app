<script lang="ts">
	import type { PluginPageFormBlock } from '$lib/core/plugins';
	import type { PluginMenuPageEntry } from '$lib/core/plugins/plugin-menu-pages.svelte';

	import { PageBlocks } from '@stream-kit/ui/blocks';

	import PluginPageForm from './plugin-page-form.svelte';

	type Props = {
		entry: PluginMenuPageEntry;
	};

	let { entry }: Props = $props();
</script>

{#snippet renderForm(block: PluginPageFormBlock)}
	<PluginPageForm
		plugin={entry.plugin}
		title={block.title}
		description={block.description}
		fields={block.fields}
		submitLabel={block.submitLabel}
		successMessage={block.successMessage}
	/>
{/snippet}

<PageBlocks
	title={entry.page.title}
	description={entry.page.description}
	blocks={entry.page.blocks}
	{renderForm}
/>
