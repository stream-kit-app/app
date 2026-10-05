<script lang="ts">
	import Icon from '@iconify/svelte';

	import { powerFeatures } from '#lib/marketing/content.js';
	import { docsUrl } from '#lib/marketing/links.js';
</script>

<section class="px-6 pb-24 sm:pb-32" aria-labelledby="power-users-title">
	<div class="mx-auto max-w-6xl rounded-xl border border-rule p-8 sm:p-10">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
			<h2 id="power-users-title" class="font-outfit text-xl font-semibold text-foreground">
				Room to grow
			</h2>
			<p class="text-sm text-muted-foreground">
				No code needed, but it is there when you want it.
			</p>
		</div>

		<ul class="mt-8 grid gap-8 sm:grid-cols-3">
			{#each powerFeatures as feature (feature.title)}
				<li>
					<a
						href={docsUrl(feature.docsPath)}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex cursor-pointer flex-col gap-2"
					>
						<Icon icon={feature.icon} class="size-5 text-primary" />
						<span
							class="flex items-center gap-1 font-semibold text-foreground group-hover:text-primary"
						>
							{feature.title}
							<Icon
								icon="ri:arrow-right-up-line"
								class="size-4 opacity-0 transition-opacity group-hover:opacity-100"
							/>
						</span>
						<span class="text-sm leading-relaxed text-muted-foreground">
							{feature.description}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
