<script lang="ts">
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';

	import { Cell, Eyebrow } from '@stream-kit/ui/blueprint';

	type Props = {
		icon: string;
		label: string;
		value?: string | number;
		description?: string;
		href?: string;
		/** Replaces the mono value, e.g. for badges. */
		children?: Snippet;
	};

	let { icon, label, value, description, href, children }: Props = $props();
</script>

<Cell {href} class="flex min-w-0 flex-col gap-3 bg-surface p-5">
	<div class="flex items-center justify-between gap-3">
		<Eyebrow>{label}</Eyebrow>
		<Icon {icon} class="size-4 shrink-0 text-primary" aria-hidden="true" />
	</div>
	{#if children}
		{@render children()}
	{:else}
		<p class="truncate font-mono text-2xl font-semibold text-dark-50 tabular-nums">{value}</p>
	{/if}
	{#if description}
		<p class="truncate text-xs text-dark-400">{description}</p>
	{/if}
</Cell>
