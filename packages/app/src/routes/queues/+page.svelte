<script lang="ts">
	import type { ActionQueueDefinition } from '$lib/core/action-queue/action-queues.svelte';

	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

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

<Container class="px-6 py-6" size="md">
	{#if queues.length === 0}
		<div
			class="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
		>
			<div class="boot-ambient pointer-events-none opacity-30"></div>
			<div
				class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
			>
				<Icon icon="ri:list-ordered" class="size-7" aria-hidden="true" />
			</div>
			<div class="relative flex flex-col gap-1.5">
				<p class="text-lg font-semibold text-dark-50">{t('No queues yet')}</p>
				<p class="text-sm text-dark-300">
					{t('Create a queue to run matching actions one after another.')}
				</p>
			</div>
			<Button class="relative" icon="ri:add-fill" onclick={openCreate}>
				{t('Add Queue')}
			</Button>
		</div>
	{:else}
		<div class="grid gap-3">
			{#each queues as queue (queue.id)}
				<QueueCard {queue} onEdit={openEdit} />
			{/each}
		</div>
	{/if}
</Container>

<QueueEditDialog bind:open={dialogOpen} queue={editingQueue} />
