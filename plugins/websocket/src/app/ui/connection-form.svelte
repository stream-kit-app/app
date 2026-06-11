<script lang="ts">
	import type { Connection } from '../lib/connection.svelte';

	import { Button } from '@stream-kit/ui/button';
	import { InputSwitch, InputText } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		connection: Connection;
	};

	let { connection }: Props = $props();
	const { t } = useI18n();

	const duplicateWarning = $derived(
		connection.url.trim() ? connection.getDuplicateWarning() : undefined
	);

	async function handleSave() {
		await connection.save();
	}

	async function handleDelete() {
		const confirmed = await app.confirm.ask({
			title: t('Delete connection'),
			description: t('Are you sure you want to delete "{name}"? This cannot be undone.', {
				name: connection.name.trim() || t('this connection')
			}),
			confirmLabel: t('Delete')
		});

		if (confirmed) {
			await connection.delete();
		}
	}
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

	<div class="flex flex-wrap justify-between gap-3">
		{#if connection.id != null}
			<Button
				variant="destructive"
				type="button"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{:else}
			<div></div>
		{/if}

		<div class="flex gap-2">
			<Button variant="ghost" type="button" onclick={() => connection.close()}>
				{t('Cancel')}
			</Button>
			<Button type="button" onclick={() => void handleSave()}>{t('Save')}</Button>
		</div>
	</div>
</form>
