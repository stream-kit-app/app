<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import Icon from '@iconify/svelte';

	import { findHandler, flattenActionHandlers } from '$lib/core/action/handler-tree';
	import { getApp } from '$lib/core/registry';
	import { cn } from '$lib/utils';

	let { app }: PluginWidgetProps = $props();

	const t = $derived(app.i18n.t);

	const runningActions = $derived(
		getApp().actions.items.filter((action) => action.execution.state.isRunning)
	);

	function getActionName(action: Action): string {
		return action.name.trim() || t('Untitled action');
	}

	function getStepLabel(action: Action): string {
		const state = action.execution.state;
		const total = flattenActionHandlers(action.handlers).length;
		const completed = state.completedHandlerIds.length;

		if (state.phase === 'trigger') {
			const trigger = action.triggers.find((item) => item.id === state.activeTriggerId);

			return trigger
				? t('Trigger: {name}', { name: trigger.definition.name })
				: t('Running trigger');
		}

		const handler = findHandler(action.handlers, state.activeHandlerId ?? '');

		if (handler) {
			return t('Handler: {name} ({completed}/{total})', {
				name: handler.definition.name,
				completed,
				total
			});
		}

		return t('{completed} of {total} handlers', { completed, total });
	}
</script>

<div class="grid min-w-0 gap-3">
	{#if runningActions.length === 0}
		<p class="text-sm text-dark-400">{t('No actions running')}</p>
	{:else}
		<ul class="grid gap-1.5">
			{#each runningActions as action (action.id)}
				<li>
					<button
						type="button"
						class={cn(
							'flex w-full min-w-0 flex-col gap-1 rounded-lg border border-success-700/60 bg-success-950/40 px-3 py-2 text-left text-sm transition-colors hover:border-success-600'
						)}
						onclick={() => action.open()}
					>
						<span class="flex min-w-0 items-center gap-2 text-success-50">
							<span
								class="size-2 shrink-0 animate-pulse rounded-full bg-success-400"
								aria-hidden="true"
							></span>
							<span class="truncate font-medium">{getActionName(action)}</span>
							<Icon
								icon="ri:arrow-right-s-line"
								class="ms-auto size-4 shrink-0 text-success-300/70"
								aria-hidden="true"
							/>
						</span>
						<span class="truncate ps-4 text-xs text-success-200/80">
							{getStepLabel(action)}
						</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<a href="/actions" class="text-xs text-dark-300 transition hover:text-dark-100">
		{t('View all actions')}
	</a>
</div>
