<script lang="ts">
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { cn } from '$lib/utils';

	import { resolveTranslate, type TranslateFn } from './resolve-translate';

	type Props = {
		id: string;
		index: number;
		sortableType: string;
		group: string;
		label: string;
		isOverlay?: boolean;
		t?: TranslateFn;
		children: Snippet;
	};

	let {
		id,
		index,
		sortableType,
		group,
		label,
		isOverlay = false,
		t: translateProp,
		children
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));

	const { ref, handleRef, isDragging } = useSortable({
		id: () => id,
		index: () => index,
		type: () => sortableType,
		accept: () => sortableType,
		group: () => group,
		data: () => ({ group }),
		feedback: 'move'
	});
</script>

<div class="flex min-w-0 items-start gap-2">
	{#if !isOverlay}
		<div class="flex w-8 shrink-0 justify-center pt-2">
			<button
				type="button"
				class="flex size-8 cursor-grab items-center justify-center rounded-lg text-dark-400 transition-colors hover:bg-dark-700 hover:text-dark-200 active:cursor-grabbing"
				{@attach handleRef}
				aria-label={t('Drag to reorder {name}', { name: label })}
			>
				<Icon icon="ri:draggable" class="size-4" aria-hidden="true" />
			</button>
		</div>
	{/if}

	<div {@attach ref} class="relative min-w-0 flex-1">
		{#if isOverlay}
			<div class="rounded-xl shadow-2xl ring-1 ring-white/10">
				{@render children()}
			</div>
		{:else}
			<div
				class={cn(isDragging.current && 'pointer-events-none select-none opacity-0')}
				aria-hidden={isDragging.current}
			>
				{@render children()}
			</div>
			{#if isDragging.current}
				<div
					class="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-primary-300/70 bg-primary-950/50 px-4 text-sm font-medium text-primary-200"
					aria-hidden="true"
				>
					{t('Moving: {name}', { name: label })}
				</div>
			{/if}
		{/if}
	</div>
</div>
