<script lang="ts">
	import type { QueuedActionEntry } from '$lib/core/action-queue/action-queues.svelte';

	import Icon from '@iconify/svelte';

	import { getApp } from '$lib/core/registry';
	import { cn } from '$lib/utils';

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
	<h3 class="text-xs font-semibold tracking-wide text-dark-400 uppercase">
		{title}
		<span class="font-normal text-dark-500">({entries.length})</span>
	</h3>

	{#if entries.length === 0}
		<p class="text-sm text-dark-400">{emptyLabel}</p>
	{:else}
		<ul class="grid gap-1.5">
			{#each entries as entry, index (entry.jobId)}
				<li>
					{#if entry.actionId != null}
						<button
							type="button"
							class={cn(
								'flex w-full min-w-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors',
								variant === 'active'
									? 'border-success-700/60 bg-success-950/40 text-success-50 hover:border-success-600'
									: 'border-dark-700 bg-dark-900 text-dark-100 hover:border-dark-500 hover:bg-dark-800'
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
									class="grid size-5 shrink-0 place-items-center rounded-md bg-dark-800 text-xs font-medium text-dark-300"
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
								'flex w-full min-w-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm',
								variant === 'active'
									? 'border-success-700/60 bg-success-950/40 text-success-50'
									: 'border-dark-700 bg-dark-900 text-dark-100'
							)}
						>
							{#if variant === 'active'}
								<span
									class="size-2 shrink-0 animate-pulse rounded-full bg-success-400"
									aria-hidden="true"
								></span>
							{:else}
								<span
									class="grid size-5 shrink-0 place-items-center rounded-md bg-dark-800 text-xs font-medium text-dark-300"
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
