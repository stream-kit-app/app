<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';

	import Icon from '@iconify/svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { useI18n } from '$lib/i18n';

	import ActionCard from './action-card.svelte';

	type Props = {
		action: Action;
		index: number;
		groupId: string;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
		isOverlay?: boolean;
	};

	let { action, index, groupId, selected = false, onSelectedChange, isOverlay = false }: Props =
		$props();
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

<div class="flex min-w-0 items-center gap-2">
	{#if !isOverlay}
		<div class="flex w-8 shrink-0 justify-center">
			<button
				type="button"
				class="flex size-8 cursor-grab items-center justify-center rounded-lg text-dark-400 transition-colors hover:bg-dark-700 hover:text-dark-200 active:cursor-grabbing"
				{@attach handleRef}
				aria-label={t('Drag to reorder {name}', { name: displayName })}
				onclick={(event) => event.stopPropagation()}
			>
				<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
			</button>
		</div>
	{/if}

	<div {@attach ref} class="relative min-w-0 flex-1">
		{#if isOverlay}
			<div class="rounded-xl shadow-2xl ring-1 ring-white/10">
				<ActionCard {action} {selected} {onSelectedChange} />
			</div>
		{:else}
			<ActionCard
				{action}
				{selected}
				{onSelectedChange}
				isDragging={isDragging.current}
				movingLabel={displayName}
			/>
		{/if}
	</div>
</div>
