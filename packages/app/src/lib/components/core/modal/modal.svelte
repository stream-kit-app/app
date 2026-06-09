<script lang="ts">
	import type { Modal } from '$lib/core/modal';

	import Icon from '@iconify/svelte';
	import { Dialog } from 'bits-ui';

	import { ScrollArea } from '@stream-kit/ui/scroll-area';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		modal: Modal;
	};

	const { modal }: Props = $props();
	const { t } = useI18n();
</script>

<Dialog.Root bind:open={modal.isOpen}>
	<Dialog.Portal>
		<Dialog.Overlay
			class={cn(
				'fixed inset-0 bg-black/50',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'
			)}
		/>
		<Dialog.Content class={cn('group fixed inset-0 flex h-screen w-screen justify-end p-4')}>
			<ScrollArea
				orientation="vertical"
				class={cn(
					'h-full min-h-0 w-full overflow-hidden rounded-2xl bg-dark-800',
					'group-data-[state=open]:animate-in group-data-[state=open]:slide-in-from-right-4',
					'group-data-[state=closed]:animate-out group-data-[state=closed]:slide-out-to-right-4',
					{
						'max-w-md': modal.size === 'sm',
						'max-w-xl': modal.size === 'md',
						'max-w-2xl': modal.size === 'lg',
						'max-w-full': modal.size === 'full'
					}
				)}
				viewportClasses="h-full w-full"
			>
				<div class="p-8">
					<Dialog.Close
						class={cn(
							'mb-6 flex cursor-pointer items-center gap-2 text-dark-50 outline-none hover:text-dark-100',
							'group-data-[state=open]:animate-in group-data-[state=open]:slide-in-from-right-4',
							'group-data-[state=closed]:animate-out group-data-[state=closed]:slide-out-to-right-4'
						)}
					>
						<Icon icon="ri:close-fill" class="h-6 w-6" />
						<span>{t('Close')}</span>
					</Dialog.Close>
					<Dialog.Title class="text-2xl font-bold">{modal.title}</Dialog.Title>
					{#if modal.description}
						<Dialog.Description class="mt-1 text-dark-200">
							{modal.description}
						</Dialog.Description>
					{/if}
					<div class="mt-6">
						<modal.content {...modal.props} />
					</div>
				</div>
			</ScrollArea>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
