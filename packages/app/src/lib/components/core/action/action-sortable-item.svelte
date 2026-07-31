<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
	import Icon from '@iconify/svelte';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import ActionCard from './action-card.svelte';

	type Props = {
		action: Action;
		index: number;
		groupId: string;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
		isOverlay?: boolean;
	};

	let {
		action,
		index,
		groupId,
		selected = false,
		onSelectedChange,
		isOverlay = false
	}: Props = $props();
	const { t } = useI18n();

	const displayName = $derived(action.name.trim() || t('this action'));

	const { ref, handleRef, isDragging } = useSortable({
		id: () => action.id!,
		index: () => index,
		type: 'action',
		accept: 'action',
		group: () => groupId,
		data: () => ({ group: groupId }),
		feedback: 'move'
	});
</script>

<div {@attach ref} class="relative min-w-0 p-2">
	<div
		class={cn(
			'group/row flex min-w-0 items-center gap-1 rounded-none px-2 py-1.5 transition-colors',
			isOverlay
				? 'border border-rule bg-dark-800 shadow-2xl'
				: 'hover:bg-dark-700/40',
			isDragging.current && !isOverlay && 'pointer-events-none opacity-0 select-none'
		)}
		aria-hidden={isDragging.current && !isOverlay}
	>
		{#if isOverlay}
			<div
				class="flex size-7 shrink-0 items-center justify-center rounded-lg text-dark-400"
				aria-hidden="true"
			>
				<Icon icon="ri:draggable" class="size-4" />
			</div>
		{:else}
			<button
				type="button"
				class="flex size-7 shrink-0 cursor-grab items-center justify-center rounded-lg text-dark-400 opacity-0 transition group-hover/row:opacity-100 hover:bg-dark-700 hover:text-dark-200 focus-visible:opacity-100 active:cursor-grabbing"
				{@attach handleRef}
				aria-label={t('Drag to reorder {name}', { name: displayName })}
				onclick={(event) => event.stopPropagation()}
			>
				<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
			</button>
		{/if}

		<ActionCard {action} {selected} {onSelectedChange} {isOverlay} />
	</div>

	{#if isDragging.current && !isOverlay}
		<div
			class="absolute inset-0 flex items-center justify-center rounded-none border border-dashed border-rule bg-dark-900/80 px-4 text-sm font-medium text-dark-200"
			aria-hidden="true"
		>
			{t('Moving: {name}', { name: displayName })}
		</div>
	{/if}
</div>
