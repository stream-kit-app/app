<script lang="ts">
	import Icon from '@iconify/svelte';

	import { faqs } from '#lib/marketing/content.js';

	import SectionHeading from './section-heading.svelte';
</script>

<section id="faq" class="scroll-mt-16 px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-3xl">
		<SectionHeading label="FAQ" title="Questions, answered" />

		<div class="mt-14 divide-y divide-rule border-y border-rule">
			{#each faqs as faq (faq.question)}
				<details class="group">
					<summary
						class="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium text-foreground select-none [&::-webkit-details-marker]:hidden"
					>
						{faq.question}
						<Icon
							icon="ri:add-line"
							class="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
						/>
					</summary>
					<p class="-mt-2 pb-6 leading-relaxed text-muted-foreground">{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
