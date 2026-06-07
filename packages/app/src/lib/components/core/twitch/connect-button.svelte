<script>
	import { Button } from '$lib/components/ui/button';
	import { app } from '$lib/core';
</script>

<Button
	variant="ghost"
	class="bg-[#9146FF]"
	icon="ri:twitch-line"
	onclick={() => app.twitch.startOAuth()}
	isLoading={app.twitch.isAuthenticating}
>
	Connect your Twitch account
</Button>
