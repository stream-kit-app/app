<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';
	import type { PluginWidgetProps } from '$lib/core/plugins/types';

	import Icon from '@iconify/svelte';

	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { WidgetFooterLink, WidgetList, WidgetRow } from '@stream-kit/ui/widget';

	import { findHandler, flattenActionHandlers } from '$lib/core/action/handler-tree';
	import { getApp } from '$lib/core/registry';

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

<div class="flex min-w-0 flex-1 flex-col gap-3">
	{#if runningActions.length === 0}
		<EmptyState compact icon="ri:play-circle-line" title={t('No actions running')} />
	{:else}
		<WidgetList>
			{#each runningActions as action (action.id)}
				<WidgetRow
					title={getActionName(action)}
					description={getStepLabel(action)}
					class="bg-success-900/40 ring-1 ring-success-600/50 ring-inset hover:bg-success-900/70"
					onclick={() => action.open()}
				>
					{#snippet leading()}
						<span
							class="flex size-7 shrink-0 items-center justify-center"
							aria-hidden="true"
						>
							<span class="size-2 animate-pulse rounded-full bg-success-200"></span>
						</span>
					{/snippet}
					{#snippet trailing()}
						<Icon
							icon="ri:arrow-right-s-line"
							class="size-4 text-dark-300"
							aria-hidden="true"
						/>
					{/snippet}
				</WidgetRow>
			{/each}
		</WidgetList>
	{/if}

	<WidgetFooterLink href="/actions" class="mt-auto">{t('View all actions')}</WidgetFooterLink>
</div>
