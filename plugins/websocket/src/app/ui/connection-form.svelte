<script lang="ts">
	import type { Connection } from '../lib/connection.svelte';

	import { InputSwitch, InputText } from '@stream-kit/ui/input';

	import { getConnectionsService } from '../lib/get-connections';

	type Props = {
		connection: Connection;
	};

	let { connection }: Props = $props();
	const app = getConnectionsService().requireApp();
	const t = app.i18n.t;

	const duplicateWarning = $derived(
		connection.url.trim() ? connection.getDuplicateWarning() : undefined
	);
</script>

<form class="grid gap-6" onsubmit={(event) => event.preventDefault()}>
	<InputText
		label={t('Name')}
		required
		value={connection.name}
		error={connection.formErrors?.name}
		oninput={(event) => {
			connection.name = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<InputText
		label={t('WebSocket URL')}
		required
		placeholder="ws://localhost:8080"
		value={connection.url}
		error={connection.formErrors?.url}
		oninput={(event) => {
			connection.url = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	{#if duplicateWarning}
		<p class="text-sm text-warning-400">{duplicateWarning}</p>
	{/if}

	<InputSwitch label={t('Auto-connect')} bind:checked={connection.autoConnect} />
	<p class="text-sm text-dark-300">
		{t('Connect automatically when the plugin is enabled.')}
	</p>

	<div class="grid gap-4 sm:grid-cols-2">
		<InputText
			label={t('Max reconnect attempts')}
			type="number"
			min={1}
			max={100}
			required
			value={String(connection.maxConnectRetries)}
			error={connection.formErrors?.maxConnectRetries}
			oninput={(event) => {
				const value = Number.parseInt((event.currentTarget as HTMLInputElement).value, 10);
				connection.maxConnectRetries = Number.isNaN(value) ? 0 : value;
			}}
		/>

		<InputText
			label={t('Reconnect delay (seconds)')}
			type="number"
			min={1}
			max={300}
			required
			value={String(connection.reconnectDelaySec)}
			error={connection.formErrors?.reconnectDelaySec}
			oninput={(event) => {
				const value = Number.parseInt((event.currentTarget as HTMLInputElement).value, 10);
				connection.reconnectDelaySec = Number.isNaN(value) ? 0 : value;
			}}
		/>
	</div>
</form>
