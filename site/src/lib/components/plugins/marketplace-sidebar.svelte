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
		'box-border h-8 w-full rounded-none border border-rule bg-dark-900 px-3.5 text-xs text-foreground outline-none placeholder:text-muted-foreground hover:border-rule-strong focus:ring-2 focus:ring-ring';

	const labelClass =
		'px-1 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase';
</script>

<aside class="flex w-full shrink-0 flex-col gap-5 px-6 py-6 lg:w-64 lg:pr-6">
	<div class="flex flex-col gap-2">
		<label for="plugin-search" class={labelClass}>Search</label>
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
		<label for="plugin-sort" class={labelClass}>Sort</label>
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
		<p class="{labelClass} pb-1">Category</p>
		<ul class="flex flex-col gap-0.5">
			{#each PLUGIN_CATEGORIES as category (category)}
				{@const selected = categories.includes(category)}
				<li>
					<button
						type="button"
						class="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-dark-900 hover:text-foreground"
						onclick={() => toggleCategory(category)}
					>
						<span
							class="inline-flex size-5 shrink-0 items-center justify-center border transition-colors {selected
								? 'border-primary bg-primary/15 text-primary'
								: 'border-rule bg-dark-900'}"
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
						class={selected ? '' : 'border-rule bg-dark-900 text-muted-foreground hover:text-foreground'}
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
			class="cursor-pointer px-1 text-left font-mono text-[11px] tracking-wide text-muted-foreground uppercase hover:text-foreground"
			onclick={clearFilters}
		>
			Clear filters
		</button>
	{/if}
</aside>
