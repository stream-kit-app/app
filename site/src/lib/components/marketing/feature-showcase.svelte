<script lang="ts">
	import type { Showcase } from '#lib/marketing/content.js';

	import Icon from '@iconify/svelte';

	import { docsUrl } from '#lib/marketing/links.js';

	import ActionsMock from './mocks/actions-mock.svelte';
	import BotMock from './mocks/bot-mock.svelte';
	import DashboardMock from './mocks/dashboard-mock.svelte';
	import OverlayMock from './mocks/overlay-mock.svelte';

	type Props = {
		showcase: Showcase;
		/** Put the mock on the left on large screens. */
		reversed?: boolean;
	};

	let { showcase, reversed = false }: Props = $props();

	const mocks = {
		actions: ActionsMock,
		overlays: OverlayMock,
		bot: BotMock,
		dashboard: DashboardMock
	};

	const Mock = $derived(mocks[showcase.mock]);
</script>

<article id={showcase.id} class="grid scroll-mt-24 items-center gap-12 lg:grid-cols-2 lg:gap-20">
	<div class={['flex flex-col gap-5', reversed && 'lg:order-2']}>
		<p class="text-sm font-medium text-primary">{showcase.label}</p>
		<h3
			class="font-outfit text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
		>
			{showcase.title}
		</h3>
		<p class="text-lg leading-relaxed text-muted-foreground">{showcase.description}</p>
		<ul class="mt-1 flex flex-col gap-3">
			{#each showcase.bullets as bullet (bullet)}
				<li class="flex items-start gap-3 text-dark-100">
					<Icon icon="ri:check-line" class="mt-0.5 size-5 shrink-0 text-primary" />
					{bullet}
				</li>
			{/each}
		</ul>
		<a
			href={docsUrl(showcase.docsPath)}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-100"
		>
			Learn more about {showcase.label.toLowerCase()}
			<Icon icon="ri:arrow-right-line" class="size-4" />
		</a>
	</div>

	<div class={reversed ? 'lg:order-1' : ''}>
		<Mock />
	</div>
</article>
