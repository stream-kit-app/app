<script lang="ts">
	import { Container } from '@stream-kit/ui/container';

	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	import { Connection } from '../lib/connection.svelte';
	import { tryGetConnectionsService } from '../lib/get-connections';
	import ConnectionCard from './connection-card.svelte';
	import WebsocketEmptyState from './websocket-empty-state.svelte';

	let { app, title: _title, description: _description }: PluginCustomViewProps = $props();
	const t = $derived(app.i18n.t);

	const connections = $derived(tryGetConnectionsService());
	const connectionCount = $derived(connections?.items.length ?? 0);

	$effect(() => {
		app.toolbar.set({
			meta:
				connectionCount > 0
					? [
							{
								icon: 'ri:links-line',
								label: t('{count} connections', { count: connectionCount })
							}
						]
					: [],
			primaryActions: [
				{
					id: 'add-connection',
					label: t('Add Connection'),
					icon: 'ri:add-fill',
					variant: 'outline',
					onClick: () => Connection.createDraft().open()
				}
			]
		});
	});
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-2">
		{#if !connections || connections.items.length === 0}
			<WebsocketEmptyState
				icon="ri:links-line"
				title={t('No connections yet')}
				description={t(
					'Create a WebSocket connection to send and receive messages from your actions.'
				)}
				actionLabel={t('Add Connection')}
				onAction={() => Connection.createDraft().open()}
			/>
		{:else}
			{#each connections.items as connection (connection.id)}
				<ConnectionCard {connection} {connections} />
			{/each}
		{/if}
	</div>
</Container>
