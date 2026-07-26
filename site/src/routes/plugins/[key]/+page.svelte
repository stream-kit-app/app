<script lang="ts">
	import type { PageData } from './$types';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

	import MarkdownContent from '$lib/components/plugins/markdown-content.svelte';
	import ReviewForm from '$lib/components/plugins/review-form.svelte';
	import ReviewsList from '$lib/components/plugins/reviews-list.svelte';
	import StarRating from '$lib/components/plugins/star-rating.svelte';
	import {
		PLUGIN_CATEGORY_LABELS,
		PLUGIN_TAG_LABELS,
		type PluginCategory,
		type PluginTag
	} from '$lib/plugins/marketplace';

	let { data }: { data: PageData } = $props();

	let plugin = $derived(data.plugin);
	let tab = $derived(data.tab);

	const year = new Date().getFullYear();

	function tabHref(next: 'overview' | 'reviews') {
		const params = new URLSearchParams();
		if (next === 'reviews') params.set('tab', 'reviews');
		const query = params.toString();
		return query ? `/plugins/${plugin.key}?${query}` : `/plugins/${plugin.key}`;
	}
</script>

<svelte:head>
	<title>{plugin.name} — Stream Kit Plugins</title>
	<meta name="description" content={plugin.description || `${plugin.name} plugin for Stream Kit`} />
</svelte:head>

<section>
	<Container center size="lg" class="px-6 pt-10 pb-6">
		<a
			href="/plugins"
			class="mb-4 inline-flex items-center gap-1 text-sm text-dark-300 hover:text-foreground"
		>
			<Icon icon="ri:arrow-left-line" class="size-4" />
			Back to marketplace
		</a>

		<div
			class="flex flex-col gap-5 rounded-xl border border-dark-600 bg-dark-800 p-5 sm:flex-row sm:items-start sm:p-6"
		>
			<div
				class="flex size-14 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
				aria-hidden="true"
			>
				<Icon icon={plugin.icon} class="size-7" />
			</div>

			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-center gap-2">
					<h1 class="font-outfit text-2xl font-bold tracking-tight text-dark-50 sm:text-3xl">
						{plugin.name}
					</h1>
					<Badge variant="default" size="sm">v{plugin.version}</Badge>
					{#if plugin.category}
						<Badge variant="secondary" size="sm">
							{PLUGIN_CATEGORY_LABELS[plugin.category as PluginCategory]}
						</Badge>
					{/if}
				</div>

				{#if plugin.description}
					<p class="mt-2 max-w-2xl text-sm text-dark-300 sm:text-base">{plugin.description}</p>
				{/if}

				<div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-dark-300">
					<div class="flex items-center gap-2">
						<StarRating value={plugin.averageRating} size="md" />
						{#if plugin.ratingCount > 0}
							<span>
								{plugin.averageRating.toFixed(1)} · {plugin.ratingCount}
								{plugin.ratingCount === 1 ? 'review' : 'reviews'}
							</span>
						{:else}
							<span>No ratings yet</span>
						{/if}
					</div>
					{#if plugin.streamKitVersion}
						<span
							class="inline-flex items-center rounded-lg border border-dark-600 bg-dark-900 px-2.5 py-1 text-xs font-medium text-dark-300"
						>
							Requires Stream Kit {plugin.streamKitVersion}
						</span>
					{/if}
				</div>

				{#if plugin.tags.length > 0}
					<div class="mt-3 flex flex-wrap gap-1.5">
						{#each plugin.tags as tag (tag)}
							<Badge variant="outline" size="sm">
								{PLUGIN_TAG_LABELS[tag as PluginTag] ?? tag}
							</Badge>
						{/each}
					</div>
				{/if}

				<div class="mt-5 flex flex-wrap gap-2">
					{#if plugin.downloadUrl}
						<Button href={plugin.downloadUrl} icon="mdi:download" variant="default">
							Download
						</Button>
					{/if}
					<Button href={tabHref('reviews')} variant="outline">
						{plugin.ratingCount > 0 ? 'Read reviews' : 'Be the first to review'}
					</Button>
				</div>
			</div>
		</div>
	</Container>
</section>

<section>
	<Container center size="lg" class="px-6 pb-20">
		<div class="rounded-xl border border-dark-600 bg-dark-800">
			<div class="flex gap-1 border-b border-dark-600 px-2 sm:px-4">
				<a
					href={tabHref('overview')}
					class="border-b-2 px-4 py-3 text-sm font-medium transition-colors {tab === 'overview'
						? 'border-primary text-foreground'
						: 'border-transparent text-dark-300 hover:text-foreground'}"
				>
					Overview
				</a>
				<a
					href={tabHref('reviews')}
					class="border-b-2 px-4 py-3 text-sm font-medium transition-colors {tab === 'reviews'
						? 'border-primary text-foreground'
						: 'border-transparent text-dark-300 hover:text-foreground'}"
				>
					Reviews
					{#if plugin.ratingCount > 0}
						<span class="ml-1 text-xs text-dark-400">({plugin.ratingCount})</span>
					{/if}
				</a>
			</div>

			<div class="p-5 sm:p-6">
				{#if tab === 'overview'}
					<MarkdownContent html={plugin.contentHtml} />
				{:else}
					<div class="flex flex-col gap-6 lg:flex-row lg:items-start">
						<div class="min-w-0 flex-1">
							{#if data.reviewsError}
								<Alert variant="warning" description={data.reviewsError} class="mb-4" />
							{/if}
							<ReviewsList reviews={data.reviews} />
						</div>
						<div class="w-full shrink-0 lg:w-80">
							<ReviewForm isAuthenticated={data.isAuthenticated} />
						</div>
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
				<a href="/plugins" class="text-muted-foreground hover:text-foreground">Marketplace</a>
				<a href="/" class="text-muted-foreground hover:text-foreground">Home</a>
			</nav>
		</div>
	</Container>
</footer>
