<script lang="ts">
	import Faq from '#lib/components/marketing/faq.svelte';
	import Features from '#lib/components/marketing/features.svelte';
	import FinalCta from '#lib/components/marketing/final-cta.svelte';
	import Hero from '#lib/components/marketing/hero.svelte';
	import HowItWorks from '#lib/components/marketing/how-it-works.svelte';
	import Integrations from '#lib/components/marketing/integrations.svelte';
	import PluginsOverview from '#lib/components/marketing/plugins-overview.svelte';
	import PowerUsers from '#lib/components/marketing/power-users.svelte';
	import Pricing from '#lib/components/marketing/pricing.svelte';
</script>

<svelte:head>
	<title>Stream Kit — Automate your stream without code</title>
	<meta
		name="description"
		content="Stream Kit is a desktop app for Twitch and YouTube streamers. Build chat commands, alerts, overlays, timers and OBS automations visually — free for Windows."
	/>
</svelte:head>

<Hero />
<Integrations />
<HowItWorks />
<Features />
<PluginsOverview />
<PowerUsers />
<Pricing />
<Faq />
<FinalCta />
