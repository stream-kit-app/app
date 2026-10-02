<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { Button } from '@stream-kit/ui/button';

	import { isIfHandler } from '$lib/core/action/if-condition';
	import { cn } from '$lib/utils';

	import HandlerNameLabel from './handler-name-label.svelte';
	import IfConditionSummary from './if-condition-summary.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		handler: ActionHandler;
		index: number;
		/** Branch key (`then` / `else`); items can move between groups. */
		group: string;
		onOpen: (handler: ActionHandler) => void;
		t?: TranslateFn;
	};

	let { handler, index, group, onOpen, t: translateProp }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));

	const { ref, handleRef, isDragging } = useSortable({
		id: () => handler.id,
		index: () => index,
		type: 'branch-handler',
		accept: 'branch-handler',
		group: () => group,
		data: () => ({ group }),
		feedback: 'move'
	});
</script>

<li
	{@attach ref}
	class={cn('flex min-w-0 items-center gap-0.5', isDragging.current && 'opacity-40')}
>
	<Button
		variant="ghost"
		size="icon-badge"
		icon="ri:draggable"
		class="cursor-grab text-dark-400 active:cursor-grabbing"
		aria-label={t('Drag to reorder {name}', { name: handler.definition.name })}
		{@attach handleRef}
	/>
	<Button
		variant="ghost"
		size="sm"
		icon="ri:arrow-right-s-line"
		iconPosition="end"
		class="min-w-0 flex-1 justify-between"
		onclick={() => onOpen(handler)}
	>
		<span class="min-w-0 truncate text-left">
			{#if isIfHandler(handler)}
				<IfConditionSummary {handler} {t} compact />
			{:else}
				<HandlerNameLabel {handler} />
			{/if}
		</span>
	</Button>
</li>
