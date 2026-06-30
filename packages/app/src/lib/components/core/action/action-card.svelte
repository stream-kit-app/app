<script lang="ts">
	import type { Action as ActionType } from '$lib/core/action/action.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip, tooltipSnippet } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { Action } from '$lib/core/action/action.svelte';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Definition = { id: string; name: string; isAvailable: boolean };

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

	const isRunning = $derived(action.execution.state.isRunning);
	const isUnavailable = $derived(action.hasUnavailableDefinitions);
	const triggersUnavailable = $derived(
		action.triggers.some((trigger) => !trigger.definition.isAvailable)
	);
	const handlersUnavailable = $derived(
		action.handlers.some((handler) => !handler.definition.isAvailable)
	);
	const queueName = $derived(
		action.queueId != null
			? (getApp().actionQueues.getDefinition(action.queueId)?.name ?? null)
			: null
	);

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
			{#each definitions as { id, name, isAvailable } (id)}
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
			'group/card relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 transition-colors',
			{
				'border-dark-700 bg-dark-800 hover:border-dark-500 hover:bg-dark-700':
					!isUnavailable && !isRunning,
				'border-destructive-700 bg-destructive-950 hover:border-destructive-600':
					isUnavailable,
				'border-success-700 bg-success-950': isRunning && !isUnavailable,
				'opacity-60': !action.enabled,
				'pointer-events-none opacity-0 select-none': isDragging
			}
		)}
		aria-hidden={isDragging}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class={cn(
				'shrink-0 transition-opacity',
				!selected && 'opacity-0 group-hover/card:opacity-100 focus-within:opacity-100'
			)}
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

		<div
			class={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', {
				'bg-destructive-900 text-destructive-200': isUnavailable,
				'bg-success-900 text-success-200': isRunning && !isUnavailable,
				'bg-dark-700 text-dark-400': !action.enabled && !isUnavailable && !isRunning,
				'bg-dark-700 text-primary': action.enabled && !isUnavailable && !isRunning
			})}
			aria-hidden="true"
		>
			<Icon icon="ri:flashlight-line" class="size-5" />
		</div>

		<button
			type="button"
			class="flex min-w-0 flex-1 flex-col gap-1 text-left"
			onclick={() => action.open()}
		>
			<span class="flex items-center gap-1.5">
				<span
					class={cn(
						'truncate font-medium',
						!action.enabled ? 'text-dark-300' : 'text-dark-50'
					)}
				>
					{action.name.trim() || t('Untitled action')}
				</span>
				{#if isRunning}
					<span
						class="size-1.5 shrink-0 animate-pulse rounded-full bg-success-400"
						aria-hidden="true"
					></span>
				{/if}
			</span>
			<span class="flex items-center gap-1.5">
				<Badge
					size="sm"
					variant={triggersUnavailable ? 'destructive' : 'ghost'}
					{@attach tooltip(() =>
						tooltipSnippet(definitionList, {
							title: t('Triggers'),
							definitions: action.triggers.map((trigger) => ({
								id: trigger.id,
								name: trigger.definition.name,
								isAvailable: trigger.definition.isAvailable
							}))
						})
					)}
				>
					<Icon icon="ri:flashlight-line" />
					{t('triggers ({count})', { count: action.triggers.length })}
				</Badge>
				<Badge
					size="sm"
					variant={handlersUnavailable ? 'destructive' : 'ghost'}
					{@attach tooltip(() =>
						tooltipSnippet(definitionList, {
							title: t('Handlers'),
							definitions: action.handlers.map((handler) => ({
								id: handler.id,
								name: handler.definition.name,
								isAvailable: handler.definition.isAvailable
							}))
						})
					)}
				>
					<Icon icon="ri:list-check" />
					{t('handlers ({count})', { count: action.handlers.length })}
				</Badge>
				{#if queueName}
					<Badge
						size="sm"
						variant="secondary"
						{@attach tooltip(() => t('Runs in queue "{name}"', { name: queueName }))}
					>
						<Icon icon="ri:list-ordered" />
						{queueName}
					</Badge>
				{/if}
			</span>
		</button>

		<div class="flex shrink-0 items-center gap-1">
			{#if action.id != null}
				<Button
					variant="outline"
					size="icon"
					icon="clarity:clone-line"
					class="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
					aria-label={t('Clone action')}
					onclick={handleClone}
					{@attach tooltip(() => t('Clone action'))}
				/>
			{/if}
			<Icon
				icon="ri:arrow-right-s-line"
				class="size-5 shrink-0 text-dark-500 transition-[color,transform] group-hover/card:translate-x-0.5 group-hover/card:text-dark-300"
				aria-hidden="true"
			/>
		</div>
	</div>

	{#if isDragging}
		<div
			class="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-primary-300 bg-primary-950 px-4 text-sm font-medium text-primary-200"
			aria-hidden="true"
		>
			{t('Moving: {name}', { name: movingLabel || action.name.trim() || t('this action') })}
		</div>
	{/if}
</div>
