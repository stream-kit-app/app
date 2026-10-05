<script lang="ts">
	import { Button } from '@stream-kit/ui/button';

	import { docsUrl, DOWNLOAD_URL } from '#lib/marketing/links.js';
</script>

<section class="px-6 pt-8 pb-32">
	<div class="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
		<h2
			class="font-outfit text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl"
		>
			Ready to put your stream on autopilot?
		</h2>
		<p class="text-lg text-balance text-muted-foreground">
			Download Stream Kit, connect your accounts and build your first action in minutes.
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3">
			<Button href={DOWNLOAD_URL} size="lg" icon="ri:download-2-line" class="px-7">
				Download for Windows
			</Button>
			<Button href={docsUrl('get-started/introduction')} size="lg" variant="ghost">
				Getting started guide
			</Button>
		</div>
	</div>
</section>
