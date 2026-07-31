<script lang="ts">
	import type { ActionQueueDefinition } from '$lib/core/action-queue/action-queues.svelte';

	import { Dialog } from 'bits-ui';
	import { watch } from 'runed';

	import { Button } from '@stream-kit/ui/button';
	import { InputSwitch, InputText } from '@stream-kit/ui/input';

	import {
		concurrencyFromBlocking,
		isQueueBlocking
	} from '$lib/core/action-queue/queue-mode';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		open?: boolean;
		queue?: ActionQueueDefinition | null;
	};

	let { open = $bindable(false), queue = null }: Props = $props();

	const { t } = useI18n();

	let name = $state('');
	let blocking = $state(true);
	let maxLength = $state('');
	let saving = $state(false);

	const isEditing = $derived(queue != null);
	const isDefaultQueue = $derived(
		queue != null && getApp().actionQueues.isDefaultQueue(queue.id)
	);
	const canSave = $derived(name.trim().length > 0 && !saving);

	watch(
		() => open,
		(isOpen) => {
			if (isOpen) {
				name = queue?.name ?? '';
				blocking = queue != null ? isQueueBlocking(queue.concurrency) : true;
				maxLength = queue?.maxLength != null ? String(queue.maxLength) : '';
			}
		}
	);

	function handleOpenChange(value: boolean): void {
		open = value;
	}

	function parseOptionalNumber(value: string): number | null {
		const trimmed = value.trim();

		if (trimmed === '') {
			return null;
		}

		const parsed = Number(trimmed);

		return Number.isFinite(parsed) ? parsed : null;
	}

	async function handleSave(): Promise<void> {
		if (!canSave) {
			return;
		}

		saving = true;

		try {
			const input = {
				name: name.trim(),
				concurrency: concurrencyFromBlocking(blocking),
				maxLength: parseOptionalNumber(maxLength)
			};

			const queues = getApp().actionQueues;

			if (queue != null) {
				await queues.update(queue.id, input);
			} else {
				await queues.create(input);
			}

			open = false;
		} finally {
			saving = false;
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
				'rounded-none border border-rule bg-dark-800 p-6 shadow-lg duration-75 outline-none',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
				'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
			)}
		>
			<Dialog.Title class="text-lg font-semibold text-dark-50">
				{isEditing ? t('Edit queue') : t('New queue')}
			</Dialog.Title>
			<Dialog.Description class="mt-1 text-sm text-dark-200">
				{t('Queues run their assigned actions in order.')}
			</Dialog.Description>

			<div class="mt-6 grid gap-5">
				<InputText
					label={t('Name')}
					required
					disabled={isDefaultQueue}
					value={name}
					oninput={(event) => (name = event.currentTarget.value)}
				/>
				<div class="grid gap-2">
					<InputSwitch label={t('Blocking')} bind:checked={blocking} />
					<p class="text-sm text-dark-300">
						{blocking
							? t('Run one action at a time. The next action starts when the current one finishes.')
							: t('Run queued actions at the same time.')}
					</p>
				</div>
				<InputText
					label={t('Max length')}
					type="number"
					min="1"
					step="1"
					placeholder={t('Unlimited')}
					value={maxLength}
					oninput={(event) => (maxLength = event.currentTarget.value)}
				/>
			</div>

			<div class="mt-6 flex flex-wrap justify-end gap-2">
				<Dialog.Close>
					{#snippet child({ props })}
						<Button {...props} variant="outline" disabled={saving}>{t('Cancel')}</Button>
					{/snippet}
				</Dialog.Close>
				<Button disabled={!canSave} onclick={() => void handleSave()}>
					{isEditing ? t('Save') : t('Create queue')}
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
