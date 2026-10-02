<script lang="ts">
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';

	type Props = {
		title: string;
		description?: string;
		/** Iconify icon rendered in a rounded icon well. Ignored when `leading` is set. */
		icon?: string;
		href?: string;
		onclick?: () => void;
		class?: string;
		leading?: Snippet;
		trailing?: Snippet;
	};

	let {
		title,
		description,
		icon,
		href,
		onclick,
		class: className,
		leading,
		trailing
	}: Props = $props();

	const interactive = $derived(Boolean(href || onclick));

	const rowClass = $derived(
		cn(
			'flex w-full min-w-0 items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
			interactive &&
				'has-focus-visible:ring-2 has-focus-visible:ring-ring cursor-pointer hover:bg-dark-700/40',
			className
		)
	);
</script>

<!--
	Interactive rows use a stretched link/button (::after covers the row) so the whole row is
	clickable, while buttons and links inside `trailing` stay independently clickable.
-->
<div class={cn(interactive && 'group/row relative', rowClass)}>
	{#if leading}
		{@render leading()}
	{:else if icon}
		<span
			class="flex size-7 shrink-0 items-center justify-center rounded-md border border-rule bg-dark-900/60 text-primary"
			aria-hidden="true"
		>
			<Icon {icon} class="size-4" />
		</span>
	{/if}
	<span class="flex min-w-0 flex-1 flex-col">
		{#if href}
			<a
				{href}
				class="truncate font-medium text-dark-50 outline-none after:absolute after:inset-0 after:rounded-md"
			>
				{title}
			</a>
		{:else if onclick}
			<button
				type="button"
				class="cursor-pointer truncate text-left font-medium text-dark-50 outline-none after:absolute after:inset-0 after:rounded-md"
				{onclick}
			>
				{title}
			</button>
		{:else}
			<span class="truncate font-medium text-dark-50">{title}</span>
		{/if}
		{#if description}
			<span class="truncate text-xs text-dark-300">{description}</span>
		{/if}
	</span>
	{#if trailing}
		<div
			class={cn(
				'flex shrink-0 items-center gap-1.5',
				interactive &&
					'pointer-events-none relative [&_a]:pointer-events-auto [&_button]:pointer-events-auto'
			)}
		>
			{@render trailing()}
		</div>
	{/if}
</div>
