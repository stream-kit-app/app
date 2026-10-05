<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import { plans } from '#lib/marketing/content.js';
	import { docsUrl, DOWNLOAD_URL } from '#lib/marketing/links.js';

	import SectionHeading from './section-heading.svelte';
</script>

<section id="pricing" class="scroll-mt-16 border-y border-rule bg-sidebar px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-4xl">
		<SectionHeading label="Pricing" title="Free to use. Pro when you want the cloud.">
			Everything runs locally on your PC for free. Pro is optional and adds features that need
			our servers.
		</SectionHeading>

		<div class="mt-16 grid gap-6 md:grid-cols-2">
			{#each plans as plan (plan.name)}
				<div
					class={[
						'flex flex-col rounded-xl border bg-surface p-8',
						plan.highlighted ? 'border-primary/40' : 'border-rule'
					]}
				>
					<div class="flex items-center gap-3">
						<h3 class="font-outfit text-2xl font-semibold text-foreground">
							{plan.name}
						</h3>
						{#if plan.highlighted}
							<Badge size="sm">Optional</Badge>
						{/if}
					</div>
					<p class="mt-2 text-muted-foreground">{plan.tagline}</p>

					<ul class="mt-8 flex flex-1 flex-col gap-3">
						{#each plan.features as feature (feature)}
							<li class="flex items-start gap-3 text-sm text-dark-100">
								<Icon
									icon="ri:check-line"
									class="mt-0.5 size-4 shrink-0 text-primary"
								/>
								{feature}
							</li>
						{/each}
					</ul>

					<div class="mt-8">
						{#if plan.highlighted}
							<Button
								href={docsUrl('get-started/account')}
								variant="outline"
								class="w-full"
							>
								Learn about Pro
							</Button>
						{:else}
							<Button href={DOWNLOAD_URL} icon="ri:download-2-line" class="w-full">
								Download for free
							</Button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
