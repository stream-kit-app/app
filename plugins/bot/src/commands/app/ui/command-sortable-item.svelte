<script lang="ts">
	import type { Command } from '../lib/command.svelte';

	import Icon from '@iconify/svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { cn } from '@stream-kit/plugin/utils';

	import { getCommandsService } from '../lib/get-commands';
	import CommandCard from './command-card.svelte';

	type Props = {
		command: Command;
		index: number;
		groupId: string;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
		isOverlay?: boolean;
	};

	let {
		command,
		index,
		groupId,
		selected = false,
		onSelectedChange,
		isOverlay = false
	}: Props = $props();

	const t = getCommandsService().requireApp().i18n.t;
	const displayName = $derived(command.name.trim() || t('this command'));

	const { ref, handleRef, isDragging } = useSortable({
		id: () => command.id!,
		index: () => index,
		type: 'action',
		accept: 'action',
		group: () => groupId,
		data: () => ({ group: groupId }),
		feedback: 'move'
	});
</script>

<div {@attach ref} class="relative min-w-0 p-0.5">
	<div
		class={cn(
			'group/row flex min-w-0 items-center gap-1 rounded-lg px-2 py-1.5 transition-colors',
			isOverlay
				? 'rounded-xl border border-dark-600 bg-dark-800 shadow-2xl ring-1 ring-white/10'
				: 'hover:bg-dark-700/60',
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
				class="flex size-7 shrink-0 cursor-grab items-center justify-center rounded-lg text-dark-400 opacity-0 transition hover:bg-dark-700 hover:text-dark-200 focus-visible:opacity-100 active:cursor-grabbing group-hover/row:opacity-100"
				{@attach handleRef}
				aria-label={t('Drag to reorder {name}', { name: displayName })}
				onclick={(event) => event.stopPropagation()}
			>
				<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
			</button>
		{/if}

		<CommandCard {command} {selected} {onSelectedChange} {isOverlay} />
	</div>

	{#if isDragging.current && !isOverlay}
		<div
			class="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-primary-300 bg-primary-950 px-4 text-sm font-medium text-primary-200"
			aria-hidden="true"
		>
			{t('Moving: {name}', {
				name: displayName
			})}
		</div>
	{/if}
</div>
