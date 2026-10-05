<script lang="ts">
	import { showcases } from '#lib/marketing/content.js';

	import FeatureShowcase from './feature-showcase.svelte';
	import SectionHeading from './section-heading.svelte';
</script>

<section id="features" class="scroll-mt-16 px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-6xl">
		<SectionHeading label="Features" title="One app for your whole stream">
			Stop juggling separate tools for alerts, chat bots and scene switching. Stream Kit
			brings them together, and lets them work with each other.
		</SectionHeading>

		<div class="mt-20 flex flex-col gap-28 sm:gap-36">
			{#each showcases as showcase, index (showcase.id)}
				<FeatureShowcase {showcase} reversed={index % 2 === 1} />
			{/each}
		</div>
	</div>
</section>
