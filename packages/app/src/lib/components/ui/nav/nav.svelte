<script lang="ts">
	import type { MenuItem } from '$lib/core/types';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { SvelteSet } from 'svelte/reactivity';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import NavLink from './nav-link.svelte';

	type Props = HTMLAttributes<HTMLElement> & {
		items: MenuItem[];
		children?: Snippet<[{ items: MenuItem[] }]>;
	};

	const { items, children, ...props }: Props = $props();
	const { t } = useI18n();

	let expandedPaths = new SvelteSet<string>();

	function getTitle(item: { title?: import('$lib/i18n').TranslationKey }): string {
		if (item.title) {
			return t(item.title);
		}

		return '';
	}

	function hasActiveChild(item: MenuItem): boolean {
		return item.children?.some((child) => child.path === page.url.pathname) ?? false;
	}

	function isExpanded(item: MenuItem): boolean {
		return expandedPaths.has(item.path) || hasActiveChild(item);
	}

	function toggleExpanded(path: string): void {
		if (expandedPaths.has(path)) {
			expandedPaths.delete(path);
		} else {
			expandedPaths.add(path);
		}
	}
</script>

<nav {...props} class={cn('flex flex-col gap-1', props.class)}>
	{#if children}
		{@render children({ items })}
	{:else}
		{#each items as item (item.path)}
			<div class="flex flex-col gap-1">
				{#if item.onClick}
					<button
						type="button"
						onclick={item.onClick}
						class={cn(
							'flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-600'
						)}
					>
						<Icon icon={item.icon} width={22} />
						{getTitle(item)}
					</button>
				{:else if item.children?.length}
					<button
						type="button"
						onclick={() => toggleExpanded(item.path)}
						aria-expanded={isExpanded(item)}
						class={cn(
							'flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-700',
							hasActiveChild(item) && 'bg-dark-600'
						)}
					>
						<Icon icon={item.icon} width={22} />
						{getTitle(item)}
						<Icon
							icon="gg:chevron-down"
							class={cn(
								'ms-auto transition-transform',
								isExpanded(item) && 'rotate-180'
							)}
						/>
					</button>
					{#if isExpanded(item)}
						<ul class="mt-1 flex flex-col gap-1">
							{#each item.children as child (child.path)}
								<li>
									{#if child.onClick}
										<button
											type="button"
											onclick={child.onClick}
											class="flex w-full rounded-xl px-4 py-2 ps-14 text-left font-normal hover:bg-dark-700"
										>
											{getTitle(child)}
										</button>
									{:else}
										<NavLink href={child.path} variant="default" class="ps-14">
											{getTitle(child)}
										</NavLink>
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
				{:else}
					<NavLink href={item.path} class="flex">
						<Icon icon={item.icon} width={22} />
						{getTitle(item)}
					</NavLink>
				{/if}
			</div>
		{/each}
	{/if}
</nav>
