<script lang="ts">
	import type { Modal } from '$lib/core/modal';

	import Icon from '@iconify/svelte';
	import { Dialog } from 'bits-ui';

	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import PluginComponentHost from '$lib/components/core/plugins/plugin-component-host.svelte';
	import { getModalPanelWidth } from '$lib/components/core/modal/modal-panel-width';
	import { MODAL_OVERLAY_DURATION_MS } from '$lib/components/core/modal/modal-overlay-motion';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		modal: Modal;
		onClosed?: () => void;
	};

	const { modal, onClosed }: Props = $props();
	const { t } = useI18n();

	const targetWidth = $derived(getModalPanelWidth(modal.size));

	let hasOpened = false;

	function ignoreFloatingLayerDismiss(event: PointerEvent | FocusEvent): void {
		const target = event.target;

		if (
			target instanceof Element &&
			(target.closest('[data-bits-floating-content-wrapper]') ||
				target.closest('[role="alertdialog"]') ||
				target.closest('[data-dialog-overlay]') ||
				target.closest('[data-alert-dialog-overlay]'))
		) {
			event.preventDefault();
		}
	}

	function handleOpenChange(open: boolean): void {
		if (open) {
			modal.open();
			return;
		}

		modal.close();
	}

	$effect(() => {
		if (modal.isOpen) {
			hasOpened = true;
			return;
		}

		if (!hasOpened) {
			return;
		}

		const timeout = setTimeout(() => onClosed?.(), MODAL_OVERLAY_DURATION_MS);

		return () => clearTimeout(timeout);
	});
</script>

<Dialog.Root open={modal.isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay
			class={cn(
				'fixed inset-0 z-50 bg-black/45 backdrop-blur-md duration-[120ms]',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
				'data-[state=open]:animate-in data-[state=open]:fade-in-0'
			)}
		/>
		<Dialog.Content
			trapFocus={false}
			onInteractOutside={ignoreFloatingLayerDismiss}
			onFocusOutside={ignoreFloatingLayerDismiss}
			class={cn(
				'fixed inset-y-0 right-0 z-51 flex h-full flex-col overflow-hidden border-l border-dark-600 bg-dark-800 shadow-2xl outline-none duration-[120ms]',
				'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
				'data-[state=open]:animate-in data-[state=open]:slide-in-from-right'
			)}
			style="width: {targetWidth}"
		>
			<div class="flex h-full min-h-0 flex-col" style:width={targetWidth}>
				<div class="shrink-0 border-b border-dark-600 px-8 pt-8 pb-6">
					<div class="flex items-start gap-3">
						<Dialog.Close
							aria-label={t('Close')}
							class="mt-1 shrink-0 cursor-pointer rounded-md p-1 text-dark-200 transition-colors hover:bg-dark-700 hover:text-foreground"
						>
							<Icon icon="ri:close-line" class="h-5 w-5" aria-hidden="true" />
						</Dialog.Close>
						<div class="min-w-0 flex-1">
							{#if modal.header}
								<Dialog.Title class="sr-only">{modal.title}</Dialog.Title>
								{#if modal.contentHost === 'plugin'}
									<PluginComponentHost component={modal.header} props={modal.props} />
								{:else}
									<modal.header {...modal.props} />
								{/if}
							{:else}
								<Dialog.Title class="text-2xl font-bold">{modal.title}</Dialog.Title>
								{#if modal.description}
									<Dialog.Description class="mt-1 text-dark-200">
										{modal.description}
									</Dialog.Description>
								{/if}
							{/if}
						</div>
					</div>
				</div>

				{#if modal.scrollBody !== false}
					<ScrollArea orientation="vertical" class="min-h-0 flex-1" viewportClasses="h-full w-full">
						<div class="px-8 pt-6 pb-8">
							{#if modal.contentHost === 'plugin'}
								<PluginComponentHost component={modal.content} props={modal.props} />
							{:else}
								<modal.content {...modal.props} />
							{/if}
						</div>
					</ScrollArea>
				{:else}
					<div class="flex min-h-0 flex-1 flex-col overflow-hidden px-8 pt-6 pb-8">
						{#if modal.contentHost === 'plugin'}
							<PluginComponentHost component={modal.content} props={modal.props} />
						{:else}
							<modal.content {...modal.props} />
						{/if}
					</div>
				{/if}

				{#if modal.footer}
					<div class="shrink-0 border-t border-dark-600 bg-dark-800 px-8 py-4">
						{#if modal.contentHost === 'plugin'}
							<PluginComponentHost component={modal.footer} props={modal.props} />
						{:else}
							<modal.footer {...modal.props} />
						{/if}
					</div>
				{/if}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
