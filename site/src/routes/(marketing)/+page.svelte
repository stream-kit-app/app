<script lang="ts">
	import Icon from '@iconify/svelte';

	import {
		Cell,
		CellGrid,
		Crosshair,
		Eyebrow,
		Panel,
		SectionRule
	} from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';

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
			description:
				'Link Twitch, YouTube and OBS with a couple of clicks. No config files, no tokens to copy.'
		},
		{
			title: 'Build your automations',
			description: 'Create commands, timers and moderation rules with visual handler chains.'
		},
		{
			title: 'Go live',
			description:
				'Hit start on your stream and let Stream Kit handle the busywork while you entertain.'
		}
	];

	const faqs = [
		{
			question: 'Is Stream Kit free?',
			answer: 'Yes. Stream Kit is free to download and use for your streams.'
		},
		{
			question: 'How is this different from Streamer.bot?',
			answer:
				'Stream Kit is built from the ground up as a modern desktop app: a clean dark UI, visual handler chains instead of scripting, and a plugin system that keeps everything organized. You get the same automation power without the learning curve.'
		},
		{
			question: 'Which platforms does it support?',
			answer:
				'Twitch and YouTube are supported out of the box, and you can connect both at the same time. OBS integration is included for scene and source control.'
		},
		{
			question: 'Do I need to know how to code?',
			answer:
				'No. Commands, timers, moderation rules and actions are all built visually with condition trees and handler chains. For advanced setups, the WebSocket plugin lets you integrate your own tools.'
		},
		{
			question: 'What do I need to run it?',
			answer:
				'A Windows 10 or 11 PC. Stream Kit is a lightweight native desktop app, so it will not eat the resources you need for streaming.'
		}
	];

	function padIndex(n: number) {
		return String(n).padStart(2, '0');
	}
</script>

<svelte:head>
	<title>Stream Kit — The modern alternative to Streamer.bot</title>
	<meta
		name="description"
		content="Stream Kit is a free desktop app for streamers: chat commands, timers, auto-moderation and powerful automations for Twitch and YouTube. The modern alternative to Streamer.bot."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden">
	<div aria-hidden="true" class="blueprint-grid pointer-events-none absolute inset-0 opacity-60"></div>
	<div class="relative px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
		<div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
			<Eyebrow index="00">The modern alternative to Streamer.bot</Eyebrow>

			<h1
				class="font-outfit text-5xl leading-[1.05] font-bold tracking-tight text-balance text-foreground sm:text-6xl"
			>
				Run your stream on autopilot
			</h1>

			<p class="max-w-2xl text-lg text-balance text-muted-foreground">
				Chat commands, timers, auto-moderation and powerful automations for Twitch and YouTube —
				in one beautiful desktop app. No scripts. No spaghetti. Just stream.
			</p>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<Button href={downloadUrl} size="lg" icon="mdi:download" class="px-8">
					Download here
				</Button>
				<Button
					href="https://docs.stream-kit.app"
					size="lg"
					variant="outline"
					icon="mdi:book-open-variant"
				>
					Read the docs
				</Button>
			</div>

			<p class="flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
				<Icon icon="mdi:microsoft-windows" class="size-4" />
				Free for Windows 10 / 11
			</p>
		</div>

		<div class="relative mt-16 blueprint-ticks pb-2">
			<Panel crosshairs class="overflow-hidden p-0">
				<AppMock />
			</Panel>
		</div>
	</div>
</section>

<SectionRule />

