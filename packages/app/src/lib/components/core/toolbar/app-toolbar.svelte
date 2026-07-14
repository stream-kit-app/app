<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { app } from '$lib/core';

	const toolbar = $derived(app.toolbar);
</script>

{#if toolbar.hasToolbarRow}
	<div class="shrink-0 border-b border-dark-600 bg-background px-6 py-3">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="flex min-w-0 flex-wrap items-center gap-4">
				{#if toolbar.selectAll}
					{@const selectAll = toolbar.selectAll}
					<InputCheckbox
						inline
						label={selectAll.label}
						bind:checked={() => selectAll.checked, (checked) => selectAll.onChange(checked)}
					/>
				{/if}
				{#if toolbar.actions.length > 0}
					<div class="flex flex-wrap items-center gap-2">
						{#each toolbar.actions as action (action.id)}
							<Button
								size={action.size ?? 'sm'}
								variant={action.variant ?? 'ghost'}
								icon={action.icon}
								disabled={action.disabled}
								onclick={() => void action.onClick()}
							>
								{action.label}
							</Button>
						{/each}
					</div>
				{/if}
			</div>
			{#if toolbar.primaryActions.length > 0 || toolbar.primaryComponents.length > 0}
				<div class="ml-auto flex flex-wrap items-center gap-2">
					{#each toolbar.primaryActions as action (action.id)}
						<Button
							icon={action.icon}
							size={action.size ?? 'default'}
							variant={action.variant ?? 'default'}
							disabled={action.disabled}
							onclick={() => void action.onClick()}
						>
							{action.label}
						</Button>
					{/each}
					{#each toolbar.primaryComponents as item (item.id)}
						<item.component {...item.props ?? {}} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if toolbar.meta.length > 0}
	<div class="shrink-0 px-6 py-3">
		<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-dark-200">
			{#each toolbar.meta as item (item.label)}
				<span
					class="inline-flex items-center gap-1.5 rounded-lg border border-dark-700 bg-dark-800 px-2.5 py-1"
				>
					{#if item.icon}
						<Icon icon={item.icon} class="size-3.5 text-primary" aria-hidden="true" />
					{/if}
					{item.label}
				</span>
			{/each}
		</div>
	</div>
{/if}
