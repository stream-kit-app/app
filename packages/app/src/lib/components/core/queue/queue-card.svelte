<script lang="ts">
	import type { ActionQueueDefinition } from '$lib/core/action-queue/action-queues.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Panel } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';

	import QueueActionEntries from '$lib/components/core/queue/queue-action-entries.svelte';
	import { app } from '$lib/core';
	import { isQueueBlocking } from '$lib/core/action-queue/queue-mode';
	import { useI18n } from '$lib/i18n';

	type Props = {
		queue: ActionQueueDefinition;
		onEdit: (queue: ActionQueueDefinition) => void;
	};

	let { queue, onEdit }: Props = $props();

	const { t } = useI18n();

	const stats = $derived(app.actionQueues.stats(queue.id));
	const isDefault = $derived(app.actionQueues.isDefaultQueue(queue.id));
	const isBlocking = $derived(isQueueBlocking(queue.concurrency));

	function togglePause(): void {
		if (stats.paused) {
			app.actionQueues.resume(queue.id);
		} else {
			app.actionQueues.pause(queue.id);
		}
	}

	async function deleteQueue(): Promise<void> {
		if (isDefault) {
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

<Panel
	tone="solid"
	class="group/card flex flex-col overflow-hidden transition-colors hover:bg-dark-900/60"
>
	<div class="flex items-start gap-3 border-b border-rule p-4">
		<div
			class="flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
			aria-hidden="true"
		>
			<Icon icon="ri:list-ordered" class="size-5" />
		</div>

		<div class="min-w-0 flex-1 space-y-2">
			<div class="flex min-w-0 flex-wrap items-center gap-2">
				<h2 class="min-w-0 truncate text-base font-semibold text-dark-50">{queue.name}</h2>
				{#if isDefault}
					<Badge variant="secondary" size="sm">{t('Default')}</Badge>
				{/if}
				{#if stats.paused}
					<Badge variant="warning" size="sm">{t('Paused')}</Badge>
				{/if}
			</div>

			<div class="flex flex-wrap items-center gap-1.5">
				<Badge variant="outline" size="sm">
					<Icon
						icon={isBlocking ? 'ri:pause-circle-line' : 'ri:play-circle-line'}
						aria-hidden="true"
					/>
					{isBlocking ? t('Blocking') : t('Concurrent')}
				</Badge>
				<Badge variant="outline" size="sm">
					<Icon icon="ri:ruler-line" aria-hidden="true" />
					{queue.maxLength != null
						? t('Max length: {count}', { count: queue.maxLength })
						: t('Max length: unlimited')}
				</Badge>
				<Badge variant="ghost" size="sm">
					<Icon icon="ri:loader-4-line" aria-hidden="true" />
					{t('{active} running / {pending} pending', {
						active: stats.active,
						pending: stats.pending
					})}
				</Badge>
			</div>
		</div>
	</div>

	<div class="bg-dark-900/50 p-4">
		<div class="grid items-start gap-4 md:grid-cols-2">
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

	<div class="flex items-center justify-between gap-2 border-t border-rule p-4">
		<div class="flex flex-wrap items-center gap-2">
			<Button
				size="sm"
				variant="outline"
				icon={stats.paused ? 'ri:play-line' : 'ri:pause-line'}
				onclick={togglePause}
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
		</div>

		<div class="flex shrink-0 items-center gap-1">
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:edit-line"
				aria-label={t('Edit queue')}
				onclick={() => onEdit(queue)}
				{@attach tooltip(() => t('Edit queue'))}
			/>
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:delete-bin-line"
				aria-label={t('Delete queue')}
				disabled={isDefault}
				onclick={() => void deleteQueue()}
				{@attach tooltip(() => t('Delete queue'))}
			/>
		</div>
	</div>
</Panel>
