<script lang="ts">
	import type { Connection } from '../lib/connection.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getConnectionsService } from '../lib/get-connections';

	type Props = {
		connection: Connection;
		modalId: string;
	};

	let { connection, modalId }: Props = $props();
	const connections = getConnectionsService();
	const app = connections.requireApp();
	const t = app.i18n.t;

	const hasLogs = $derived.by(() => {
		void connections.logsRevision;

		return connection.id != null && connections.getLogs(connection.id).length > 0;
	});

	function handleClear(): void {
		if (connection.id == null) {
			return;
		}

		connections.clearLogs(connection.id);
	}
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
	<Button
		type="button"
		variant="outline"
		icon="ri:delete-bin-line"
		disabled={!hasLogs}
		onclick={handleClear}
	>
		{t('Clear logs')}
	</Button>
	<Button type="button" variant="ghost" onclick={() => app.modal.get(modalId)?.close()}>
		{t('Close')}
	</Button>
</div>
