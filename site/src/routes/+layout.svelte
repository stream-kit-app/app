<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Logo } from '@stream-kit/ui/logo';
	import { Link as NavLink } from '@stream-kit/ui/nav';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';

	import './layout.css';

	// TODO: replace with the real download URL once available
	const downloadUrl = '#';

	let { children } = $props();

	const pluginsPath = resolve('/plugins');
	const activePath = $derived(
		page.url.pathname === pluginsPath || page.url.pathname.startsWith(`${pluginsPath}/`)
			? pluginsPath
			: page.url.pathname
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative isolate min-h-screen w-full bg-background">
	<header class="sticky top-0 z-50 border-b border-dark-600 bg-background">
		<Container center size="lg" class="flex h-14 items-center gap-6 px-6">
			<Logo />
			<nav class="hidden items-center gap-1 sm:flex">
				<NavLink href="/" {activePath}>Home</NavLink>
				<NavLink href="https://docs.stream-kit.app">Docs</NavLink>
				<NavLink href={pluginsPath} {activePath}>Plugins</NavLink>
			</nav>
			<div class="ms-auto">
				<Button href={downloadUrl} icon="mdi:download">Download</Button>
			</div>
		</Container>
	</header>

	<main>
		{@render children()}
	</main>
</div>
