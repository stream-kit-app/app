<script lang="ts">
	import type { PageData } from './$types';

	import { Alert } from '@stream-kit/ui/alert';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import SectionHeading from '#lib/components/marketing/section-heading.svelte';
	import MarketplaceSidebar from '#lib/components/plugins/marketplace-sidebar.svelte';
	import PluginCard from '#lib/components/plugins/plugin-card.svelte';

	let { data }: { data: PageData } = $props();
	let plugins = $derived(data.plugins ?? []);
	let filters = $derived(data.filters);
</script>

<svelte:head>
	<title>Plugin Marketplace — Stream Kit</title>
	<meta
		name="description"
		content="Browse, filter and download Stream Kit plugins: official integrations for Twitch, YouTube, OBS, Discord, Stream Deck, TTS and more."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-20">
	<SectionHeading as="h1" align="start" label="Plugin marketplace" title="Plugins for your setup">
		Search the official Stream Kit plugins, then open one for docs, ratings and downloads.
	</SectionHeading>

	{#if data.error}
		<Alert variant="warning" description={data.error} class="mt-10" />
	{/if}

	<div class="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start">
		<MarketplaceSidebar
			search={filters.search}
			categories={filters.categories}
			tags={filters.tags}
			sort={filters.sort}
		/>

		<div class="min-w-0 flex-1">
			<p class="mb-4 text-sm text-muted-foreground">
				{plugins.length}
				{plugins.length === 1 ? 'plugin' : 'plugins'}
			</p>

			{#if plugins.length === 0}
				<div class="rounded-xl border border-rule p-10">
					<EmptyState
						icon="ri:puzzle-line"
						title="No plugins match"
						description="Try a different search or clear your filters."
						class="min-h-0 p-0"
					/>
				</div>
			{:else}
				<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{#each plugins as plugin (plugin.key)}
						<PluginCard {plugin} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
