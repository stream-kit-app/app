<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		icon: string;
		value: string | number;
		label: string;
		description?: string;
		href?: string;
	};

	let { icon, value, label, description, href }: Props = $props();
</script>

{#if href}
	<a
		{href}
		class="block rounded-xl border border-dark-600 bg-dark-800 p-4 transition-colors hover:border-dark-500"
	>
		<div class="flex items-start gap-3">
			<div
				class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon {icon} class="size-5" aria-hidden="true" />
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-2xl font-semibold text-dark-50">{value}</p>
				<p class="text-sm text-dark-100">{label}</p>
				{#if description}
					<p class="mt-0.5 text-xs text-dark-300">{description}</p>
				{/if}
			</div>
		</div>
	</a>
{:else}
	<div class="rounded-xl border border-dark-600 bg-dark-800 p-4">
		<div class="flex items-start gap-3">
			<div
				class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			>
				<Icon {icon} class="size-5" aria-hidden="true" />
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-2xl font-semibold text-dark-50">{value}</p>
				<p class="text-sm text-dark-100">{label}</p>
				{#if description}
					<p class="mt-0.5 text-xs text-dark-300">{description}</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
