<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { SelectableListController } from '$lib/components/core/list/selectable-list.svelte';
	import type { Snippet } from 'svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
	import Icon from '@iconify/svelte';
	import { capitalize } from 'es-toolkit';

	import { Badge } from '@stream-kit/ui/badge';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { cn } from '$lib/utils';

	import { resolveTranslate } from './resolve-translate';

	type Props = {
		t?: TranslateFn;
		groupId: string;
		index: number;
		children: Snippet;
		label?: string;
		headerActions?: Snippet;
		count?: number;
		groupActionIds?: (string | number)[];
		selection?: SelectableListController<string | number>;
		isOverlay?: boolean;
		collapsed?: boolean;
		onCollapsedChange?: (collapsed: boolean) => void;
	};

	let {
		t: tProp,
		groupId,
		index,
		children,
		label,
		headerActions,
		count,
		groupActionIds = [],
		selection,
		isOverlay = false,
		collapsed = false,
		onCollapsedChange
	}: Props = $props();

	const collapsible = $derived(!isOverlay && onCollapsedChange != null);
	const t = $derived(resolveTranslate(tProp));

	const displayName = $derived(label ?? capitalize(groupId));
	const showGroupSelect = $derived(!isOverlay && selection != null && groupActionIds.length > 0);
	const groupAllSelected = $derived(
		showGroupSelect ? selection!.subsetAllSelected(groupActionIds) : false
	);

	const { ref, handleRef, isDragging } = useSortable({
		id: () => groupId,
		index: () => index,
		type: 'group',
		accept: ['action', 'group'],
		collisionPriority: 1,
		feedback: 'move'
	});
</script>

<section
	{@attach ref}
	class={cn(
		'overflow-hidden rounded-none',
		isOverlay
			? 'border border-rule bg-dark-800 shadow-2xl ring-1 ring-white/10'
			: 'border border-rule bg-dark-800'
	)}
>
	<div
		class={cn(
			'group/head flex items-stretch border-rule',
			(!collapsed || isOverlay) && 'border-b'
		)}
	>
		<button
			type="button"
			class="ms-1 flex w-7 shrink-0 cursor-grab items-center justify-center self-center rounded-lg text-dark-500 opacity-0 transition group-hover/head:opacity-100 hover:bg-dark-700 hover:text-dark-200 focus-visible:opacity-100 active:cursor-grabbing"
			{@attach handleRef}
			aria-label={t('Drag to reorder group {name}', { name: displayName })}
			onclick={(event) => event.stopPropagation()}
		>
			<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
		</button>

		{#if collapsible}
			<button
				type="button"
				class="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-3 text-left transition-colors hover:bg-dark-700/40"
				aria-expanded={!collapsed}
				aria-label={collapsed
					? t('Expand group {name}', { name: displayName })
					: t('Collapse group {name}', { name: displayName })}
				onclick={() => onCollapsedChange?.(!collapsed)}
			>
				<Icon
					icon="ri:arrow-down-s-line"
					class={cn(
						'size-4 shrink-0 text-dark-400 transition-transform duration-200',
						collapsed && '-rotate-90'
					)}
					aria-hidden="true"
				/>
				{#if showGroupSelect}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<span class="shrink-0" onclick={(event) => event.stopPropagation()}>
						<InputCheckbox
							inline
							aria-label={t('Select all in group {name}', { name: displayName })}
							bind:checked={
								() => groupAllSelected,
								(value) => selection!.selectSubset(groupActionIds, value)
							}
						/>
					</span>
				{/if}
				<span class="truncate text-sm font-semibold text-dark-50">{displayName}</span>
				{#if count != null}
					<Badge variant="outline" size="sm">{count}</Badge>
				{/if}
			</button>
		{:else}
			<div class="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-3">
				{#if showGroupSelect}
					<InputCheckbox
						inline
						aria-label={t('Select all in group {name}', { name: displayName })}
						bind:checked={
							() => groupAllSelected,
							(value) => selection!.selectSubset(groupActionIds, value)
						}
					/>
				{/if}
				<span class="truncate text-sm font-semibold text-dark-50">{displayName}</span>
				{#if count != null}
					<Badge variant="outline" size="sm">{count}</Badge>
				{/if}
			</div>
		{/if}

		{#if headerActions && !isOverlay}
			<div class="flex shrink-0 items-center gap-2 px-3">
				{@render headerActions()}
			</div>
		{/if}
	</div>

	{#if !collapsed || isOverlay}
		<div>
			<div
				class={cn(
					'flex flex-col gap-1',
					isDragging.current && !isOverlay && 'pointer-events-none select-none'
				)}
			>
				{@render children()}
			</div>
		</div>
	{/if}
</section>
