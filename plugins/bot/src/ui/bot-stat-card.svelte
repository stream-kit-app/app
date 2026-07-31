<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Panel } from '@stream-kit/ui/blueprint';

	import { cn } from '@stream-kit/plugin/utils';

	type Props = {
		icon: string;
		value: string | number;
		label: string;
		description?: string;
		href?: string;
	};

	let { icon, value, label, description, href }: Props = $props();
</script>

{#snippet content()}
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
{/snippet}

{#if href}
	<a href={href} class="block">
		<Panel
			tone="solid"
			class={cn('p-4 transition-colors hover:bg-dark-900/60')}
		>
			{@render content()}
		</Panel>
	</a>
{:else}
	<Panel tone="solid" class="p-4">
		{@render content()}
	</Panel>
{/if}
