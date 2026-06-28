<script lang="ts">
	import { getActionGroups } from '$db/repositories/actions';

	import { Dialog } from 'bits-ui';
	import { watch } from 'runed';

	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox, InputSelect, InputTextSelect } from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		open?: boolean;
		selectedIds?: number[];
		groupOrder?: string[];
		onApplied?: () => void;
	};

	let {
		open = $bindable(false),
		selectedIds = [],
		groupOrder = [],
		onApplied
	}: Props = $props();

	const { t } = useI18n();

	const NO_QUEUE_VALUE = 'none';

	let changeGroup = $state(false);
	let groupValue = $state('');
	let changeQueue = $state(false);
	let queueValue = $state(NO_QUEUE_VALUE);
	let applying = $state(false);

	const selectedCount = $derived(selectedIds.length);

	const canApply = $derived(
		(changeGroup && groupValue.trim().length > 0) || changeQueue
	);

	const queueItems = $derived([
		{ value: NO_QUEUE_VALUE, label: t('No queue') },
		...getApp().actionQueues.definitions.map((queue) => ({
			value: String(queue.id),
			label: queue.name
		}))
	]);

	function resetForm(): void {
		changeGroup = false;
		groupValue = '';
		changeQueue = false;
		queueValue = NO_QUEUE_VALUE;
	}

	function handleOpenChange(value: boolean): void {
		open = value;

		if (!value) {
			resetForm();
		}
	}

	watch(
		() => open,
		(isOpen) => {
			if (isOpen) {
				groupValue = '';
				queueValue = NO_QUEUE_VALUE;
			}
		}
	);

	async function handleApply(): Promise<void> {
		if (!canApply || applying) {
			return;
		}

		applying = true;

		try {
			const app = getApp();

			if (changeGroup && groupValue.trim().length > 0) {
				await app.actions.updateBulk(selectedIds, {
					group: groupValue,
					groupOrder
				});
			}

			if (changeQueue) {
				const queueId = queueValue === NO_QUEUE_VALUE ? null : Number(queueValue);
				await app.actions.assignQueueBulk(selectedIds, queueId);
			}

			open = false;
			resetForm();
			onApplied?.();
		} finally {
			applying = false;
		}
	}
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay
			class={cn(
				'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm duration-75',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'
			)}
		/>
		<Dialog.Content
			class={cn(
				'fixed top-1/2 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col',
				'rounded-2xl border border-dark-600 bg-dark-800 p-6 shadow-lg duration-75 outline-none',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
				'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
			)}
		>
			<Dialog.Title class="text-lg font-semibold text-dark-50">
				{t('Edit selected actions')}
			</Dialog.Title>
			<Dialog.Description class="mt-1 text-sm text-dark-200">
				{t('{count} selected', { count: selectedCount })}
			</Dialog.Description>

			<div class="mt-6 grid gap-5">
				<div class="grid gap-3">
					<InputCheckbox inline label={t('Move to group')} bind:checked={changeGroup} />
					<InputTextSelect
						label={t('Group')}
						placeholder={t('Select or enter a group')}
						items={getActionGroups}
						bind:value={groupValue}
						disabled={!changeGroup}
					/>
				</div>
				<div class="grid gap-3">
					<InputCheckbox inline label={t('Assign to queue')} bind:checked={changeQueue} />
					<InputSelect
						label={t('Queue')}
						items={queueItems}
						bind:value={queueValue}
						disabled={!changeQueue}
					/>
				</div>
			</div>

			<div class="mt-6 flex flex-wrap justify-end gap-2">
				<Dialog.Close>
					{#snippet child({ props })}
						<Button {...props} variant="outline" disabled={applying}>{t('Cancel')}</Button>
					{/snippet}
				</Dialog.Close>
				<Button disabled={!canApply || applying} onclick={() => void handleApply()}>
					{t('Apply changes')}
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
