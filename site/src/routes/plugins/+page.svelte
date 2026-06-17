<script lang="ts">
	import type { PageData } from './$types';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

	let { data }: { data: PageData } = $props();
	let plugins = $derived(data.plugins ?? []);
</script>

<svelte:head>
	<title>Plugins — Stream Kit</title>
	<meta
		name="description"
		content="Browse Stream Kit plugins: official integrations for Twitch, YouTube, OBS, TTS, and more. Download the latest releases for your setup."
	/>
</svelte:head>

<section class="relative">
	<div
		class="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-150 max-w-5xl rounded-full bg-primary-500/20 blur-[120px]"
		aria-hidden="true"
	></div>

	<Container center size="lg" class="pt-20 pb-12 sm:pt-28">
		<div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
			<Badge size="lg" variant="secondary">
				<Icon icon="mdi:puzzle-outline" />
				Plugin catalog
			</Badge>

			<h1 class="font-outfit text-4xl font-bold tracking-tight text-balance sm:text-5xl">
				Extend Stream Kit with plugins
			</h1>

			<p class="max-w-2xl text-lg text-balance text-muted-foreground">
				Every integration is a plugin. Download official releases and install them from the
				Stream Kit desktop app.
			</p>
		</div>
	</Container>
</section>

<section>
	<Container center size="lg" class="pb-20">
		{#if data.error}
			<div
				class="mb-8 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning-100"
				role="status"
			>
				{data.error}
			</div>
		{/if}

		{#if plugins.length === 0}
			<div
				class="rounded-2xl border border-dark-600 bg-dark-900/70 px-8 py-16 text-center sm:px-12"
			>
				<div
					class="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"
				>
					<Icon icon="mdi:puzzle-outline" class="size-6" />
				</div>
				<h2 class="font-outfit text-xl font-semibold">No plugins published yet</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Check back soon — official plugin releases will appear here.
				</p>
			</div>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each plugins as plugin (plugin.key)}
					<article
						class="flex min-h-52 flex-col gap-4 rounded-xl border border-dark-600 bg-dark-800/60 p-6 transition-colors hover:border-primary-400/40 hover:bg-dark-800"
					>
						<div class="flex items-start gap-3">
							<div
								class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"
							>
								<Icon icon={plugin.icon} class="size-5" />
							</div>
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
									<h2 class="font-outfit text-lg font-semibold">{plugin.name}</h2>
									<Badge variant="default">v{plugin.version}</Badge>
								</div>
								{#if plugin.description}
									<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
										{plugin.description}
									</p>
								{/if}
							</div>
						</div>

						<div class="mt-auto flex flex-col gap-3">
							{#if plugin.streamKitVersion}
								<p class="text-xs text-muted-foreground">
									Requires Stream Kit {plugin.streamKitVersion}
								</p>
							{/if}

							{#if plugin.downloadUrl}
								<Button
									href={plugin.downloadUrl}
									icon="mdi:download"
									class="w-full"
								>
									Download
								</Button>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</Container>
</section>
