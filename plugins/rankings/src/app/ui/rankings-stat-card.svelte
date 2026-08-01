<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Panel } from '@stream-kit/ui/blueprint';

	type Props = {
		icon: string;
		value: string | number;
		label: string;
		description?: string;
	};

	let { icon, value, label, description }: Props = $props();
</script>

<Panel tone="flush" class="p-3">
	<div class="flex min-w-0 items-start gap-2.5">
		<div
			class="flex size-8 shrink-0 items-center justify-center border border-rule text-primary"
			aria-hidden="true"
		>
			<Icon {icon} class="size-4" />
		</div>
		<div class="min-w-0 flex-1">
			<p
				class="truncate font-mono text-base font-semibold tabular-nums tracking-tight text-dark-50"
				title={String(value)}
			>
				{value}
			</p>
			<p class="truncate text-xs text-dark-300">{label}</p>
			{#if description}
				<p class="mt-0.5 truncate text-xs text-dark-400">{description}</p>
			{/if}
		</div>
	</div>
</Panel>
