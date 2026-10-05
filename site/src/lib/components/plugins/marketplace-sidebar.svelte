<script lang="ts">
	import type { PluginCategory, PluginSort, PluginTag } from '#lib/plugins/marketplace.js';

	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputSelect, InputText, Label } from '@stream-kit/ui/input';

	import {
		PLUGIN_CATEGORIES,
		PLUGIN_CATEGORY_LABELS,
		PLUGIN_SORT_OPTIONS,
		PLUGIN_TAG_LABELS,
		PLUGIN_TAGS
	} from '#lib/plugins/marketplace.js';

	type Props = {
		search: string;
		categories: PluginCategory[];
		tags: PluginTag[];
		sort: PluginSort;
	};

	let { search, categories, tags, sort }: Props = $props();

	let searchDraft = $state('');

	$effect.pre(() => {
		searchDraft = search;
	});

	function buildParams(next: {
		search?: string;
		categories?: PluginCategory[];
		tags?: PluginTag[];
		sort?: PluginSort;
	}) {
		const params = new URLSearchParams();
		const q = (next.search ?? searchDraft).trim();
		const nextCategories = next.categories ?? categories;
		const nextTags = next.tags ?? tags;
		const nextSort = next.sort ?? sort;

		if (q) params.set('q', q);
		if (nextCategories.length) params.set('category', nextCategories.join(','));
		if (nextTags.length) params.set('tags', nextTags.join(','));
		if (nextSort !== 'newest') params.set('sort', nextSort);

		const query = params.toString();
		return query ? `/plugins?${query}` : '/plugins';
	}

	function applySearch() {
		goto(buildParams({ search: searchDraft }), { reset: false });
	}

	function toggleCategory(category: PluginCategory) {
		const next = categories.includes(category)
			? categories.filter((item) => item !== category)
			: [...categories, category];
		goto(buildParams({ categories: next }), { reset: false });
	}

	function toggleTag(tag: PluginTag) {
		const next = tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag];
		goto(buildParams({ tags: next }), { reset: false });
	}

	function onSortChange(value: string) {
		goto(buildParams({ sort: value as PluginSort }), { reset: false });
	}

	function clearFilters() {
		searchDraft = '';
		goto('/plugins', { reset: false });
	}

	const hasFilters = $derived(
		Boolean(search.trim()) || categories.length > 0 || tags.length > 0 || sort !== 'newest'
	);

	const labelClass = 'px-1 text-sm font-medium text-foreground';
</script>

<aside class="flex w-full shrink-0 flex-col gap-6 lg:sticky lg:top-24 lg:w-60">
	<div class="flex flex-col gap-2">
		<Label for="plugin-search" class={labelClass}>Search</Label>
		<form
			class="flex flex-col gap-2"
			onsubmit={(event) => {
				event.preventDefault();
				applySearch();
			}}
		>
			<InputText
				id="plugin-search"
				type="search"
				prependIcon="ri:search-line"
				value={searchDraft}
				oninput={(event) => (searchDraft = event.currentTarget.value)}
				placeholder="Name or description…"
			/>
			<Button type="submit" size="sm" variant="outline" class="w-full">Search</Button>
		</form>
	</div>

	<div class="flex flex-col gap-2">
		<Label for="plugin-sort" class={labelClass}>Sort</Label>
		<InputSelect
			id="plugin-sort"
			items={PLUGIN_SORT_OPTIONS}
			value={sort}
			searchable={false}
			onValueChange={onSortChange}
		/>
	</div>

	<div class="flex flex-col gap-1">
		<p class="{labelClass} pb-1">Category</p>
		<ul class="flex flex-col gap-0.5">
			{#each PLUGIN_CATEGORIES as category (category)}
				{@const selected = categories.includes(category)}
				<li>
					<button
						type="button"
						class="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium text-dark-200 transition-colors duration-150 hover:bg-item-hover hover:text-dark-50"
						onclick={() => toggleCategory(category)}
					>
						<span
							class="inline-flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors {selected
								? 'border-primary bg-primary/15 text-primary'
								: 'border-border'}"
							aria-hidden="true"
						>
							{#if selected}
								<Icon icon="ri:check-line" class="size-3.5" />
							{/if}
						</span>
						<span>{PLUGIN_CATEGORY_LABELS[category]}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex flex-col gap-2">
		<p class={labelClass}>Tags</p>
		<div class="flex flex-wrap gap-1.5 px-1">
			{#each PLUGIN_TAGS as tag (tag)}
				{@const selected = tags.includes(tag)}
				<button type="button" class="cursor-pointer" onclick={() => toggleTag(tag)}>
					<Badge
						variant={selected ? 'default' : 'outline'}
						size="sm"
						class={selected ? '' : 'text-muted-foreground hover:text-foreground'}
					>
						{PLUGIN_TAG_LABELS[tag]}
					</Badge>
				</button>
			{/each}
		</div>
	</div>

	{#if hasFilters}
		<button
			type="button"
			class="w-fit cursor-pointer px-1 text-left text-sm text-primary hover:text-primary-100"
			onclick={clearFilters}
		>
			Clear filters
		</button>
	{/if}
</aside>
