<script lang="ts">
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { Badge } from '@stream-kit/ui/badge';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { capitalize } from 'es-toolkit';

	type Props = {
		groupId: string;
		index: number;
		children: Snippet;
		count?: number;
		isOverlay?: boolean;
		collapsed?: boolean;
		onCollapsedChange?: (collapsed: boolean) => void;
	};

	let {
		groupId,
		index,
		children,
		count,
		isOverlay = false,
		collapsed = false,
		onCollapsedChange
	}: Props = $props();

	const collapsible = $derived(!isOverlay && onCollapsedChange != null);
	const { t } = useI18n();

	const displayName = $derived(capitalize(groupId));

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
	class={isOverlay
		? 'overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10'
		: 'overflow-hidden rounded-2xl border border-dark-700 bg-dark-900'}
>
	<div class="flex items-stretch border-b border-dark-700 bg-dark-800">
		<button
			type="button"
			class="flex size-8 shrink-0 cursor-grab items-center justify-center self-center rounded-lg text-dark-400 transition-colors hover:bg-dark-700 hover:text-dark-200 active:cursor-grabbing ms-3"
			{@attach handleRef}
			aria-label={t('Drag to reorder group {name}', { name: displayName })}
		>
			<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
		</button>

		{#if collapsible}
			<button
				type="button"
				class="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-dark-700"
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
				<span class="text-sm font-semibold tracking-wide text-dark-100 uppercase">{displayName}</span>
				{#if count != null}
					<Badge variant="outline" size="sm">{count}</Badge>
				{/if}
			</button>
		{:else}
			<div class="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5">
				<span class="text-sm font-semibold tracking-wide text-dark-100 uppercase">{displayName}</span>
				{#if count != null}
					<Badge variant="outline" size="sm">{count}</Badge>
				{/if}
			</div>
		{/if}
	</div>

	{#if !collapsed || isOverlay}
		<div class="p-3">
			<div class={cn(isDragging.current && !isOverlay && 'pointer-events-none select-none')}>
				{@render children()}
			</div>
		</div>
	{/if}
</section>
