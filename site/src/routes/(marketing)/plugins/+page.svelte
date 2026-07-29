<script lang="ts">
	import type { PageData } from './$types';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Eyebrow, SectionRule } from '@stream-kit/ui/blueprint';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import MarketplaceSidebar from '$lib/components/plugins/marketplace-sidebar.svelte';
	import PluginCard from '$lib/components/plugins/plugin-card.svelte';

	let { data }: { data: PageData } = $props();
	let plugins = $derived(data.plugins ?? []);
	let filters = $derived(data.filters);
</script>

<svelte:head>
	<title>Plugin Marketplace — Stream Kit</title>
	<meta
		name="description"
		content="Browse, filter, and download Stream Kit plugins. Official integrations for Twitch, YouTube, OBS, TTS, and more."
	/>
</svelte:head>

<section>
	<div class="px-6 pt-12 pb-8">
		<div class="flex max-w-3xl flex-col gap-3">
			<Eyebrow index="01">Plugin Marketplace</Eyebrow>
			<h1 class="font-outfit text-2xl font-bold tracking-tight text-balance sm:text-3xl">
				Find plugins for your setup
			</h1>
			<p class="max-w-2xl text-sm text-balance text-muted-foreground sm:text-base">
				Search and filter official Stream Kit plugins, then open a plugin for docs, ratings, and
				downloads.
			</p>
		</div>
	</div>
</section>

<SectionRule />

<section>
	<div class="pb-20">
		{#if data.error}
			<div class="px-6 pt-6">
				<Alert variant="warning" description={data.error} />
			</div>
		{/if}

		<div class="flex flex-col gap-0 lg:flex-row lg:items-start">
			<MarketplaceSidebar
				search={filters.search}
				categories={filters.categories}
				tags={filters.tags}
				sort={filters.sort}
			/>

			<div class="min-w-0 flex-1 border-t border-rule lg:border-t-0 lg:border-l">
				<div class="flex flex-wrap items-center gap-2 border-b border-rule px-6 py-3">
					<span
						class="inline-flex items-center gap-1.5 border border-rule bg-dark-900 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
					>
						<Icon icon="ri:plug-line" class="size-3.5" />
						{plugins.length}
						{plugins.length === 1 ? 'plugin' : 'plugins'}
					</span>
				</div>

				{#if plugins.length === 0}
					<div class="p-6">
						<EmptyState
							icon="ri:puzzle-line"
							title="No plugins match"
							description="Try a different search or clear your filters."
							class="min-h-0 p-0"
						/>
					</div>
				{:else}
					<div class="grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
						{#each plugins as plugin (plugin.key)}
							<PluginCard {plugin} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
