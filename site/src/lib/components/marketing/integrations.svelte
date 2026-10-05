<script lang="ts">
	import Icon from '@iconify/svelte';

	import { integrations } from '#lib/marketing/content.js';
</script>

<section class="px-6 pb-24 sm:pb-32" aria-labelledby="integrations-title">
	<div class="mx-auto max-w-5xl">
		<p id="integrations-title" class="text-center text-sm text-muted-foreground">Works with</p>
		<ul class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
			{#each integrations as integration (integration.name)}
				<li class="flex items-center gap-2.5 text-dark-200">
					<Icon icon={integration.icon} class="size-5" />
					<span class="text-sm font-medium">{integration.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>
