<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Eyebrow, Panel } from '@stream-kit/ui/blueprint';

	import { cn } from '@stream-kit/plugin/utils';

	type Props = {
		title: string;
		description?: string;
		children: Snippet;
		actions?: Snippet;
		class?: string;
		bodyClass?: string;
	};

	let { title, description, children, actions, class: className, bodyClass }: Props = $props();
</script>

<Panel tone="solid" class={cn('flex min-w-0 flex-col overflow-hidden', className)}>
	{#snippet header()}
		<div class="flex min-h-8 flex-wrap items-center justify-between gap-3">
			<div class="flex min-w-0 flex-col gap-1.5">
				<Eyebrow>{title}</Eyebrow>
				{#if description}
					<p class="text-sm text-dark-300">{description}</p>
				{/if}
			</div>
			{#if actions}
				<div class="flex shrink-0 flex-wrap gap-2">
					{@render actions()}
				</div>
			{/if}
		</div>
	{/snippet}
	<div class={cn('flex-1 p-4', bodyClass)}>
		{@render children()}
	</div>
</Panel>
