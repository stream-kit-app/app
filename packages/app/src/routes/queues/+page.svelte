<script lang="ts">
	import type { ActionQueueDefinition } from '#lib/core/action-queue/action-queues.svelte.js';

	import { Cell, CellGrid } from '@stream-kit/ui/blueprint';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import QueueCard from '#lib/components/core/queue/queue-card.svelte';
	import { QueueEditForm } from '#lib/components/core/queue/queue-edit.svelte.js';
	import QueueEditFormContent from '#lib/components/core/queue/queue-edit-form.svelte';
	import QueueEditFormFooter from '#lib/components/core/queue/queue-edit-form-footer.svelte';
	import { app } from '#lib/core/index.js';
	import { useI18n } from '#lib/i18n.js';

	const { t } = useI18n();

	const queues = $derived(app.actionQueues.definitions);

	function openQueueModal(queue: ActionQueueDefinition | null): void {
		const modalId = queue != null ? `queue-edit-${queue.id}` : 'queue-create';

		app
			.createModal({
				id: modalId,
				title: queue != null ? t('Edit queue') : t('New queue'),
				description: t('Queues run their assigned actions in order.'),
				content: QueueEditFormContent,
				footer: QueueEditFormFooter,
				props: { form: new QueueEditForm(modalId, queue) },
				size: 'sm'
			})
			.open();
	}

	function openCreate(): void {
		openQueueModal(null);
	}

	function openEdit(queue: ActionQueueDefinition): void {
		openQueueModal(queue);
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
		<CellGrid cols={1}>
			{#each queues as queue (queue.id)}
				<Cell class="p-0 *:rounded-none *:border-0 *:bg-transparent">
					<QueueCard {queue} onEdit={openEdit} />
				</Cell>
			{/each}
		</CellGrid>
	</Container>
{/if}
