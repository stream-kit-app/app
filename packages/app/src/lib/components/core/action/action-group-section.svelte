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
		isOverlay?: boolean;
	};

	let { groupId, index, children, isOverlay = false }: Props = $props();
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
		<Heading level="4" class="text-dark-300 uppercase">{displayName}</Heading>
	</div>

	<div class="relative">
		<div class={cn(isDragging.current && !isOverlay && 'pointer-events-none select-none')}>
			{@render children()}
		</div>
	</div>
</section>
