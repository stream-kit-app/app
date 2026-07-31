<script lang="ts">
	import type { Connection } from '../lib/connection.svelte';
	import type { Connections } from '../lib/connections.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Panel } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';

	import { getConnectionsService } from '../lib/get-connections';

	type Props = {
		connection: Connection;
		connections: Connections;
	};

	let { connection, connections }: Props = $props();
	const t = getConnectionsService().requireApp().i18n.t;

	const status = $derived.by(() => {
		connections.revision;
		return connection.id ? connections.getStatus(connection.id) : 'disconnected';
	});
	const error = $derived.by(() => {
		connections.revision;
		return connection.id ? connections.getError(connection.id) : undefined;
	});

	const statusLabel = $derived.by(() => {
		switch (status) {
			case 'connected':
				return t('Connected');
			case 'connecting':
				return t('Connecting');
			case 'error':
				return t('Error');
			default:
				return t('Disconnected');
		}
	});

	const statusVariant = $derived.by(() => {
		switch (status) {
			case 'connected':
				return 'success' as const;
			case 'connecting':
				return 'default' as const;
			case 'error':
				return 'destructive' as const;
			default:
				return 'secondary' as const;
		}
	});

	const connectLabel = $derived(status === 'connected' ? t('Disconnect') : t('Connect'));
	const logsLabel = t('View logs');
</script>

<Panel
	tone="solid"
	class="group/card grid grid-cols-[1fr_auto] items-center transition-colors hover:bg-dark-900/60"
>
	<button
		type="button"
		class="group flex min-w-0 cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors"
		onclick={() => connection.open()}
	>
		<div
			class="flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
			aria-hidden="true"
		>
			<Icon icon="ri:links-line" class="size-5" />
		</div>

		<div class="min-w-0 flex-1">
			<p class="truncate font-medium text-dark-50">{connection.name.trim()}</p>
			<p class="truncate text-sm text-dark-300">{connection.url}</p>
			{#if error && status === 'error'}
				<p class="mt-0.5 truncate text-sm text-destructive-400">{error}</p>
			{/if}
		</div>

		<div class="flex shrink-0 flex-wrap justify-end gap-1">
			<Badge variant={statusVariant}>{statusLabel}</Badge>
			{#if connection.autoConnect}
				<Badge variant="outline">{t('Auto-connect')}</Badge>
			{/if}
		</div>

		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</button>

	{#if connection.id}
		<div class="flex shrink-0 items-center gap-1 pe-4">
			<Button
				type="button"
				variant="ghost"
				size="icon"
				icon="ri:file-list-3-line"
				aria-label={logsLabel}
				onclick={() => connection.openLogs()}
				{@attach tooltip(logsLabel)}
			/>
			{#if status === 'connected'}
				<Button
					type="button"
					variant="ghost"
					size="icon"
					icon="ri:link-unlink"
					class="text-destructive-400"
					aria-label={connectLabel}
					onclick={() => connections.disconnect(connection.id!)}
					{@attach tooltip(() => connectLabel)}
				/>
			{:else}
				<Button
					type="button"
					variant="ghost"
					size="icon"
					icon="ri:link"
					aria-label={connectLabel}
					onclick={() => connections.connect(connection.id!)}
					{@attach tooltip(() => connectLabel)}
				/>
			{/if}
		</div>
	{/if}
</Panel>
