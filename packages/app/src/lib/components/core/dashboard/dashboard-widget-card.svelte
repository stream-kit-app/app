<script lang="ts">
	import type {
		DashboardWidgetDefinition,
		DashboardWidgetInstance
	} from '$lib/core/dashboard/types';

	import Icon from '@iconify/svelte';

	import { Alert } from '@stream-kit/ui/alert';
	import { masonryItem, tooltip } from '@stream-kit/ui/attachments';
	import { panelVariants } from '@stream-kit/ui/blueprint';

	import { isWideWidget, toWidgetColumns } from '$lib/core/dashboard/dashboard-layout';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import DashboardWidgetHost from './dashboard-widget-host.svelte';
	import DashboardWidgetMenu from './dashboard-widget-menu.svelte';

	type Props = {
		instance: DashboardWidgetInstance;
		definition?: DashboardWidgetDefinition;
		unavailable?: boolean;
		isOverlay?: boolean;
		/** Drop-target placeholder left behind while this card is being dragged. */
		isPlaceholder?: boolean;
		class?: string;
		rootRef?: (element: HTMLElement) => void;
		handleRef?: (element: HTMLElement) => void;
		onRemove?: () => void;
		onColumnsChange?: (columns: 1 | 2) => void;
	};

	let {
		instance,
		definition,
		unavailable = false,
		isOverlay = false,
		isPlaceholder = false,
		class: className,
		rootRef,
		handleRef,
		onRemove,
		onColumnsChange
	}: Props = $props();

	const { t } = useI18n();

	const masonry = masonryItem();

	let menuOpen = $state(false);

	const displayTitle = $derived(definition ? t(definition.title) : t('Widget'));
	const displayDescription = $derived(
		definition?.description ? t(definition.description) : undefined
	);
	const wide = $derived(isWideWidget(instance.columns));

	const shellClass = $derived(
		cn(
			panelVariants({ tone: 'solid' }),
			'group/card @container/widget flex min-w-0 flex-col transition-colors',
			!isOverlay && wide && '@2xl/dashboard:col-span-2',
			isOverlay && 'shadow-2xl ring-1 ring-primary/40',
			isPlaceholder && 'border-dashed border-rule-strong bg-dark-900/60 [&>*]:invisible',
			className
		)
	);
</script>

<article class={shellClass} {@attach rootRef} {@attach isOverlay ? undefined : masonry}>
	<header class="flex items-center gap-2.5 px-4 pt-3.5 pb-2">
		<span
			class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
			aria-hidden="true"
		>
			<Icon icon={definition?.icon ?? 'ri:layout-grid-line'} class="size-4" />
		</span>

		<h2
			class="min-w-0 flex-1 truncate text-sm font-semibold text-dark-50"
			{@attach displayDescription ? tooltip(displayDescription) : undefined}
		>
			{displayTitle}
		</h2>

		{#if isOverlay}
			<span class="flex size-7 shrink-0 items-center justify-center text-dark-200">
				<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
			</span>
		{:else}
			<div
				class={cn(
					'-me-1.5 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover/card:opacity-100 focus-within:opacity-100',
					menuOpen && 'opacity-100'
				)}
			>
				<button
					type="button"
					class="flex size-7 cursor-grab items-center justify-center rounded-lg text-dark-400 transition-colors hover:bg-dark-700 hover:text-dark-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:cursor-grabbing"
					{@attach handleRef}
					aria-label={t('Drag to reorder {name}', { name: displayTitle })}
					onclick={(event) => event.stopPropagation()}
				>
					<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
				</button>
				<DashboardWidgetMenu
					{wide}
					onOpenChange={(open) => (menuOpen = open)}
					onWideChange={(next) => onColumnsChange?.(toWidgetColumns(next))}
					onRemove={() => onRemove?.()}
				/>
			</div>
		{/if}
	</header>

	<div class="flex min-w-0 flex-1 flex-col px-4 pt-1 pb-4">
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
