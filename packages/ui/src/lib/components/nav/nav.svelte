<script lang="ts">
	import type { NavItem } from '../../types';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { SvelteSet } from 'svelte/reactivity';

	import { cn } from '../../utils';
	import NavLink from './nav-link.svelte';

	type Props = HTMLAttributes<HTMLElement> & {
		items: NavItem[];
		activePath?: string;
		translateTitle?: (title: string) => string;
		children?: Snippet<[{ items: NavItem[] }]>;
	};

	const { items, activePath, translateTitle, children, ...props }: Props = $props();

	let expandedPaths = new SvelteSet<string>();

	function getTitle(item: { title?: string }): string {
		if (item.title) {
			return translateTitle?.(item.title) ?? item.title;
		}

		return '';
	}

	function hasActiveChild(item: NavItem): boolean {
		return item.children?.some((child) => child.path === activePath) ?? false;
	}

	function isExpanded(item: NavItem): boolean {
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
					{#if item.isGroupOnly}
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
					{:else}
						<div
							class={cn(
								'flex items-center rounded-xl hover:bg-dark-700',
								hasActiveChild(item) && 'bg-dark-600'
							)}
						>
							<NavLink href={item.path} class="flex min-w-0 flex-1" {activePath}>
								<Icon icon={item.icon} width={22} />
								{getTitle(item)}
							</NavLink>
							<button
								type="button"
								onclick={() => toggleExpanded(item.path)}
								aria-expanded={isExpanded(item)}
								class="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl"
								aria-label={isExpanded(item) ? 'Collapse' : 'Expand'}
							>
								<Icon
									icon="gg:chevron-down"
									class={cn(
										'transition-transform',
										isExpanded(item) && 'rotate-180'
									)}
								/>
							</button>
						</div>
					{/if}
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
										<NavLink
											href={child.path}
											variant="default"
											class="ps-14 data-[active=true]:bg-dark-700"
											{activePath}
										>
											{getTitle(child)}
										</NavLink>
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
				{:else}
					<NavLink href={item.path} class="flex" {activePath}>
						<Icon icon={item.icon} width={22} />
						{getTitle(item)}
					</NavLink>
				{/if}
			</div>
		{/each}
	{/if}
</nav>
