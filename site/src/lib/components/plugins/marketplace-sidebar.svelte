<script lang="ts">
	import Icon from '@iconify/svelte';

	import { goto } from '$app/navigation';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import {
		PLUGIN_CATEGORIES,
		PLUGIN_CATEGORY_LABELS,
		PLUGIN_SORT_OPTIONS,
		PLUGIN_TAG_LABELS,
		PLUGIN_TAGS,
		type PluginCategory,
		type PluginSort,
		type PluginTag
	} from '$lib/plugins/marketplace';

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
		goto(buildParams({ search: searchDraft }), { keepFocus: true, noScroll: true });
	}

	function toggleCategory(category: PluginCategory) {
		const next = categories.includes(category)
			? categories.filter((item) => item !== category)
			: [...categories, category];
		goto(buildParams({ categories: next }), { keepFocus: true, noScroll: true });
	}

	function toggleTag(tag: PluginTag) {
		const next = tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag];
		goto(buildParams({ tags: next }), { keepFocus: true, noScroll: true });
	}

	function onSortChange(event: Event) {
		const value = (event.currentTarget as HTMLSelectElement).value as PluginSort;
		goto(buildParams({ sort: value }), { keepFocus: true, noScroll: true });
	}

	function clearFilters() {
		searchDraft = '';
		goto('/plugins', { keepFocus: true, noScroll: true });
	}

	const hasFilters = $derived(
		Boolean(search.trim()) || categories.length > 0 || tags.length > 0 || sort !== 'newest'
	);

	const fieldClass =
		'box-border h-8 w-full rounded-xl border border-border bg-dark-700 px-3.5 text-xs text-dark-50 outline-none placeholder:text-dark-400 hover:border-dark-400 focus:ring-2 focus:ring-ring';
</script>

<aside
	class="flex w-full shrink-0 flex-col gap-5 border-dark-600 lg:w-64 lg:border-r lg:pr-6 lg:pb-2"
>
	<div class="flex flex-col gap-2">
		<label for="plugin-search" class="px-1 text-xs font-extrabold tracking-wide text-dark-400 uppercase">
			Search
		</label>
		<form
			class="flex flex-col gap-2"
			onsubmit={(event) => {
				event.preventDefault();
				applySearch();
			}}
		>
			<input
				id="plugin-search"
				type="search"
				bind:value={searchDraft}
				placeholder="Name or description…"
				class={fieldClass}
			/>
			<Button type="submit" size="sm" variant="outline" class="w-full">Search</Button>
		</form>
	</div>

	<div class="flex flex-col gap-2">
		<label for="plugin-sort" class="px-1 text-xs font-extrabold tracking-wide text-dark-400 uppercase">
			Sort
		</label>
		<select
			id="plugin-sort"
			value={sort}
			onchange={onSortChange}
			class="{fieldClass} cursor-pointer appearance-none"
		>
			{#each PLUGIN_SORT_OPTIONS as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-1">
		<p class="px-1 pb-1 text-xs font-extrabold tracking-wide text-dark-400 uppercase">Category</p>
		<ul class="flex flex-col gap-0.5">
			{#each PLUGIN_CATEGORIES as category (category)}
				{@const selected = categories.includes(category)}
				<li>
					<button
						type="button"
						class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-dark-200 hover:bg-dark-900 hover:text-dark-100"
						onclick={() => toggleCategory(category)}
					>
						<span
							class="inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors {selected
								? 'border-primary bg-primary/15 text-primary'
								: 'border-border bg-dark-700'}"
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
		<p class="px-1 text-xs font-extrabold tracking-wide text-dark-400 uppercase">Tags</p>
		<div class="flex flex-wrap gap-1.5 px-1">
			{#each PLUGIN_TAGS as tag (tag)}
				{@const selected = tags.includes(tag)}
				<button type="button" class="cursor-pointer" onclick={() => toggleTag(tag)}>
					<Badge
						variant={selected ? 'default' : 'outline'}
						size="sm"
						class={selected
							? ''
							: 'border-dark-600 bg-dark-800 text-dark-300 hover:border-dark-500 hover:text-dark-100'}
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
			class="cursor-pointer px-1 text-left text-sm text-dark-300 hover:text-foreground"
			onclick={clearFilters}
		>
			Clear filters
		</button>
	{/if}
</aside>
