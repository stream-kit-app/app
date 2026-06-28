<script lang="ts">
	import type { ActionQueueDefinition } from '$lib/core/action-queue/action-queues.svelte';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';

	import QueueActionEntries from '$lib/components/core/queue/queue-action-entries.svelte';
	import QueueEditDialog from '$lib/components/core/queue/queue-edit-dialog.svelte';
	import { app } from '$lib/core';
	import { isQueueBlocking } from '$lib/core/action-queue/queue-mode';
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

	function togglePause(queue: ActionQueueDefinition): void {
		if (app.actionQueues.stats(queue.id).paused) {
			app.actionQueues.resume(queue.id);
		} else {
			app.actionQueues.pause(queue.id);
		}
	}

	async function deleteQueue(queue: ActionQueueDefinition): Promise<void> {
		if (app.actionQueues.isDefaultQueue(queue.id)) {
			return;
		}

		const confirmed = await app.confirm.ask({
			title: t('Delete queue?'),
			description: t(
				'Are you sure you want to delete "{name}"? Actions assigned to it will be moved to the default queue.',
				{ name: queue.name }
			),
			confirmLabel: t('Delete')
		});

		if (!confirmed) {
			return;
		}

		try {
			await app.actionQueues.delete(queue.id);
		} catch (error) {
			app.toast.create({
				title: t('Queue could not be deleted'),
				description: error instanceof Error ? error.message : t('Unknown error.'),
				variant: 'error'
			});
		}
	}
</script>

<Container class="px-6 py-6" size="md">
	<header class="flex flex-wrap items-start justify-between gap-4">
		<Heading level="1" subTitle={t('Run actions in order with named queues')}>
			{t('Queues')}
		</Heading>
		<Button icon="ri:add-fill" size="lg" onclick={openCreate}>
			{t('Add Queue')}
		</Button>
	</header>

	{#if queues.length === 0}
		<div
			class="relative mt-8 flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
		>
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
		<div class="mt-8 grid gap-3">
			{#each queues as queue (queue.id)}
				{@const stats = app.actionQueues.stats(queue.id)}
				{@const isDefault = app.actionQueues.isDefaultQueue(queue.id)}
				<div class="grid gap-4 rounded-xl border border-dark-600 bg-dark-800 px-4 py-4">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<div class="flex min-w-0 flex-col gap-1.5">
							<div class="flex items-center gap-2">
								<span class="truncate font-medium text-dark-50">{queue.name}</span>
								{#if isDefault}
									<Badge variant="secondary" size="sm">{t('Default')}</Badge>
								{/if}
								{#if stats.paused}
									<Badge variant="warning" size="sm">{t('Paused')}</Badge>
								{/if}
							</div>
							<div class="flex flex-wrap items-center gap-2 text-xs text-dark-300">
								<span
									class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-900 px-2.5 py-1"
								>
									<Icon
										icon={isQueueBlocking(queue.concurrency)
											? 'ri:pause-circle-line'
											: 'ri:play-circle-line'}
										class="size-3.5"
										aria-hidden="true"
									/>
									{isQueueBlocking(queue.concurrency)
										? t('Blocking')
										: t('Concurrent')}
								</span>
								<span
									class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-900 px-2.5 py-1"
								>
									<Icon
										icon="ri:ruler-line"
										class="size-3.5"
										aria-hidden="true"
									/>
									{queue.maxLength != null
										? t('Max length: {count}', { count: queue.maxLength })
										: t('Max length: unlimited')}
								</span>
								<span
									class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-900 px-2.5 py-1"
								>
									<Icon
										icon="ri:loader-4-line"
										class="size-3.5 text-primary"
										aria-hidden="true"
									/>
									{t('{active} running / {pending} pending', {
										active: stats.active,
										pending: stats.pending
									})}
								</span>
							</div>
						</div>

						<div class="flex shrink-0 flex-wrap items-center gap-1">
							<Button
								size="sm"
								variant="outline"
								icon={stats.paused ? 'ri:play-line' : 'ri:pause-line'}
								onclick={() => togglePause(queue)}
							>
								{stats.paused ? t('Resume') : t('Pause')}
							</Button>
							<Button
								size="sm"
								variant="outline"
								icon="ri:eraser-line"
								disabled={stats.pending === 0}
								onclick={() => app.actionQueues.clear(queue.id)}
							>
								{t('Clear')}
							</Button>
							<Button
								size="sm"
								variant="ghost"
								icon="ri:edit-line"
								aria-label={t('Edit queue')}
								onclick={() => openEdit(queue)}
							/>
							<Button
								size="sm"
								variant="ghost"
								icon="ri:delete-bin-line"
								aria-label={t('Delete queue')}
								disabled={isDefault}
								onclick={() => void deleteQueue(queue)}
							/>
						</div>
					</div>

					<div
						class="grid items-start gap-4 border-t border-dark-700 pt-4 md:grid-cols-2"
					>
						<QueueActionEntries
							title={t('Running')}
							entries={stats.activeActions}
							variant="active"
							emptyLabel={t('No actions running')}
						/>
						<QueueActionEntries
							title={t('Pending')}
							entries={stats.pendingActions}
							variant="pending"
							emptyLabel={t('No actions pending')}
						/>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Container>

<QueueEditDialog bind:open={dialogOpen} queue={editingQueue} />
