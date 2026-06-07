<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { app } from '$lib/core';
</script>

<Button variant="outline" icon="ri:twitch-line" onclick={() => app.twitch.disconnect()}>
	Disconnect your Twitch account
</Button>
