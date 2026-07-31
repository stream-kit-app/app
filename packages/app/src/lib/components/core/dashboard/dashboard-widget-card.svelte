<script lang="ts">
	import type {
		DashboardWidgetDefinition,
		DashboardWidgetInstance
	} from '$lib/core/dashboard/types';
	import type { PluginWidgetColumns } from '$lib/core/plugins/types';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { panelVariants } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import DashboardColumnPicker from './dashboard-column-picker.svelte';
	import DashboardWidgetHost from './dashboard-widget-host.svelte';

	type Props = {
		instance: DashboardWidgetInstance;
		definition?: DashboardWidgetDefinition;
		unavailable?: boolean;
		editMode?: boolean;
		isOverlay?: boolean;
		class?: string;
		rootRef?: (element: HTMLElement) => void;
		handleRef?: (element: HTMLElement) => void;
		onRemove?: () => void;
		onColumnsChange?: (columns: PluginWidgetColumns) => void;
	};

	let {
		instance,
		definition,
		unavailable = false,
		editMode = false,
		isOverlay = false,
		class: className,
		rootRef,
		handleRef,
		onRemove,
		onColumnsChange
	}: Props = $props();

	const { t } = useI18n();

	const displayTitle = $derived(definition ? t(definition.title) : t('Widget'));
	const displayDescription = $derived(
		definition?.description ? t(definition.description) : undefined
	);

	const columnSpanClass: Record<PluginWidgetColumns, string> = {
		1: 'col-span-1',
		2: 'col-span-2',
		3: 'col-span-3',
		4: 'col-span-4',
		5: 'col-span-5',
		6: 'col-span-6'
	};

	const shellClass = $derived(
		cn(
			panelVariants({ tone: 'flush' }),
			'group/card @container/widget flex min-w-0 flex-col overflow-hidden',
			columnSpanClass[instance.columns],
			isOverlay && 'bg-background shadow-2xl',
			className
		)
	);
</script>

<article class={shellClass} {@attach rootRef}>
	{#if editMode}
		<div
			class="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-2 gap-y-2 border-b border-rule p-4 pb-3 @min-[24rem]/widget:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
		>
			{#if !isOverlay}
				<button
					type="button"
					class="col-start-1 row-start-1 flex size-8 shrink-0 cursor-grab items-center justify-center text-dark-300 transition hover:bg-dark-700 hover:text-dark-100 active:cursor-grabbing"
					{@attach handleRef}
					aria-label={t('Drag to reorder {name}', { name: displayTitle })}
					onclick={(event) => event.stopPropagation()}
				>
					<Icon icon="ri:drag-move-2-line" class="size-4" aria-hidden="true" />
				</button>
			{:else}
				<div class="col-start-1 row-start-1 size-8 shrink-0" aria-hidden="true"></div>
			{/if}

			<div class="col-start-2 row-start-1 flex min-w-0 items-center gap-2">
				{#if definition?.icon}
					<div
						class="flex size-8 shrink-0 items-center justify-center border border-rule text-primary"
					>
						<Icon icon={definition.icon} class="size-4" />
					</div>
				{/if}
				<span class="truncate text-base font-semibold text-dark-50">{displayTitle}</span>
			</div>

			{#if !isOverlay}
				<DashboardColumnPicker
					class="col-span-3 row-start-2 @min-[24rem]/widget:col-span-1 @min-[24rem]/widget:col-start-3 @min-[24rem]/widget:row-start-1"
					value={instance.columns}
					onValueChange={(columns) => onColumnsChange?.(columns)}
				/>

				<Button
					variant="ghost"
					size="icon-sm"
					icon="ri:delete-bin-line"
					class="col-start-3 row-start-1 shrink-0 text-dark-300 hover:text-destructive-50 @min-[24rem]/widget:col-start-4"
					aria-label={t('Remove widget')}
					onclick={() => onRemove?.()}
				/>
			{/if}
		</div>
	{:else if definition}
		<div class="flex items-start gap-3 p-4 pb-3">
			{#if definition.icon}
				<div
					class="flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
				>
					<Icon icon={definition.icon} class="size-5" />
				</div>
			{/if}
			<div class="min-w-0 flex-1">
				<h2 class="text-base font-semibold text-dark-50">{displayTitle}</h2>
				{#if displayDescription}
					<p class="mt-1 text-sm text-dark-100">{displayDescription}</p>
				{/if}
			</div>
		</div>
	{/if}

	<div class="min-w-0 flex-1 border-t border-rule px-4 py-3">
		{#if definition}
			<DashboardWidgetHost {definition} {unavailable} />
		{:else}
			<Alert
				variant="error"
				title={t('Widget unavailable')}
				description={instance.definitionId}
			/>
		{/if}
	</div>
</article>
