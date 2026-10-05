<script lang="ts">
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import { DOCS_URL, DOWNLOAD_URL } from '#lib/marketing/links.js';

	import AppMock from './mocks/app-mock.svelte';
</script>

<section class="px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
	<div class="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
		<Badge variant="outline" class="gap-2 px-3 py-1 font-medium text-muted-foreground">
			<span class="size-1.5 rounded-full bg-brand"></span>
			Early access · Windows 10 &amp; 11
		</Badge>

		<h1
			class="font-outfit text-5xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-7xl"
		>
			Automate your stream.
			<span class="text-muted-foreground">No code required.</span>
		</h1>

		<p class="max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
			Stream Kit is a desktop app that connects Twitch, YouTube, OBS and more, so chat
			commands, alerts, overlays and scene changes run themselves while you focus on your
			stream.
		</p>

		<div class="flex flex-wrap items-center justify-center gap-3">
			<Button href={DOWNLOAD_URL} size="lg" icon="ri:download-2-line" class="px-7">
				Download for Windows
			</Button>
			<Button
				href={DOCS_URL}
				size="lg"
				variant="ghost"
				icon="ri:arrow-right-line"
				iconPosition="end"
			>
				Read the docs
			</Button>
		</div>

		<p class="text-sm text-muted-foreground">Free to use · Optional Pro for cloud features</p>
	</div>

	<div class="mx-auto mt-16 max-w-5xl sm:mt-20">
		<AppMock />
	</div>
</section>
