<script lang="ts">
	import Icon from '@iconify/svelte';

	import { cn } from '$lib/utils';

	type Props = {
		icon: string;
		value: string;
		label: string;
		description?: string;
		href?: string;
		class?: string;
	};

	let { icon, value, label, description, href, class: className }: Props = $props();

	const cardClass = $derived(
		cn(
			'rounded-xl border border-dark-600 bg-dark-800 p-4',
			href && 'transition-colors hover:border-dark-500 hover:bg-dark-700',
			className
		)
	);
</script>

{#if href}
	<a {href} class={cn('block', cardClass)}>
		<div class="flex items-start gap-3">
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon {icon} class="size-4.5" />
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-2xl font-semibold text-dark-50">{value}</p>
				<p class="text-sm text-dark-200">{label}</p>
				{#if description}
					<p class="mt-0.5 text-xs text-dark-400">{description}</p>
				{/if}
			</div>
		</div>
	</a>
{:else}
	<div class={cardClass}>
		<div class="flex items-start gap-3">
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon {icon} class="size-4.5" />
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-2xl font-semibold text-dark-50">{value}</p>
				<p class="text-sm text-dark-200">{label}</p>
				{#if description}
					<p class="mt-0.5 text-xs text-dark-400">{description}</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
