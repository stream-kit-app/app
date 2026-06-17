<script lang="ts">
	import type { Action as ActionType } from '$lib/core/action/action.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip, tooltipSnippet } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { Action } from '$lib/core/action/action.svelte';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Definition = { name: string; isAvailable: boolean };

	type Props = {
		action: ActionType;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
		isDragging?: boolean;
		movingLabel?: string;
	};

	let {
		action,
		selected = false,
		onSelectedChange,
		isDragging = false,
		movingLabel = ''
	}: Props = $props();

	let { t } = useI18n();
	let shiftKey = false;

	function handleClone(event: MouseEvent): void {
		event.stopPropagation();
		Action.createFrom(action).open();
	}
</script>

{#snippet definitionList({ title, definitions }: { title: string; definitions: Definition[] })}
	<div class="flex flex-col gap-1.5">
		<span class="text-[10px] font-semibold tracking-wider text-dark-400 uppercase">
			{title} · {definitions.length}
		</span>
		<ul class="flex flex-col gap-1">
			{#each definitions as { name, isAvailable } (name)}
				<li class="flex items-center gap-2">
					<span
						class={cn(
							'size-1.5 shrink-0 rounded-full',
							isAvailable ? 'bg-dark-400' : 'bg-destructive-400'
						)}
					></span>
					<span class={cn(!isAvailable && 'text-destructive-200')}>{name}</span>
					{#if !isAvailable}
						<span
							class="rounded bg-destructive-800 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-destructive-200 uppercase"
						>
							{t('Unavailable')}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

<div class="relative min-w-0">
	<div
		class={cn(
			'grid grid-cols-[auto_1fr_auto_auto_auto] items-center overflow-hidden rounded-xl border transition-colors',
			{
				'border-destructive-500 bg-destructive-800 hover:bg-destructive-600':
					action.hasUnavailableDefinitions,
				'border-dark-600 bg-dark-800 hover:bg-dark-700':
					!action.hasUnavailableDefinitions && action.enabled,
				'opacity-60': !action.enabled,
				'pointer-events-none opacity-0 select-none': isDragging,
				'border-success-500 bg-success-900': action.execution.state.isRunning
			}
		)}
		aria-hidden={isDragging}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="shrink-0 p-3"
			onclick={(event) => event.stopPropagation()}
			onmousedown={(event) => {
				shiftKey = event.shiftKey;
			}}
		>
			<InputCheckbox
				inline
				aria-label={t('Select {name}', { name: action.name.trim() || t('this action') })}
				bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
			/>
		</div>
		<button
			type="button"
			class="group col-span-3 grid cursor-pointer grid-cols-subgrid items-center px-3 py-2 text-left transition-colors"
			onclick={() => action.open()}
		>
			<span class={cn('font-medium', !action.enabled ? 'text-dark-400' : 'text-dark-50')}>{action.name.trim()}</span>
			<Badge
				size="lg"
				variant={action.triggers.some((trigger) => !trigger.definition.isAvailable)
					? 'destructive'
					: 'default'}
				{@attach tooltip(() =>
					tooltipSnippet(definitionList, {
						title: t('Triggers'),
						definitions: action.triggers.map((trigger) => trigger.definition)
					})
				)}
			>
				{t('triggers ({count})', { count: action.triggers.length })}
			</Badge>
			<Badge
				size="lg"
				variant={action.handlers.some((handler) => !handler.definition.isAvailable)
					? 'destructive'
					: 'default'}
				{@attach tooltip(() =>
					tooltipSnippet(definitionList, {
						title: t('Handlers'),
						definitions: action.handlers.map((handler) => handler.definition)
					})
				)}
			>
				{t('handlers ({count})', { count: action.handlers.length })}
			</Badge>
		</button>
		<div class="flex shrink-0 items-center gap-1 pe-2">
			{#if action.id != null}
				<Button
					variant="ghost"
					size="icon"
					icon="clarity:clone-line"
					aria-label={t('Clone action')}
					onclick={handleClone}
					{@attach tooltip(() => t('Clone action'))}
				/>
			{/if}
			<Icon
				icon="ri:arrow-right-s-line"
				class="size-5 shrink-0 text-dark-400"
				aria-hidden="true"
			/>
		</div>
	</div>

	{#if isDragging}
		<div
			class="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-primary-300/70 bg-primary-950/50 px-4 text-sm font-medium text-primary-200"
			aria-hidden="true"
		>
			{t('Moving: {name}', { name: movingLabel || action.name.trim() || t('this action') })}
		</div>
	{/if}
</div>