<!-- Features -->
<section id="features" class="scroll-mt-20">
	<div class="px-6 py-16">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<Eyebrow index="01" class="mb-4">Features</Eyebrow>
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Everything your stream needs, nothing it doesn't
			</h2>
			<p class="mt-4 text-muted-foreground">
				Stop juggling five tools and a pile of scripts. Stream Kit bundles the essentials into one
				app that just works.
			</p>
		</div>
	</div>

	<CellGrid cols={4}>
		{#each features as feature, i (feature.title)}
			<Cell class="hover:bg-dark-900/60">
				<p class="mb-4 font-mono text-[11px] tracking-[0.14em] text-primary">
					{padIndex(i + 1)}
				</p>
				<div class="mb-4 flex size-9 items-center justify-center border border-rule text-primary">
					<Icon icon={feature.icon} class="size-4" />
				</div>
				<h3 class="font-outfit text-lg font-semibold">{feature.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
					{feature.description}
				</p>
			</Cell>
		{/each}
	</CellGrid>
</section>

<SectionRule />

<!-- Plugins -->
<section id="plugins" class="scroll-mt-20">
	<div class="px-6 py-16">
		<div class="mx-auto mb-10 max-w-2xl text-center">
			<Eyebrow index="02" class="mb-4">Plugin ecosystem</Eyebrow>
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Built on plugins, made to grow
			</h2>
			<p class="mt-4 text-muted-foreground">
				Every integration is a plugin. Enable what you need, ignore what you don't, and keep your
				setup clean.
			</p>
		</div>
	</div>

	<CellGrid cols={4}>
		{#each plugins as plugin (plugin.name)}
			<Cell href="/plugins" class="flex items-start gap-3">
				<div
					class="flex size-8 shrink-0 items-center justify-center border border-rule text-primary"
				>
					<Icon icon={plugin.icon} class="size-4" />
				</div>
				<div>
					<p class="text-sm font-semibold">{plugin.name}</p>
					<p class="mt-1 text-xs text-muted-foreground">{plugin.description}</p>
				</div>
			</Cell>
		{/each}
		<Cell href="/plugins" class="flex flex-col justify-center hover:bg-primary/5">
			<p class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">Browse all</p>
			<p class="mt-2 font-outfit text-lg font-semibold">Open the marketplace →</p>
		</Cell>
	</CellGrid>
</section>

<SectionRule />

<!-- How it works -->
<section id="how-it-works" class="scroll-mt-20">
	<div class="px-6 py-16">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<Eyebrow index="03" class="mb-4">How it works</Eyebrow>
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Live in four steps
			</h2>
			<p class="mt-4 text-muted-foreground">
				From download to first automated stream in minutes — not evenings.
			</p>
		</div>

		<ol class="relative grid gap-0 sm:grid-cols-4">
			<!-- Connector rail -->
			<div
				aria-hidden="true"
				class="pointer-events-none absolute top-5 right-0 left-0 hidden h-px border-t border-dashed border-rule sm:block"
			></div>

			{#each steps as step, index (step.title)}
				<li class="relative flex flex-col gap-4 px-4 py-2 sm:px-6">
					<span
						class="relative z-10 flex size-10 items-center justify-center border border-rule bg-background font-mono text-sm font-semibold text-brand"
					>
						{padIndex(index + 1)}
						<Crosshair position="top-left" size="sm" />
					</span>
					<div>
						<h3 class="font-outfit text-lg font-semibold">{step.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
							{step.description}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<SectionRule />

<!-- FAQ -->
<section id="faq" class="scroll-mt-20">
	<div class="px-6 py-16">
		<div class="mx-auto mb-12 max-w-2xl text-center">
			<Eyebrow index="04" class="mb-4">FAQ</Eyebrow>
			<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				Frequently asked questions
			</h2>
		</div>

		<div class="mx-auto max-w-3xl border-t border-rule">
			{#each faqs as faq (faq.question)}
				<details class="group border-b border-rule">
					<summary
						class="flex cursor-pointer items-center justify-between gap-4 py-5 font-semibold select-none [&::-webkit-details-marker]:hidden"
					>
						{faq.question}
						<span
							class="relative flex size-6 shrink-0 items-center justify-center font-mono text-sm text-muted-foreground transition-transform group-open:rotate-45"
							aria-hidden="true"
						>
							+
						</span>
					</summary>
					<p class="pb-5 text-sm leading-relaxed text-muted-foreground">
						{faq.answer}
					</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<SectionRule />

<!-- CTA -->
<section id="download" class="scroll-mt-20 relative">
	<div aria-hidden="true" class="blueprint-hatch pointer-events-none absolute inset-0 opacity-30"></div>
	<div class="relative px-6 py-20">
		<Panel crosshairs class="mx-auto max-w-3xl bg-dark-900/60 px-8 py-12 text-center sm:px-16 sm:py-16">
			<div class="flex flex-col items-center gap-6">
				<Eyebrow index="05">Get started</Eyebrow>
				<h2 class="font-outfit text-3xl font-bold tracking-tight text-balance sm:text-4xl">
					Ready to put your stream on autopilot?
				</h2>
				<p class="max-w-xl text-balance text-muted-foreground">
					Join the streamers who switched to a modern, visual way of automating their streams.
					Free to download, ready in minutes.
				</p>
				<Button href={downloadUrl} size="lg" icon="mdi:download" class="px-8">
					Download here
				</Button>
				<p
					class="flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground uppercase"
				>
					<Icon icon="mdi:microsoft-windows" class="size-4" />
					Free for Windows 10 / 11
				</p>
			</div>
		</Panel>
	</div>
</section>
