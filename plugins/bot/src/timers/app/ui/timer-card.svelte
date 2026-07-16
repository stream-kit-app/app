<script lang="ts">
	import Icon from '@iconify/svelte';

	import { tooltip, tooltipSnippet } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { cn } from '@stream-kit/plugin/utils';

	import { Timer } from '../lib/timer.svelte';
	import { getTimersService } from '../lib/get-timers';

	type Definition = { id: string; name: string; isAvailable: boolean };

	type Props = {
		timer: Timer;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
	};

	let { timer, selected = false, onSelectedChange }: Props = $props();
	const t = getTimersService().requireApp().i18n.t;
	let shiftKey = false;

	const isUnavailable = $derived(timer.hasUnavailableDefinitions);
	const handlersUnavailable = $derived(
		timer.handlers.some((handler) => !handler.definition.isAvailable)
	);
	const intervalLabel = $derived(`${timer.intervalMinSec}s – ${timer.intervalMaxSec}s`);

	function handleClone(event: MouseEvent): void {
		event.stopPropagation();
		Timer.createFrom(timer).open();
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

<div
	class={cn('group/card flex min-w-0 flex-1 items-center gap-3 transition-colors', {
		'bg-destructive-950/40': isUnavailable,
		'opacity-60': !timer.enabled
	})}
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
			aria-label={t('Select {name}', {
				name: timer.name.trim() || t('this timer')
			})}
			bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
		/>
	</div>

	<div
		class={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', {
			'bg-destructive-900 text-destructive-200': isUnavailable,
			'bg-dark-700 text-dark-400': !timer.enabled && !isUnavailable,
			'bg-dark-700 text-primary': timer.enabled && !isUnavailable
		})}
		aria-hidden="true"
	>
		<Icon icon="ri:timer-line" class="size-5" />
	</div>

	<button
		type="button"
		class="flex min-w-0 flex-1 cursor-pointer flex-col gap-1 text-left"
		onclick={() => timer.open()}
	>
		<span
			class={cn(
				'truncate text-base font-semibold',
				!timer.enabled ? 'text-dark-300' : 'text-dark-50'
			)}
		>
			{timer.name.trim() || t('Untitled timer')}
		</span>
		<span class="flex flex-wrap items-center gap-1.5">
			<Badge size="sm" variant="secondary">
				<Icon icon="ri:timer-line" />
				{t('every {interval}', { interval: intervalLabel })}
			</Badge>
			<Badge
				size="sm"
				variant={handlersUnavailable ? 'destructive' : 'ghost'}
				{@attach tooltip(() =>
					tooltipSnippet(definitionList, {
						title: t('Handlers'),
						definitions: timer.handlers.map((handler) => ({
							id: handler.id,
							name: handler.definition.name,
							isAvailable: handler.definition.isAvailable
						}))
					})
				)}
			>
				<Icon icon="ri:list-check" />
				{t('handlers ({count})', { count: timer.handlers.length })}
			</Badge>
			{#each timer.platforms as platform (platform)}
				<Badge size="sm" variant="secondary">{platform}</Badge>
			{/each}
		</span>
	</button>

	<div class="flex shrink-0 items-center gap-1">
		{#if timer.id != null}
			<Button
				variant="outline"
				size="icon"
				icon="clarity:clone-line"
				class="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
				aria-label={t('Clone timer')}
				onclick={handleClone}
				{@attach tooltip(() => t('Clone timer'))}
			/>
		{/if}
		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 text-dark-500 transition-[color,transform] group-hover/card:translate-x-0.5 group-hover/card:text-dark-300"
			aria-hidden="true"
		/>
	</div>
</div>
