<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Logo } from '@stream-kit/ui/logo';

	import favicon from '$lib/assets/favicon.svg';

	import './layout.css';

	import { resolve } from '$app/paths';

	// TODO: replace with the real download URL once available
	const downloadUrl = '#';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative isolate min-h-screen w-full overflow-x-clip p-4 sm:p-8">
	<div class="boot-grid pointer-events-none fixed inset-0 -z-10" aria-hidden="true"></div>

	<Container center size="lg" class="sticky top-4 z-50 sm:top-8">
		<header
			class="flex items-center gap-6 rounded-xl border border-dark-600 bg-dark-800/85 p-4 backdrop-blur-md sm:gap-12"
		>
			<Logo />
			<nav class="hidden gap-2 sm:flex">
				<a href="/" class="rounded-lg px-5 py-4 hover:bg-dark-700">Home</a>
				<a href="https://docs.stream-kit.app" class="rounded-lg px-5 py-4 hover:bg-dark-700">Docs</a>
				<a href={resolve('/plugins')} class="rounded-lg px-5 py-4 hover:bg-dark-700"
					>Plugins</a
				>
			</nav>
			<div class="ms-auto">
				<Button href={downloadUrl} icon="mdi:download">Download</Button>
			</div>
		</header>
	</Container>

	<main>
		{@render children()}
	</main>
</div>
