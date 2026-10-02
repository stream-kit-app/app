<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
	import type { Snippet } from 'svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';

	import { cn } from '$lib/utils';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import { getHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		containerKey: string;
		label: string;
		isEmpty: boolean;
		definitions: HandlerDefinition[];
		onAdd: (definition: { id: string }) => void;
		t?: TranslateFn;
		children: Snippet;
	};

	let {
		containerKey,
		label,
		isEmpty,
		definitions,
		onAdd,
		t: translateProp,
		children
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const handlerChainDnd = getHandlerChainDndContext();
	const chainDragging = $derived(handlerChainDnd?.isDragging() ?? false);

	// The branch itself is a drop target, so handlers can be dropped into an empty branch.
	const { ref, isDropTarget } = useSortable({
		id: () => containerKey,
		index: () => 0,
		type: 'handler-branch',
		accept: ['handler'],
		collisionPriority: 10,
		data: () => ({ containerKey, group: containerKey })
	});
</script>

<div role="group" aria-label={label} class="grid min-w-0 gap-0.5">
	<!-- The tick joins the label to the parent If's guide line (8px left of the label). -->
	<div
		class="relative flex h-7 items-center gap-1 before:absolute before:top-1/2 before:-left-2 before:w-1.5 before:border-t before:border-rule"
	>
		<span class="font-mono text-xs font-bold tracking-wide text-success-100 uppercase">
			{label}
		</span>
		<DefinitionPickerDropdown
			label={t('Add to {branch}', { branch: label })}
			iconOnly
			{definitions}
			onSelect={onAdd}
		/>
	</div>
	<div
		{@attach ref}
		class={cn(
			'grid min-h-7 gap-0.5 transition-colors duration-150',
			isDropTarget.current
				? 'bg-primary-950/40 ring-1 ring-primary-300/60 ring-inset'
				: chainDragging && 'ring-1 ring-rule ring-inset'
		)}
	>
		{#if isEmpty}
			<p class="flex h-7 items-center px-2 text-xs text-dark-400 italic">
				{chainDragging ? t('Drop handler in {branch}', { branch: label }) : t('Empty')}
			</p>
		{/if}
		{@render children()}
	</div>
</div>
