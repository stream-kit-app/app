<script lang="ts">
	import { ConnectButton, TwitchDisconnectButton } from '$lib/components/core/twitch';
	import { app } from '$lib/core';

	$inspect(app.twitch.isConnected);
</script>

<div
	class="ms-4 flex h-full flex-col items-center justify-center rounded-xl border border-dark-600"
>
	{#if app.twitch.isConnected}
		<TwitchDisconnectButton />
	{:else}
		<ConnectButton />
	{/if}
</div>
