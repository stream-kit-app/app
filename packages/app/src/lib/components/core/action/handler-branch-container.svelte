<script lang="ts">
	import Icon from '@iconify/svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { cn } from '$lib/utils';
	import { getHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';

	type Props = {
		containerKey: string;
		branchLabel: string;
		isEmpty?: boolean;
		t?: TranslateFn;
		children: import('svelte').Snippet;
	};

	let {
		containerKey,
		branchLabel,
		isEmpty = false,
		t: translateProp,
		children
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const handlerChainDnd = getHandlerChainDndContext();
	const chainDragging = $derived(handlerChainDnd?.isDragging() ?? false);

	const { ref, isDropTarget } = useSortable({
		id: () => containerKey,
		index: () => 0,
		type: 'handler-branch',
		accept: ['handler'],
		collisionPriority: 10,
		data: () => ({ containerKey, group: containerKey })
	});

	const showEmptyDropHint = $derived(chainDragging && isEmpty);
	const showActiveDropHint = $derived(chainDragging && isDropTarget.current && !isEmpty);
</script>

<div
	{@attach ref}
	class={cn(
		'grid min-h-16 gap-2 rounded-lg border-2 border-dashed px-3 py-3 transition-colors duration-150',
		isDropTarget.current
			? 'border-primary-300 bg-primary-950/40 ring-1 ring-primary-300/50'
			: chainDragging
				? 'border-dark-500 bg-dark-900/60'
				: 'border-transparent bg-transparent'
	)}
>
	{#if showEmptyDropHint}
		<div
			class={cn(
				'flex items-center justify-center gap-2 rounded-md border border-dashed px-3 py-4 text-sm font-medium transition-colors',
				isDropTarget.current
					? 'border-primary-300/80 bg-primary-950/50 text-primary-100'
					: 'border-dark-600 text-dark-300'
			)}
		>
			<Icon
				icon={isDropTarget.current ? 'ri:download-line' : 'ri:drag-drop-line'}
				class="size-4 shrink-0"
				aria-hidden="true"
			/>
			<span>
				{isDropTarget.current
					? t('Release to add to {branch}', { branch: branchLabel })
					: t('Drop handler in {branch}', { branch: branchLabel })}
			</span>
		</div>
	{/if}

	{@render children()}

	{#if showActiveDropHint}
		<div
			class="flex items-center justify-center gap-2 rounded-md border border-dashed border-primary-300/80 bg-primary-950/50 px-3 py-2 text-sm font-medium text-primary-100"
		>
			<Icon icon="ri:download-line" class="size-4 shrink-0" aria-hidden="true" />
			<span>{t('Release to add to {branch}', { branch: branchLabel })}</span>
		</div>
	{/if}
</div>
