<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import { Crosshair, GridFrame, SectionRule } from '@stream-kit/ui/blueprint';
	import { Logo } from '@stream-kit/ui/logo';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';

	import '../layout.css';

	// TODO: replace with the real download URL once available
	const downloadUrl = '#';

	let { children } = $props();

	const pluginsPath = resolve('/plugins');
	const homePath = resolve('/');
	const pathname = $derived(page.url.pathname);

	const isHome = $derived(pathname === homePath || pathname === '/');
	const isPlugins = $derived(
		pathname === pluginsPath || pathname.startsWith(`${pluginsPath}/`)
	);

	const year = new Date().getFullYear();

	const navLinkClass =
		'relative flex h-full items-center px-3 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground';
	const navActiveClass = 'text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-primary';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<GridFrame>
	<header class="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
		<div class="relative flex h-12 items-stretch">
			<Crosshair position="top-left" size="sm" />
			<Crosshair position="top-right" size="sm" />

			<a
				href={homePath}
				class="flex shrink-0 items-center border-r border-rule px-4 hover:bg-dark-900/40 [&>span]:grid-cols-[28px_auto] [&>span]:gap-1.5 [&_svg]:h-7 [&_svg]:w-7 [&>span>span]:text-sm"
				aria-label="Stream Kit home"
			>
				<Logo />
			</a>

			<nav class="hidden flex-1 items-stretch sm:flex">
				<a href={homePath} class="{navLinkClass} {isHome ? navActiveClass : ''}" data-active={isHome}>
					Home
				</a>
				<a
					href="https://docs.stream-kit.app"
					class={navLinkClass}
					target="_blank"
					rel="noopener noreferrer"
				>
					Docs
				</a>
				<a
					href={pluginsPath}
					class="{navLinkClass} {isPlugins ? navActiveClass : ''}"
					data-active={isPlugins}
				>
					Plugins
				</a>
			</nav>

			<div class="ms-auto flex items-stretch border-l border-rule">
				<Button
					href={downloadUrl}
					variant="ghost"
					size="sm"
					class="h-full rounded-none border-0 px-5 font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-primary/10 hover:text-primary"
				>
					<Icon icon="mdi:download" class="size-3.5" />
					Download
				</Button>
			</div>
		</div>
		<SectionRule />
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<SectionRule />
		<div class="grid gap-8 px-6 py-12 sm:grid-cols-3">
			<div class="flex flex-col gap-3">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
					Product
				</p>
				<nav class="flex flex-col gap-2 text-sm">
					<a href={homePath} class="text-muted-foreground hover:text-foreground">Home</a>
					<a href={pluginsPath} class="text-muted-foreground hover:text-foreground">Plugins</a>
					<a
						href="https://docs.stream-kit.app"
						class="text-muted-foreground hover:text-foreground"
					>
						Docs
					</a>
				</nav>
			</div>
			<div class="flex flex-col gap-3">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
					Resources
				</p>
				<nav class="flex flex-col gap-2 text-sm">
					<a
						href="https://docs.stream-kit.app"
						class="text-muted-foreground hover:text-foreground"
					>
						Documentation
					</a>
					<a href="/contact" class="text-muted-foreground hover:text-foreground">Contact</a>
				</nav>
			</div>
			<div class="flex flex-col gap-3 sm:items-end">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
					Stream Kit
				</p>
				<p class="text-sm text-muted-foreground">© {year} Stream Kit. All rights reserved.</p>
			</div>
		</div>
		<SectionRule />
	</footer>
</GridFrame>
