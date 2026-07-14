<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		children: Snippet;
		actions?: Snippet;
		class?: string;
	};

	let { title, description, children, actions, class: className = '' }: Props = $props();
</script>

<section class="overflow-hidden rounded-xl border border-dark-600 bg-dark-800 {className}">
	<div
		class="flex flex-wrap items-start justify-between gap-3 border-b border-dark-700/80 px-4 py-3"
	>
		<div class="min-w-0">
			<h2 class="text-base font-semibold text-dark-50">{title}</h2>
			{#if description}
				<p class="mt-0.5 text-sm text-dark-300">{description}</p>
			{/if}
		</div>
		{#if actions}
			<div class="flex shrink-0 flex-wrap gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
	<div class="bg-dark-900/50 px-4 py-3">
		{@render children()}
	</div>
</section>
