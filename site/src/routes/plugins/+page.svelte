<script lang="ts">
	import type { PageData } from './$types';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import MarketplaceSidebar from '$lib/components/plugins/marketplace-sidebar.svelte';
	import PluginCard from '$lib/components/plugins/plugin-card.svelte';

	let { data }: { data: PageData } = $props();
	let plugins = $derived(data.plugins ?? []);
	let filters = $derived(data.filters);

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>Plugin Marketplace — Stream Kit</title>
	<meta
		name="description"
		content="Browse, filter, and download Stream Kit plugins. Official integrations for Twitch, YouTube, OBS, TTS, and more."
	/>
</svelte:head>

<section>
	<Container center size="lg" class="px-6 pt-10 pb-6">
		<div class="flex max-w-3xl flex-col gap-3">
			<Badge size="sm" variant="secondary" class="w-fit">
				<Icon icon="mdi:storefront-outline" />
				Plugin Marketplace
			</Badge>

			<h1 class="font-outfit text-2xl font-bold tracking-tight text-balance sm:text-3xl">
				Find plugins for your setup
			</h1>

			<p class="max-w-2xl text-sm text-balance text-dark-300 sm:text-base">
				Search and filter official Stream Kit plugins, then open a plugin for docs, ratings, and
				downloads.
			</p>
		</div>
	</Container>
</section>

<section>
	<Container center size="lg" class="px-6 pb-20">
		{#if data.error}
			<Alert variant="warning" description={data.error} class="mb-6" />
		{/if}

		<div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
			<MarketplaceSidebar
				search={filters.search}
				categories={filters.categories}
				tags={filters.tags}
				sort={filters.sort}
			/>

			<div class="min-w-0 flex-1 lg:px-6">
				<div class="mb-4 flex flex-wrap items-center gap-2 border-b border-dark-600 pb-3">
					<span
						class="inline-flex items-center gap-1.5 rounded-lg border border-dark-600 bg-dark-800 px-2.5 py-1 text-xs font-medium text-dark-300"
					>
						<Icon icon="ri:plug-line" class="size-3.5" />
						{plugins.length}
						{plugins.length === 1 ? 'plugin' : 'plugins'}
					</span>
				</div>

				{#if plugins.length === 0}
					<EmptyState
						icon="ri:puzzle-line"
						title="No plugins match"
						description="Try a different search or clear your filters."
						class="min-h-0 p-0"
					/>
				{:else}
					<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{#each plugins as plugin (plugin.key)}
							<PluginCard {plugin} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</Container>
</section>

<footer class="border-t border-dark-600">
	<Container center size="lg" class="px-6 py-10">
		<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
			<p class="text-sm text-muted-foreground">© {year} Stream Kit. All rights reserved.</p>
			<nav class="flex gap-6 text-sm">
				<a href="/" class="text-muted-foreground hover:text-foreground">Home</a>
				<a href="/docs" class="text-muted-foreground hover:text-foreground">Docs</a>
			</nav>
		</div>
	</Container>
</footer>
