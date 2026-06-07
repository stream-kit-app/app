<script lang="ts">
	import type { TwitchPluginApi } from '@stream-kit/plugin-twitch';

	import { Container } from '$lib/components/ui/container';
	import { Heading } from '$lib/components/ui/heading';
	import { app } from '$lib/core';

	const twitch = $derived(app.plugins.tryGet<TwitchPluginApi>('twitch'));
</script>

{#if twitch?.isConnected}
	<Container class="px-6 py-6">
		<Heading level="1">Bot Settings</Heading>
	</Container>
{:else}
	<div
		class="ms-4 flex h-full flex-col items-center justify-center rounded-xl border border-dark-600"
	>
		<p class="text-dark-100">Connect Twitch from the Plugins page to manage bot settings.</p>
	</div>
{/if}
