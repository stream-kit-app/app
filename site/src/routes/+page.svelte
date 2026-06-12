<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

	import AppMock from './app-mock.svelte';

	// TODO: replace with the real download URL once available
	const downloadUrl = '#';

	const features = [
		{
			icon: 'mdi:message-flash-outline',
			title: 'Chat commands',
			description:
				'Custom commands with aliases, permissions, cooldowns and full handler chains. Your chat, your rules.'
		},
		{
			icon: 'mdi:timer-outline',
			title: 'Smart timers',
			description:
				'Schedule anything on randomized intervals. Online-only mode and chat-activity thresholds included.'
		},
		{
			icon: 'mdi:shield-check-outline',
			title: 'Auto-moderation',
			description:
				'Build moderation rules with a visual condition tree. Caps, links, flood — handled before you blink.'
		},
		{
			icon: 'mdi:vector-link',
			title: 'Actions & triggers',
			description:
				'Chain handlers together and fire them from any trigger. Automate your entire stream without code.'
		},
		{
			icon: 'mdi:account-group-outline',
			title: 'Twitch + YouTube',
			description:
				'Connect both platforms at once. One bot, one dashboard, every chat covered simultaneously.'
		},
		{
			icon: 'mdi:video-wireless-outline',
			title: 'OBS control',
			description:
				'Switch scenes, toggle sources and react to events in OBS straight from your automations.'
		},
		{
			icon: 'mdi:text-to-speech',
			title: 'Text-to-speech',
			description:
				'Give your alerts and chat a voice with built-in TTS that plugs right into handler chains.'
		},
		{
			icon: 'mdi:connection',
			title: 'WebSocket API',
			description:
				'Hook up overlays, hardware or your own tools with realtime WebSocket triggers and conditions.'
		}
	];

	const plugins = [
		{ icon: 'mdi:puzzle-outline', name: 'Core', description: 'Variables, logging & process triggers' },
		{ icon: 'mdi:twitch', name: 'Twitch', description: 'Chat, events & channel integration' },
		{ icon: 'mdi:youtube', name: 'YouTube', description: 'Live chat & stream integration' },
		{ icon: 'mdi:robot-outline', name: 'Bot', description: 'Commands, timers & moderation' },
		{ icon: 'mdi:video-wireless-outline', name: 'OBS', description: 'Scenes, sources & recording' },
		{ icon: 'mdi:text-to-speech', name: 'TTS', description: 'Text-to-speech voices' },
		{ icon: 'mdi:connection', name: 'WebSocket', description: 'Realtime connections & triggers' }
	];

	const steps = [
		{
			title: 'Download & install',
			description: 'Grab the free Windows app and you are up and running in under a minute.'
		},
		{
			title: 'Connect your platforms',
			description: 'Link Twitch, YouTube and OBS with a couple of clicks. No config files, no tokens to copy.'
		},
		{
			title: 'Build your automations',
			description: 'Create commands, timers and moderation rules with visual handler chains.'
		},
		{
			title: 'Go live',
			description: 'Hit start on your stream and let Stream Kit handle the busywork while you entertain.'
		}
	];

	const faqs = [
		{
			question: 'Is Stream Kit free?',
			answer: 'Yes. Stream Kit is free to download and use for your streams.'
		},
		{
			question: 'How is this different from Streamer.bot?',
			answer: 'Stream Kit is built from the ground up as a modern desktop app: a clean dark UI, visual handler chains instead of scripting, and a plugin system that keeps everything organized. You get the same automation power without the learning curve.'
		},
		{
			question: 'Which platforms does it support?',
			answer: 'Twitch and YouTube are supported out of the box, and you can connect both at the same time. OBS integration is included for scene and source control.'
		},
		{
			question: 'Do I need to know how to code?',
			answer: 'No. Commands, timers, moderation rules and actions are all built visually with condition trees and handler chains. For advanced setups, the WebSocket plugin lets you integrate your own tools.'
		},
		{
			question: 'What do I need to run it?',
			answer: 'A Windows 10 or 11 PC. Stream Kit is a lightweight native desktop app, so it will not eat the resources you need for streaming.'
		}
	];

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>Stream Kit — The modern alternative to Streamer.bot</title>
	<meta
		name="description"
		content="Stream Kit is a free desktop app for streamers: chat commands, timers, auto-moderation and powerful automations for Twitch and YouTube. The modern alternative to Streamer.bot."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative">
	<div
		class="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-150 max-w-5xl rounded-full bg-primary-500/20 blur-[120px]"
		aria-hidden="true"
	></div>

	<Container center size="lg" class="pt-20 pb-12 sm:pt-28">
		<div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
			<Badge size="lg" variant="secondary">
				<Icon icon="mdi:sparkles" />
				The modern alternative to Streamer.bot
			</Badge>

			<h1
				class="font-outfit text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl"
			>
				Run your stream on
				<span
					class="bg-gradient-to-r from-primary-100 via-primary-200 to-secondary bg-clip-text text-transparent"
				>
					autopilot
				</span>
			</h1>

			<p class="max-w-2xl text-lg text-balance text-muted-foreground">
				Chat commands, timers, auto-moderation and powerful automations for Twitch and
				YouTube — in one beautiful desktop app. No scripts. No spaghetti. Just stream.
			</p>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<Button href={downloadUrl} size="lg" icon="mdi:download" class="px-8">
					Download here
				</Button>
				<Button href="/docs" size="lg" variant="outline" icon="mdi:book-open-variant">
					Read the docs
				</Button>
			</div>

			<p class="flex items-center gap-2 text-sm text-muted-foreground">
				<Icon icon="mdi:microsoft-windows" class="size-4" />
				Free for Windows 10 / 11
			</p>
		</div>

		<div class="relative mt-16">
			<div
				class="pointer-events-none absolute inset-x-8 top-8 -z-10 h-full rounded-3xl bg-primary-500/25 blur-3xl"
				aria-hidden="true"
			></div>
			<AppMock />
		</div>
	</Container>
