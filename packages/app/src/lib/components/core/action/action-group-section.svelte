<script lang="ts">
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { Heading } from '@stream-kit/ui/heading';

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
	class={isOverlay ? 'flex flex-col gap-2 rounded-xl shadow-2xl ring-1 ring-white/10' : 'flex flex-col gap-2'}
>
	<div class="flex items-center gap-2">
		<button
			type="button"
			class="flex size-8 shrink-0 cursor-grab items-center justify-center rounded-lg text-dark-400 transition-colors hover:bg-dark-700 hover:text-dark-200 active:cursor-grabbing"
			{@attach handleRef}
			aria-label={t('Drag to reorder group {name}', { name: displayName })}
		>
			<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
		</button>

		{#if collapsible}
			<button
				type="button"
				class="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1 py-1 text-left transition-colors hover:bg-dark-800"
				aria-expanded={!collapsed}
				aria-label={collapsed
					? t('Expand group {name}', { name: displayName })
					: t('Collapse group {name}', { name: displayName })}
				onclick={() => onCollapsedChange?.(!collapsed)}
			>
				<Icon
					icon={collapsed ? 'ri:arrow-right-s-line' : 'ri:arrow-down-s-line'}
					class="size-4 shrink-0 text-dark-400"
					aria-hidden="true"
				/>
				<Heading level="4" class="text-dark-300 uppercase">{displayName}</Heading>
				{#if count != null}
					<span class="text-xs font-normal text-dark-500">({count})</span>
				{/if}
			</button>
		{:else}
			<div class="flex min-w-0 flex-1 items-center gap-2 px-1">
				<Heading level="4" class="text-dark-300 uppercase">{displayName}</Heading>
				{#if count != null}
					<span class="text-xs font-normal text-dark-500">({count})</span>
				{/if}
			</div>
		{/if}
	</div>

	{#if !collapsed || isOverlay}
		<div class="relative">
			<div class={cn(isDragging.current && !isOverlay && 'pointer-events-none select-none')}>
				{@render children()}
			</div>
		</div>
	{/if}
</section>
