<script lang="ts">
	import type { HandlerFieldVariable } from '../../types';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';
	import { Button } from '../button';
	import { InputText } from '../input';
	import {
		Content as PopoverContent,
		Root as PopoverRoot,
		Trigger as PopoverTrigger
	} from '../popover';
	import { ScrollArea } from '../scroll-area';

	type Props = {
		variables: HandlerFieldVariable[];
		title?: string;
		emptyLabel?: string;
		ariaLabel?: string;
		copiedLabel?: string;
		noResultsLabel?: string;
		icon?: string;
	};

	let {
		variables,
		title = 'Variables',
		emptyLabel = 'No variables available.',
		ariaLabel = 'Show variables',
		copiedLabel = 'Copied',
		noResultsLabel = 'No variables match your search.',
		icon = 'ri:braces-line'
	}: Props = $props();

	let copiedKey = $state<string | null>(null);

	function handleCopy(key: string): void {
		navigator.clipboard.writeText(`{${key}}`).then(() => {
			copiedKey = key;
			setTimeout(() => {
				if (copiedKey === key) {
					copiedKey = null;
				}
			}, 2000);
		});
	}
</script>

<PopoverRoot>
	<PopoverTrigger>
		{#snippet child({ props }: { props: Record<string, unknown> })}
			<Button
				{...props}
				type="button"
				variant="ghost"
				size="icon-sm"
				{icon}
				aria-label={ariaLabel}
				class="size-7 text-dark-400 hover:text-dark-100"
			/>
		{/snippet}
	</PopoverTrigger>
	<PopoverContent align="start" class="w-80 p-4">
		<div class="mb-3 flex flex-col gap-2">
			{#if title}
				<p class="text-xs font-semibold text-dark-200">{title}</p>
			{/if}
		</div>

		{#if variables.length === 0}
			<p class="py-2 text-xs text-dark-400">{emptyLabel}</p>
		{:else}
			<ScrollArea orientation="vertical" viewportClasses="max-h-48 overflow-hidden">
				<ul class="grid gap-1">
					{#each variables as variable (variable.key)}
						<li>
							<button
								type="button"
								class={cn(
									'group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50'
								)}
								title={copiedLabel}
								onclick={() => handleCopy(variable.key)}
							>
								<div class="flex min-w-0 flex-1 items-center gap-2.5">
									<span
										class="shrink-0 rounded border border-primary-500/10 bg-primary-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary-300 transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15"
										>{`{${variable.key}}`}</span
									>
									<span
										class="min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100"
										>{variable.label}</span
									>
								</div>
								<div class="flex size-4 shrink-0 items-center justify-center">
									{#if copiedKey === variable.key}
										<Icon
											icon="ri:check-line"
											class="size-3.5 text-success-400"
										/>
									{:else}
										<Icon
											icon="ri:file-copy-line"
											class="size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
										/>
									{/if}
								</div>
							</button>
						</li>
					{/each}
				</ul>
			</ScrollArea>
		{/if}
	</PopoverContent>
</PopoverRoot>
