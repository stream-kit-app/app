<script lang="ts">
	import type { QueuedActionEntry } from '#lib/core/action-queue/action-queues.svelte.js';

	import Icon from '@iconify/svelte';

	import { Eyebrow } from '@stream-kit/ui/blueprint';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { getApp } from '#lib/core/registry.js';
	import { cn } from '#lib/utils.js';

	type Props = {
		title: string;
		entries: QueuedActionEntry[];
		variant: 'active' | 'pending';
		emptyLabel: string;
	};

	let { title, entries, variant, emptyLabel }: Props = $props();

	function openAction(actionId: number | null): void {
		if (actionId == null) {
			return;
		}

		const action = getApp().actions.items.find((item) => item.id === actionId);
		action?.open();
	}
</script>

<section class="grid min-w-0 gap-2">
	<Eyebrow>
		{title}
		<span class="ms-1.5 font-normal tracking-normal text-dark-500 normal-case">({entries.length})</span>
	</Eyebrow>

	{#if entries.length === 0}
		<EmptyState compact icon="ri:inbox-line" title={emptyLabel} />
	{:else}
		<ul class="grid gap-1.5">
			{#each entries as entry, index (entry.jobId)}
				<li>
					{#if entry.actionId != null}
						<button
							type="button"
							class={cn(
								'flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors',
								variant === 'active'
									? 'border-success-700/60 bg-success-950/40 text-success-50 hover:bg-success-950/60'
									: 'border-rule bg-dark-900 text-dark-100 hover:bg-dark-700/40'
							)}
							onclick={() => openAction(entry.actionId)}
						>
							{#if variant === 'active'}
								<span
									class="size-2 shrink-0 animate-pulse rounded-full bg-success-400"
									aria-hidden="true"
								></span>
							{:else}
								<span
									class="grid size-5 shrink-0 place-items-center border border-rule text-xs font-medium text-dark-300"
									aria-hidden="true"
								>
									{index + 1}
								</span>
							{/if}
							<span class="truncate">{entry.actionName}</span>
							<Icon
								icon="ri:arrow-right-s-line"
								class="ms-auto size-4 shrink-0 text-dark-500"
								aria-hidden="true"
							/>
						</button>
					{:else}
						<div
							class={cn(
								'flex w-full min-w-0 items-center gap-2 rounded-md border px-3 py-2 text-sm',
								variant === 'active'
									? 'border-success-700/60 bg-success-950/40 text-success-50'
									: 'border-rule bg-dark-900 text-dark-100'
							)}
						>
							{#if variant === 'active'}
								<span
									class="size-2 shrink-0 animate-pulse rounded-full bg-success-400"
									aria-hidden="true"
								></span>
							{:else}
								<span
									class="grid size-5 shrink-0 place-items-center border border-rule text-xs font-medium text-dark-300"
									aria-hidden="true"
								>
									{index + 1}
								</span>
							{/if}
							<span class="truncate">{entry.actionName}</span>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</section>
