<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { Snippet } from 'svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { cn } from '$lib/utils';

	import { resolveTranslate } from './resolve-translate';

	type Props = {
		/** Branch key; matches the layout record key so `move` can drop into an empty branch. */
		id: string;
		isEmpty: boolean;
		isDragging: boolean;
		t?: TranslateFn;
		children: Snippet;
	};

	let { id, isEmpty, isDragging, t: translateProp, children }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));

	const { ref, isDropTarget } = useSortable({
		id: () => id,
		index: () => 0,
		type: 'branch-container',
		accept: ['branch-handler'],
		collisionPriority: 10,
		data: () => ({ group: id })
	});
</script>

<ul
	{@attach ref}
	class={cn(
		'grid min-h-8 gap-0.5 rounded-lg transition-colors duration-150',
		isDropTarget.current
			? 'bg-primary-950/40 ring-1 ring-primary-300/60 ring-inset'
			: isDragging && 'ring-1 ring-rule ring-inset'
	)}
>
	{#if isEmpty}
		<li class="flex h-8 items-center px-3 text-sm text-dark-400 italic">
			{isDragging ? t('Drop handler here') : t('Empty')}
		</li>
	{/if}
	{@render children()}
</ul>
