<script lang="ts">
	import type { Modal } from '$lib/core/modal';

	import Icon from '@iconify/svelte';
	import { Dialog } from 'bits-ui';

	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import PluginComponentHost from '$lib/components/core/plugins/plugin-component-host.svelte';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		modal: Modal;
		onClosed?: () => void;
	};

	const { modal, onClosed }: Props = $props();
	const { t } = useI18n();

	// Matches the panel exit animation so the modal stays mounted while it
	// animates out before it is removed from the registry.
	const EXIT_ANIMATION_MS = 250;

	const SIZE_WIDTH: Record<NonNullable<Modal['size']>, string> = {
		xs: '22rem',
		sm: '28rem',
		md: '42rem',
		lg: '48rem',
		full: '50%'
	};

	const targetWidth = $derived(SIZE_WIDTH[modal.size]);

	let hasOpened = false;
	let isExpanded = $state(false);

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
			// Double rAF ensures the browser paints width:0 before transitioning open.
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					isExpanded = true;
				});
			});
			return;
		}

		isExpanded = false;

		if (!hasOpened) {
			return;
		}

		const timeout = setTimeout(() => onClosed?.(), EXIT_ANIMATION_MS);

		return () => clearTimeout(timeout);
	});
</script>

<Dialog.Root open={modal.isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content
		class={cn(
			'flex h-full shrink-0 flex-col overflow-hidden border-l border-dark-600 bg-dark-800 outline-none',
			'transition-[width] duration-250 ease-out',
			'relative! inset-auto! top-auto! left-auto! z-auto! max-w-none! translate-x-0! translate-y-0!'
		)}
		style="width: {isExpanded ? targetWidth : '0'}"
	>
		<div class="flex h-full min-h-0 flex-col" style="width: {targetWidth}">
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

			<ScrollArea orientation="vertical" class="min-h-0 flex-1" viewportClasses="h-full w-full">
				<div class="px-8 pt-6 pb-8">
					{#if modal.contentHost === 'plugin'}
						<PluginComponentHost component={modal.content} props={modal.props} />
					{:else}
						<modal.content {...modal.props} />
					{/if}
				</div>
			</ScrollArea>

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
</Dialog.Root>
