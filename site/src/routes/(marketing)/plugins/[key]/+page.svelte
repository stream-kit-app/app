<script lang="ts">
	import type { PageData } from './$types';
	import type { PluginCategory, PluginTag } from '#lib/plugins/marketplace.js';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
	import { Panel } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';

	import MarkdownContent from '#lib/components/plugins/markdown-content.svelte';
	import ReviewForm from '#lib/components/plugins/review-form.svelte';
	import ReviewsList from '#lib/components/plugins/reviews-list.svelte';
	import StarRating from '#lib/components/plugins/star-rating.svelte';
	import { PLUGIN_CATEGORY_LABELS, PLUGIN_TAG_LABELS } from '#lib/plugins/marketplace.js';

	let { data }: { data: PageData } = $props();

	let plugin = $derived(data.plugin);
	let tab = $derived(data.tab);

	function tabHref(next: 'overview' | 'reviews') {
		const params = new URLSearchParams();
		if (next === 'reviews') params.set('tab', 'reviews');
		const query = params.toString();
		return query ? `/plugins/${plugin.key}?${query}` : `/plugins/${plugin.key}`;
	}

	const tabClass =
		'relative flex h-12 cursor-pointer items-center px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';
	const tabActiveClass =
		'text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-primary';
</script>

<svelte:head>
	<title>{plugin.name} — Stream Kit Plugins</title>
	<meta
		name="description"
		content={plugin.description || `${plugin.name} plugin for Stream Kit`}
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-6 pt-12 pb-24">
	<a
		href="/plugins"
		class="mb-8 inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
	>
		<Icon icon="ri:arrow-left-line" class="size-4" />
		Back to marketplace
	</a>

	<div class="flex flex-col gap-6 sm:flex-row sm:items-start">
		<div
			class="flex size-16 shrink-0 items-center justify-center rounded-xl border border-rule bg-surface text-primary"
			aria-hidden="true"
		>
			<Icon icon={plugin.icon} class="size-7" />
		</div>

		<div class="min-w-0 flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<h1
					class="font-outfit text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
				>
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
				<p class="mt-3 max-w-2xl text-lg text-muted-foreground">
					{plugin.description}
				</p>
			{/if}

			<div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
					<Badge variant="outline" size="sm" class="text-muted-foreground">
						Requires Stream Kit {plugin.streamKitVersion}
					</Badge>
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
					<Button href={plugin.downloadUrl} icon="ri:download-2-line" variant="default">
						Download
					</Button>
				{/if}
				<Button href={tabHref('reviews')} variant="outline">
					{plugin.ratingCount > 0 ? 'Read reviews' : 'Be the first to review'}
				</Button>
			</div>
		</div>
	</div>

	<Panel class="mt-12">
		<nav
			class="flex items-stretch border-b border-rule px-2 sm:px-3"
			aria-label="Plugin sections"
		>
			<a
				href={tabHref('overview')}
				class="{tabClass} {tab === 'overview' ? tabActiveClass : ''}"
				aria-current={tab === 'overview' ? 'page' : undefined}
			>
				Overview
			</a>
			<a
				href={tabHref('reviews')}
				class="{tabClass} {tab === 'reviews' ? tabActiveClass : ''}"
				aria-current={tab === 'reviews' ? 'page' : undefined}
			>
				Reviews
				{#if plugin.ratingCount > 0}
					<span class="ml-1.5 text-muted-foreground">{plugin.ratingCount}</span>
				{/if}
			</a>
		</nav>

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
	</Panel>
</div>
