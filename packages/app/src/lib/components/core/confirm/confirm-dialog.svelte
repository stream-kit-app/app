<script lang="ts">
	import type { Confirm } from '$lib/core/confirm';

	import { AlertDialog } from 'bits-ui';

	import { Button } from '@stream-kit/ui/button';
	import { cn } from '$lib/utils';

	type Props = {
		confirm: Confirm;
	};

	const { confirm }: Props = $props();

	function handleOpenChange(open: boolean) {
		if (!open) {
			confirm.cancel();
		}
	}
</script>

{#if confirm.options}
	<AlertDialog.Root open={confirm.isOpen} onOpenChange={handleOpenChange}>
		<AlertDialog.Portal>
			<AlertDialog.Overlay
				class={cn(
					'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm duration-75',
					'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'
				)}
			/>
			<AlertDialog.Content
				class={cn(
					'fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
					'rounded-2xl bg-dark-800 p-6 shadow-lg duration-75 outline-none',
					'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
					'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
				)}
			>
				<AlertDialog.Title class="text-lg font-semibold text-dark-50">
					{confirm.options.title}
				</AlertDialog.Title>
				{#if confirm.options.description}
					<AlertDialog.Description class="mt-2 text-sm text-dark-200">
						{confirm.options.description}
					</AlertDialog.Description>
				{/if}
				<div class="mt-6 flex justify-end gap-2">
					<AlertDialog.Cancel>
						{#snippet child({ props })}
							<Button {...props} variant="outline">
								{confirm.options?.cancelLabel}
							</Button>
						{/snippet}
					</AlertDialog.Cancel>
					<AlertDialog.Action onclick={() => confirm.confirm()}>
						{#snippet child({ props })}
							<Button {...props} variant="destructive">
								{confirm.options?.confirmLabel}
							</Button>
						{/snippet}
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
{/if}
