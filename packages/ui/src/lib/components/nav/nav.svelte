<script lang="ts">
	import type { NavItem, NavItemChild } from '../../types';
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

	type NavActionItem = Pick<NavItemChild, 'path' | 'title' | 'onClick'> & { icon?: string };

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

{#snippet label(item: NavActionItem, showIcon = false)}
	{#if showIcon && item.icon}
		<Icon icon={item.icon} width={22} />
	{/if}
	{getTitle(item)}
{/snippet}

{#snippet navAction(item: NavActionItem, className?: string, showIcon = false)}
	{#if item.onClick}
		<button
			type="button"
			onclick={item.onClick}
			class={cn(
				'flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-600',
				className
			)}
		>
			{@render label(item, showIcon)}
		</button>
	{:else}
		<NavLink href={item.path} class={cn('flex', className)} {activePath}>
			{@render label(item, showIcon)}
		</NavLink>
	{/if}
{/snippet}

{#snippet parentToggle(item: NavItem)}
	<button
		type="button"
		onclick={() => toggleExpanded(item.path)}
		aria-expanded={isExpanded(item)}
		class={cn(
			'flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-700',
			hasActiveChild(item) && 'bg-dark-600'
		)}
	>
		{@render label(item, true)}
		<Icon
			icon="gg:chevron-down"
			class={cn('ms-auto transition-transform', isExpanded(item) && 'rotate-180')}
		/>
	</button>
{/snippet}

{#snippet childItem(child: NavItemChild)}
	<li>
		{@render navAction(child, 'ps-14 font-normal hover:bg-dark-700 data-[active=true]:bg-dark-700')}
	</li>
{/snippet}

{#snippet navItem(item: NavItem)}
	<div class="flex flex-col gap-1">
		{#if item.children?.length}
			{@render parentToggle(item)}
			{#if isExpanded(item)}
				<ul class="mt-1 flex flex-col gap-1">
					{#each item.children as child (child.path)}
						{@render childItem(child)}
					{/each}
				</ul>
			{/if}
		{:else}
			{@render navAction(item, undefined, true)}
		{/if}
	</div>
{/snippet}

<nav {...props} class={cn('flex flex-col gap-1', props.class)}>
	{#if children}
		{@render children({ items })}
	{:else}
		{#each items as item (item.path)}
			{@render navItem(item)}
		{/each}
	{/if}
</nav>
