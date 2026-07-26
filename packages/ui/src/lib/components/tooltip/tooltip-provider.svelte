<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Tooltip } from 'bits-ui';

	import type { TooltipPayload } from '../../attachments/tooltip-content';
	import { tether } from '../../tooltip';
	import { cn } from '../../utils';

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();
</script>

<Tooltip.Provider disableHoverableContent>
	{@render children?.()}

	<Tooltip.Root {tether}>
		{#snippet children({ payload }: { payload: TooltipPayload | null })}
			<Tooltip.Portal>
				<Tooltip.Content
					side="top"
					sideOffset={4}
					class={cn(
						'z-110 max-w-xs rounded-lg border border-dark-600 bg-dark-800 px-3 py-2 text-sm text-dark-200 shadow-md',
						'animate-in fade-in-0 zoom-in-95',
						'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
					)}
				>
					{#if payload?.kind === 'snippet'}
						{#if payload.mode === 'none'}
							{@render payload.snippet()}
						{:else}
							{@render payload.snippet(payload.arg)}
						{/if}
					{:else if payload}
						{@html payload.content}
					{/if}
				</Tooltip.Content>
			</Tooltip.Portal>
		{/snippet}
	</Tooltip.Root>
</Tooltip.Provider>
