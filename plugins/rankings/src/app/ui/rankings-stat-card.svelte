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

<Panel tone="solid" class="p-4">
	<div class="flex items-start gap-3">
		<div
			class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			aria-hidden="true"
		>
			<Icon {icon} class="size-5" />
		</div>
		<div class="min-w-0 flex-1">
			<p class="text-2xl font-semibold text-dark-50">{value}</p>
			<p class="text-sm text-dark-100">{label}</p>
			{#if description}
				<p class="mt-0.5 text-xs text-dark-300">{description}</p>
			{/if}
		</div>
	</div>
</Panel>
