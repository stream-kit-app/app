<script lang="ts">
	import Icon from '@iconify/svelte';

	import { steps } from '#lib/marketing/content.js';

	import FlowMock from './mocks/flow-mock.svelte';
	import SectionHeading from './section-heading.svelte';
</script>

<section id="how-it-works" class="scroll-mt-16 border-y border-rule bg-sidebar px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-6xl">
		<SectionHeading label="How it works" title="When this happens, do that">
			Every automation in Stream Kit is an <strong class="font-medium text-foreground"
				>action</strong
			>. You choose what starts it, when it should run and which steps it takes.
		</SectionHeading>

		<ol class="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
			{#each steps as step, index (step.title)}
				<li class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span
							class="flex size-10 items-center justify-center rounded-lg border border-rule bg-surface text-primary"
						>
							<Icon icon={step.icon} class="size-5" />
						</span>
						<span class="text-sm text-muted-foreground">Step {index + 1}</span>
					</div>
					<h3 class="font-outfit text-xl font-semibold text-foreground">{step.title}</h3>
					<p class="leading-relaxed text-muted-foreground">{step.description}</p>
				</li>
			{/each}
		</ol>

		<div class="mt-16">
			<FlowMock />
			<p class="mt-4 text-center text-sm text-muted-foreground">
				Example: thank every new follower with an alert, a sound and a chat message.
			</p>
		</div>
	</div>
</section>
