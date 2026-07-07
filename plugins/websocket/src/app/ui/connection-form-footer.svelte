<script lang="ts">
	import type { Connection } from '../lib/connection.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getConnectionsService } from '../lib/get-connections';

	type Props = {
		connection: Connection;
	};

	let { connection }: Props = $props();
	const app = getConnectionsService().requireApp();
	const t = app.i18n.t;

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

<div class="flex flex-wrap items-center justify-between gap-2">
	<div class="flex items-center gap-2">
		{#if connection.id != null}
			<Button
				variant="destructive"
				type="button"
				onclick={() => void handleDelete()}
				icon="ri:delete-bin-line"
			>
				{t('Delete')}
			</Button>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		<Button variant="ghost" type="button" onclick={() => connection.close()}>
			{t('Cancel')}
		</Button>
		<Button type="button" onclick={() => void connection.save()}>{t('Save')}</Button>
	</div>
</div>