</section>

<!-- Features -->
<section id="features" class="scroll-mt-32">
	<Container center size="lg" class="py-20">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Everything your stream needs, nothing it doesn't
			</h2>
			<p class="mt-4 text-muted-foreground">
				Stop juggling five tools and a pile of scripts. Stream Kit bundles the essentials
				into one app that just works.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature (feature.title)}
				<article
					class="group rounded-xl border border-dark-600 bg-dark-800/60 p-6 transition-colors hover:border-primary-400/40 hover:bg-dark-800"
				>
					<div
						class="mb-4 flex size-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"
					>
						<Icon icon={feature.icon} class="size-5" />
					</div>
					<h3 class="font-outfit text-lg font-semibold">{feature.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
						{feature.description}
					</p>
				</article>
			{/each}
		</div>
	</Container>
</section>

<!-- Plugins -->
<section id="plugins" class="scroll-mt-32">
	<Container center size="lg" class="py-20">
		<div class="rounded-2xl border border-dark-600 bg-dark-900/70 p-8 sm:p-12">
			<div class="mx-auto mb-10 max-w-2xl text-center">
				<Badge variant="default" class="mb-4">
					<Icon icon="mdi:puzzle-outline" />
					Plugin ecosystem
				</Badge>
				<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
					Built on plugins, made to grow
				</h2>
				<p class="mt-4 text-muted-foreground">
					Every integration is a plugin. Enable what you need, ignore what you don't, and
					keep your setup clean.
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-3">
				{#each plugins as plugin (plugin.name)}
					<div
						class="flex items-center gap-3 rounded-xl border border-dark-600 bg-dark-800 px-4 py-3"
					>
						<Icon icon={plugin.icon} class="size-5 text-primary" />
						<div>
							<p class="text-sm font-semibold">{plugin.name}</p>
							<p class="text-xs text-muted-foreground">{plugin.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>

<!-- How it works -->
<section id="how-it-works" class="scroll-mt-32">
	<Container center size="lg" class="py-20">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Live in four steps
			</h2>
			<p class="mt-4 text-muted-foreground">
				From download to first automated stream in minutes — not evenings.
			</p>
		</div>

		<ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each steps as step, index (step.title)}
				<li class="relative rounded-xl border border-dark-600 bg-dark-800/60 p-6">
					<span
						class="font-outfit mb-4 inline-flex size-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground"
					>
						{index + 1}
					</span>
					<h3 class="font-outfit text-lg font-semibold">{step.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
						{step.description}
					</p>
				</li>
			{/each}
		</ol>
	</Container>
</section>

<!-- FAQ -->
<section id="faq" class="scroll-mt-32">
	<Container center size="md" class="py-20">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Frequently asked questions
			</h2>
		</div>

		<div class="flex flex-col gap-3">
			{#each faqs as faq (faq.question)}
				<details
					class="group rounded-xl border border-dark-600 bg-dark-800/60 open:bg-dark-800"
				>
					<summary
						class="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold select-none [&::-webkit-details-marker]:hidden"
					>
						{faq.question}
						<Icon
							icon="mdi:chevron-down"
							class="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
						/>
					</summary>
					<p class="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
						{faq.answer}
					</p>
				</details>
			{/each}
		</div>
	</Container>
</section>

<!-- CTA -->
<section id="download" class="scroll-mt-32">
	<Container center size="lg" class="py-20">
		<div
			class="relative overflow-hidden rounded-2xl border border-primary-400/30 bg-dark-900 p-10 text-center sm:p-16"
		>
			<div
				class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.38_0.16_255/0.35),transparent_60%)]"
				aria-hidden="true"
			></div>

			<div class="relative flex flex-col items-center gap-6">
				<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
					Ready to put your stream on autopilot?
				</h2>
				<p class="max-w-xl text-balance text-muted-foreground">
					Join the streamers who switched to a modern, visual way of automating their
					streams. Free to download, ready in minutes.
				</p>
				<Button href={downloadUrl} size="lg" icon="mdi:download" class="px-8">
					Download here
				</Button>
				<p class="flex items-center gap-2 text-sm text-muted-foreground">
					<Icon icon="mdi:microsoft-windows" class="size-4" />
					Free for Windows 10 / 11
				</p>
			</div>
		</div>
	</Container>
</section>

<!-- Footer -->
<footer class="border-t border-dark-700">
	<Container center size="lg" class="py-10">
		<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
			<p class="text-sm text-muted-foreground">© {year} Stream Kit. All rights reserved.</p>
			<nav class="flex gap-6 text-sm">
				<a href="/" class="text-muted-foreground hover:text-foreground">Home</a>
				<a href="/docs" class="text-muted-foreground hover:text-foreground">Docs</a>
				<a href="/contact" class="text-muted-foreground hover:text-foreground">Contact</a>
			</nav>
		</div>
	</Container>
</footer>
