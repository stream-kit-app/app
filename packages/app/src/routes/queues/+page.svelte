<script lang="ts">
	import type { ActionQueueDefinition } from '$lib/core/action-queue/action-queues.svelte';

	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import QueueCard from '$lib/components/core/queue/queue-card.svelte';
	import QueueEditDialog from '$lib/components/core/queue/queue-edit-dialog.svelte';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let dialogOpen = $state(false);
	let editingQueue = $state<ActionQueueDefinition | null>(null);

	const queues = $derived(app.actionQueues.definitions);

	function openCreate(): void {
		editingQueue = null;
		dialogOpen = true;
	}

	function openEdit(queue: ActionQueueDefinition): void {
		editingQueue = queue;
		dialogOpen = true;
	}

	$effect(() => {
		app.toolbar.set({
			primaryActions: [
				{
					id: 'add-queue',
					label: t('Add Queue'),
					icon: 'ri:add-fill',
					onClick: openCreate
				}
			]
		});
	});
</script>

{#if queues.length === 0}
	<EmptyState
		icon="ri:list-ordered"
		title={t('No queues yet')}
		description={t('Create a queue to run matching actions one after another.')}
		actionLabel={t('Add Queue')}
		onAction={openCreate}
	/>
{:else}
	<Container class="px-6 py-6" size="md">
		<div class="grid gap-3">
			{#each queues as queue (queue.id)}
				<QueueCard {queue} onEdit={openEdit} />
			{/each}
		</div>
	</Container>
{/if}

<QueueEditDialog bind:open={dialogOpen} queue={editingQueue} />
