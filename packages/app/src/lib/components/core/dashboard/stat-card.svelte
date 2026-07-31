<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Panel } from '@stream-kit/ui/blueprint';

	import { cn } from '$lib/utils';

	type Props = {
		icon: string;
		value: string;
		label?: string;
		description?: string;
		href?: string;
		embedded?: boolean;
		class?: string;
	};

	let {
		icon,
		value,
		label,
		description,
		href,
		embedded = false,
		class: className
	}: Props = $props();

	const bodyClass = $derived(cn('block text-sm', href && 'transition hover:opacity-90', className));
</script>

{#snippet content()}
	<div class="flex items-start gap-3">
		{#if !embedded}
			<div
				class="flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
			>
				<Icon {icon} class="size-5" />
			</div>
		{/if}
		<div class="min-w-0 flex-1">
			<p class="font-mono text-2xl font-semibold tabular-nums text-dark-50">{value}</p>
			{#if label && !embedded}
				<p class="text-sm text-dark-100">{label}</p>
			{/if}
			{#if description}
				<p class={cn('text-dark-300', embedded ? 'mt-1 text-xs' : 'mt-0.5 text-xs')}>
					{description}
				</p>
			{/if}
		</div>
	</div>
{/snippet}

{#if embedded}
	{#if href}
		<a {href} class={bodyClass}>{@render content()}</a>
	{:else}
		<div class={bodyClass}>{@render content()}</div>
	{/if}
{:else if href}
	<a {href} class={cn('block transition-opacity hover:opacity-90', className)}>
		<Panel tone="flush" class="p-4">
			{@render content()}
		</Panel>
	</a>
{:else}
	<Panel tone="flush" class={cn('p-4', className)}>
		{@render content()}
	</Panel>
{/if}
