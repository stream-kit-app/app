<script lang="ts">
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';

	import { useI18n } from '$lib/i18n';

	import { Connection } from '../lib/connection.svelte';
	import { tryGetConnectionsService } from '../lib/get-connections';
	import ConnectionCard from './connection-card.svelte';

	type Props = {
		title?: string;
		description?: string;
	};

	let { title, description }: Props = $props();
	const { t } = useI18n();

	const connections = $derived(tryGetConnectionsService());
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex justify-between gap-4">
		<Heading
			level="1"
			subTitle={description ?? t('Manage saved WebSocket connections used by triggers and handlers.')}
		>
			{title ?? t('WebSocket Connections')}
		</Heading>
		<Button
			variant="outline"
			icon="ri:add-fill"
			size="lg"
			onclick={() => Connection.createDraft().open()}
		>
			{t('Add Connection')}
		</Button>
	</header>

	<div class="mt-8 flex flex-col gap-2">
		{#if !connections || connections.items.length === 0}
			<p class="text-sm text-dark-300">{t('No connections saved yet.')}</p>
		{:else}
			{#each connections.items as connection (connection.id)}
				<ConnectionCard {connection} {connections} />
			{/each}
		{/if}
	</div>
</Container>
