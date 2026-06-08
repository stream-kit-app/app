<script lang="ts">
	import type { TwitchPluginApi } from '@stream-kit/plugin-twitch';

	import { Container } from '$lib/components/ui/container';
	import { Heading } from '$lib/components/ui/heading';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	const twitch = $derived(app.plugins.tryGet<TwitchPluginApi>('twitch'));
</script>

{#if twitch?.isConnected}
	<Container class="px-6 py-6">
		<Heading level="1">{t('Bot Settings')}</Heading>
	</Container>
{:else}
	<div
		class="ms-4 flex h-full flex-col items-center justify-center rounded-xl border border-dark-600"
	>
		<p class="text-dark-100">{t('Connect Twitch from the Plugins page to manage bot settings.')}</p>
	</div>
{/if}
