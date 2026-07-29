<script lang="ts">
	import type { NavItem, NavItemChild, NavItemLink } from '../../types';
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

	function hasActiveChild(item: NavItemLink): boolean {
		return item.children?.some((child) => child.path === activePath) ?? false;
	}

	function isExpanded(item: NavItemLink): boolean {
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
		<Icon icon={item.icon} width={18} class="shrink-0 text-current" />
	{/if}
	<span class="truncate">{getTitle(item)}</span>
{/snippet}

{#snippet navAction(item: NavActionItem, className?: string, showIcon = false)}
	{#if item.onClick}
		<button
			type="button"
			onclick={item.onClick}
			class={cn(
				'relative flex w-full cursor-pointer items-center gap-2.5 rounded-none px-3 py-1.5 text-left text-sm font-medium text-dark-200',
				'hover:bg-dark-900/60 hover:text-dark-100',
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

{#snippet parentToggle(item: NavItemLink)}
	<button
		type="button"
		onclick={() => toggleExpanded(item.path)}
		aria-expanded={isExpanded(item)}
		class={cn(
			'relative flex w-full cursor-pointer items-center gap-2.5 rounded-none px-3 py-1.5 text-left text-sm font-medium text-dark-200',
			'hover:bg-dark-900/60 hover:text-dark-100',
			hasActiveChild(item) &&
				'bg-dark-900 text-foreground before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-primary'
		)}
	>
		{@render label(item, true)}
		<Icon
			icon="gg:chevron-down"
			class={cn('ms-auto shrink-0 transition-transform', isExpanded(item) && 'rotate-180')}
		/>
	</button>
{/snippet}

{#snippet childItem(child: NavItemChild)}
	<li>
		{@render navAction(child, 'ps-10 font-normal')}
	</li>
{/snippet}

{#snippet sectionLabel(item: NavItem)}
	<div
		class="px-3 pt-3 pb-1 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
		role="presentation"
	>
		{getTitle(item)}
	</div>
{/snippet}

{#snippet navItem(item: NavItem)}
	{#if item.kind === 'label'}
		{@render sectionLabel(item)}
	{:else}
		<div class="flex flex-col gap-0.5">
			{#if item.children?.length}
				{@render parentToggle(item)}
				{#if isExpanded(item)}
					<ul class="mt-0.5 flex flex-col gap-0.5">
						{#each item.children as child (child.path)}
							{@render childItem(child)}
						{/each}
					</ul>
				{/if}
			{:else}
				{@render navAction(item, undefined, true)}
			{/if}
		</div>
	{/if}
{/snippet}

<nav {...props} class={cn('flex flex-col gap-0.5', props.class)}>
	{#if children}
		{@render children({ items })}
	{:else}
		{#each items as item (item.path)}
			{@render navItem(item)}
		{/each}
	{/if}
</nav>
