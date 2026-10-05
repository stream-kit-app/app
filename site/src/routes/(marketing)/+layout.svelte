<script lang="ts">
	import Icon from '@iconify/svelte';
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	import { Button } from '@stream-kit/ui/button';
	import { Logo } from '@stream-kit/ui/logo';

	import favicon from '#lib/assets/favicon.svg';
	import { DOCS_URL, docsUrl, DOWNLOAD_URL, GITHUB_URL } from '#lib/marketing/links.js';

	import '../layout.css';

	let { children } = $props();

	const homePath = resolve('') || '/';
	const pluginsPath = resolve('plugins');

	const navLinks = [
		{ label: 'Features', href: `${homePath}#features` },
		{ label: 'How it works', href: `${homePath}#how-it-works` },
		{ label: 'Plugins', href: pluginsPath },
		{ label: 'Pricing', href: `${homePath}#pricing` }
	];

	const footerColumns = [
		{
			title: 'Product',
			links: [
				{ label: 'Features', href: `${homePath}#features` },
				{ label: 'Plugins', href: pluginsPath },
				{ label: 'Pricing', href: `${homePath}#pricing` },
				{ label: 'Download', href: DOWNLOAD_URL }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'Documentation', href: DOCS_URL },
				{ label: 'Getting started', href: docsUrl('get-started/introduction') },
				{ label: 'Build a plugin', href: docsUrl('developers/plugin-getting-started') },
				{ label: 'FAQ', href: `${homePath}#faq` }
			]
		},
		{
			title: 'Project',
			links: [
				{ label: 'GitHub', href: GITHUB_URL },
				{ label: 'Releases', href: `${GITHUB_URL}/releases` }
			]
		}
	];

	const pathname = $derived(page.url.pathname);
	const isPlugins = $derived(pathname === pluginsPath || pathname.startsWith(`${pluginsPath}/`));

	let scrollY = $state(0);
	let menuOpen = $state(false);

	const year = new Date().getFullYear();

	afterNavigate(() => {
		menuOpen = false;
	});

	function isExternal(href: string): boolean {
		return href.startsWith('http');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:scrollY />

<header
	class={[
		'sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md transition-colors duration-200',
		scrollY > 8 || menuOpen ? 'border-rule' : 'border-transparent'
	]}
>
	<div class="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
		<a
			href={homePath}
			class="flex shrink-0 cursor-pointer items-center [&_svg]:h-7 [&_svg]:w-7 [&>span]:grid-cols-[28px_auto] [&>span]:gap-2 [&>span>span]:text-sm"
			aria-label="Stream Kit home"
		>
			<Logo />
		</a>

		<nav class="hidden items-center gap-1 md:flex" aria-label="Main">
			{#each navLinks as link (link.label)}
				<a
					href={link.href}
					class={[
						'cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors duration-150 hover:text-foreground',
						link.href === pluginsPath && isPlugins
							? 'text-foreground'
							: 'text-muted-foreground'
					]}
				>
					{link.label}
				</a>
			{/each}
			<a
				href={DOCS_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="cursor-pointer rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
			>
				Docs
			</a>
		</nav>

		<div class="ms-auto flex items-center gap-2">
			<Button
				href={DOWNLOAD_URL}
				size="sm"
				icon="ri:download-2-line"
				class="hidden sm:inline-flex"
			>
				Download
			</Button>
			<button
				type="button"
				class="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-item-hover hover:text-foreground md:hidden"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon icon={menuOpen ? 'ri:close-line' : 'ri:menu-line'} class="size-5" />
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav
			class="border-t border-rule md:hidden"
			aria-label="Mobile"
			transition:slide={{ duration: 200 }}
		>
			<div class="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
				{#each navLinks as link (link.label)}
					<a
						href={link.href}
						class="cursor-pointer rounded-md px-3 py-2.5 text-dark-100 hover:bg-item-hover"
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
				<a
					href={DOCS_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="cursor-pointer rounded-md px-3 py-2.5 text-dark-100 hover:bg-item-hover"
				>
					Docs
				</a>
				<Button href={DOWNLOAD_URL} icon="ri:download-2-line" class="mt-3">
					Download for Windows
				</Button>
			</div>
		</nav>
	{/if}
</header>

<main>
	{@render children()}
</main>

<footer class="border-t border-rule">
	<div class="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5">
		<div class="flex flex-col gap-4 lg:col-span-2">
			<a
				href={homePath}
				class="w-fit cursor-pointer [&_svg]:h-7 [&_svg]:w-7 [&>span]:grid-cols-[28px_auto] [&>span]:gap-2 [&>span>span]:text-sm"
				aria-label="Stream Kit home"
			>
				<Logo />
			</a>
			<p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
				Automate your Twitch and YouTube stream without code. Free for Windows 10 &amp; 11.
			</p>
		</div>

		{#each footerColumns as column (column.title)}
			<div class="flex flex-col gap-4">
				<p class="text-sm font-semibold text-foreground">{column.title}</p>
				<ul class="flex flex-col gap-3">
					{#each column.links as link (link.label)}
						<li>
							<a
								href={link.href}
								class="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
								target={isExternal(link.href) ? '_blank' : undefined}
								rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="border-t border-rule">
		<div
			class="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between"
		>
			<p>© {year} Stream Kit</p>
			<p>Early access · Windows 10 &amp; 11</p>
		</div>
	</div>
</footer>
