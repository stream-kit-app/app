<script lang="ts">
	import type { Connection } from '../lib/connection.svelte';
	import type { Connections } from '../lib/connections.svelte';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		connection: Connection;
		connections: Connections;
	};

	let { connection, connections }: Props = $props();
	const { t } = useI18n();

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
</script>

<div
	class={cn(
		'border-border-dark-600 grid grid-cols-[1fr_auto_auto_auto] items-center rounded-xl border bg-dark-800 transition-colors hover:bg-dark-700'
	)}
>
	<button
		type="button"
		class="group col-span-4 grid cursor-pointer grid-cols-subgrid items-center px-6 py-4 text-left transition-colors"
		onclick={() => connection.open()}
	>
		<div class="min-w-0">
			<p class="truncate font-medium">{connection.name.trim()}</p>
			<p class="truncate text-sm text-dark-300">{connection.url}</p>
			<p class="mt-1 text-sm text-dark-400">
				{t('Retries: {max} · Delay: {delay}s', {
					max: connection.maxConnectRetries,
					delay: connection.reconnectDelaySec
				})}
			</p>
			{#if error}
				<p
					class={cn(
						'mt-1 truncate text-sm',
						status === 'error' ? 'text-destructive-400' : 'text-dark-300'
					)}
				>
					{error}
				</p>
			{/if}
		</div>

		<div class="flex flex-wrap justify-end gap-1">
			<Badge variant={statusVariant}>{statusLabel}</Badge>
			{#if connection.autoConnect}
				<Badge variant="outline">{t('Auto-connect')}</Badge>
			{/if}
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="ms-auto flex flex-wrap justify-end gap-1"
			onclick={(event) => event.stopPropagation()}
		>
			{#if connection.id}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onclick={() => connection.openLogs()}
				>
					{t('View logs')}
				</Button>
				{#if status === 'connected'}
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onclick={() => connections.disconnect(connection.id!)}
					>
						{t('Disconnect')}
					</Button>
				{:else}
					<Button
						type="button"
						variant="outline"
						size="sm"
						onclick={() => connections.connect(connection.id!)}
					>
						{t('Connect')}
					</Button>
				{/if}
			{/if}
		</div>

		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 justify-self-end text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</button>
</div>
