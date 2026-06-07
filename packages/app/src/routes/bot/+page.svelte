<script>
	import ConnectButton from '$lib/components/core/twitch/connect-button.svelte';
	import { Container } from '$lib/components/ui/container';
	import { Heading } from '$lib/components/ui/heading';
	import { app } from '$lib/core';
</script>

{#if app.twitch.isConnected}
	<Container class="px-6 py-6">
		<Heading level="1">Bot Settings</Heading>
	</Container>
{:else}
	<div
		class="ms-4 flex h-full flex-col items-center justify-center rounded-xl border border-dark-600"
	>
		<ConnectButton />
	</div>
{/if}
