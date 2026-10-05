<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';

	import { officialPlugins } from '#lib/marketing/content.js';

	import SectionHeading from './section-heading.svelte';
</script>

<section id="plugins" class="scroll-mt-16 px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-6xl">
		<SectionHeading label="Plugins" title="Built from plugins. Turn on what you need.">
			Every integration is a plugin. Enable the ones you use and keep the rest out of your
			way.
		</SectionHeading>

		<ul class="mt-16 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each officialPlugins as plugin (plugin.key)}
				<li>
					<a
						href="/plugins/{plugin.key}"
						class="flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors duration-150 hover:bg-item-hover"
					>
						<span
							class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-rule bg-surface text-primary"
						>
							<Icon icon={plugin.icon} class="size-5" />
						</span>
						<span class="min-w-0">
							<span class="block font-semibold text-foreground">{plugin.name}</span>
							<span class="mt-1 block text-sm leading-relaxed text-muted-foreground">
								{plugin.description}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="mt-12 flex justify-center">
			<Button href="/plugins" variant="outline" icon="ri:arrow-right-line" iconPosition="end">
				Browse the marketplace
			</Button>
		</div>
	</div>
</section>
