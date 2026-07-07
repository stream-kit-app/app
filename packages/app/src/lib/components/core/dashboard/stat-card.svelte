<script lang="ts">
	import Icon from '@iconify/svelte';

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

	const cardClass = $derived(
		cn(
			embedded
				? cn('block text-sm', href && 'transition hover:opacity-90')
				: cn(
						'rounded-xl border border-dark-600 bg-dark-800 p-4 transition-colors',
						href && 'hover:border-dark-500'
					),
			className
		)
	);
</script>

{#if href}
	<a {href} class={cardClass}>
		<div class="flex items-start gap-3">
			{#if !embedded}
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
				>
					<Icon {icon} class="size-5" />
				</div>
			{/if}
			<div class="min-w-0 flex-1">
				<p class="text-2xl font-semibold text-dark-50">{value}</p>
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
	</a>
{:else}
	<div class={cardClass}>
		<div class="flex items-start gap-3">
			{#if !embedded}
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
				>
					<Icon {icon} class="size-5" />
				</div>
			{/if}
			<div class="min-w-0 flex-1">
				<p class="text-2xl font-semibold text-dark-50">{value}</p>
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
	</div>
{/if}
