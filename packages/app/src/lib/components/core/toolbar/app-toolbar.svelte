<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import type { ButtonVariant } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import type { ToolbarAction } from '$lib/core/toolbar';
	import { cn } from '$lib/utils';

	const toolbar = $derived(app.toolbar);

	const hasPrimarySection = $derived(
		toolbar.primaryActions.length > 0 || toolbar.primaryComponents.length > 0
	);

	const hasBulkSection = $derived(toolbar.selectAll != null || toolbar.actions.length > 0);

	function getActionButtonProps(action: ToolbarAction): {
		variant: ButtonVariant;
		class?: string;
	} {
		if (action.variant === 'destructive') {
			return {
				variant: 'link',
				class: cn(
					'h-8 px-2 text-sm font-normal text-destructive-100 hover:text-destructive-100 hover:no-underline'
				)
			};
		}

		return {
			variant: 'link',
			class: cn(
				'h-8 px-2 text-sm font-normal text-dark-200 hover:text-foreground hover:no-underline'
			)
		};
	}
</script>

{#if toolbar.hasToolbarRow}
	<div class="shrink-0 border-b border-rule bg-background px-6 py-3">
		<div class="flex flex-wrap items-center justify-between gap-4">
			{#if hasBulkSection}
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
						<div class="flex flex-wrap items-center gap-1">
							{#each toolbar.actions as action (action.id)}
								{@const buttonProps = getActionButtonProps(action)}
								<Button
									size={action.size ?? 'sm'}
									variant={buttonProps.variant}
									class={buttonProps.class}
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
			{/if}
			{#if hasPrimarySection}
				<div
					class={cn(
						'ml-auto flex flex-wrap items-center gap-2',
						hasBulkSection && 'border-l border-rule pl-4'
					)}
				>
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
	<div class="shrink-0 border-b border-rule bg-background px-6 py-3">
		<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-dark-300">
			{#each toolbar.meta as item (item.label)}
				<span
					class="inline-flex items-center gap-1.5 border border-rule px-2.5 py-1 font-mono text-[11px] tracking-wide uppercase"
				>
					{#if item.icon}
						<Icon icon={item.icon} class="size-3.5 text-dark-400" aria-hidden="true" />
					{/if}
					{item.label}
				</span>
			{/each}
		</div>
	</div>
{/if}
