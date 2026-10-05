<script lang="ts">
	import type { DndDragEvent } from './dnd-events';
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';
	import type { TranslateFn } from './resolve-translate';
	import type { ActionHandler, HandlerBranch } from '#lib/core/action/action-handler.svelte.js';
	import type { HandlerDefinition } from '#lib/core/action/handler/handler-definition.svelte.js';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { watch } from 'runed';

	import { Label } from '@stream-kit/ui/input';

	import { cn } from '#lib/utils.js';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import { applyDndMove } from './dnd-events';
	import HandlerBranchDropZone from './handler-branch-drop-zone.svelte';
	import HandlerBranchItem from './handler-branch-item.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		host: HandlerChainEditorHost;
		parent: ActionHandler;
		definitions: HandlerDefinition[];
		onAdd: (parent: ActionHandler, branch: HandlerBranch, definition: { id: string }) => void;
		onOpen: (handler: ActionHandler) => void;
		t?: TranslateFn;
	};

	let { host, parent, definitions, onAdd, onOpen, t: translateProp }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const sensors = [KeyboardSensor, PointerSensor];

	type BranchLayout = Record<HandlerBranch, ActionHandler[]>;

	const branches: Array<{ key: HandlerBranch; label: string }> = $derived([
		{ key: 'then', label: t('Then') },
		{ key: 'else', label: t('Else') }
	]);

	function readLayout(): BranchLayout {
		return { then: [...parent.thenHandlers], else: [...parent.elseHandlers] };
	}

	let layout = $state<BranchLayout>(readLayout());
	let isDragging = $state(false);

	watch(
		() => [parent.thenHandlers, parent.elseHandlers],
		() => {
			if (!isDragging) {
				layout = readLayout();
			}
		}
	);

	function handleDragOver(event: DndDragEvent): void {
		layout = applyDndMove(layout, event);
	}

	function handleDragEnd(): void {
		isDragging = false;

		for (const branch of ['then', 'else'] as const) {
			const next = layout[branch];
			const current = parent.getBranchHandlers(branch);
			const changed =
				next.length !== current.length ||
				next.some((handler, index) => handler.id !== current[index]?.id);

			if (changed) {
				host.reorderBranchHandlers(parent.id, branch, next);
			}
		}

		layout = readLayout();
	}

	function findDragged(id: unknown): ActionHandler | undefined {
		return [...layout.then, ...layout.else].find((handler) => handler.id === id);
	}
</script>

<DragDropProvider
	{sensors}
	onDragStart={() => (isDragging = true)}
	onDragOver={handleDragOver}
	onDragEnd={handleDragEnd}
>
	<!-- Collapsed cells: the rules run edge to edge and meet the column rule. -->
	<div class="grid border-y border-rule sm:grid-cols-2">
		{#each branches as branch, index (branch.key)}
			<section
				class={cn(
					'grid content-start gap-2 p-5',
					index > 0 && 'border-t border-rule sm:border-t-0 sm:border-l'
				)}
			>
				<div class="flex items-center justify-between gap-2">
					<Label class="font-mono text-sm font-bold text-success-100 uppercase">
						{branch.label}
					</Label>
					<DefinitionPickerDropdown
						label={t('Add to {branch}', { branch: branch.label })}
						{definitions}
						onSelect={(definition) => onAdd(parent, branch.key, definition)}
					/>
				</div>
				<HandlerBranchDropZone
					id={branch.key}
					isEmpty={layout[branch.key].length === 0}
					{isDragging}
					{t}
				>
					{#each layout[branch.key] as child, childIndex (child.id)}
						<HandlerBranchItem
							handler={child}
							index={childIndex}
							group={branch.key}
							{onOpen}
							{t}
						/>
					{/each}
				</HandlerBranchDropZone>
			</section>
		{/each}
	</div>

	<DragOverlay>
		{#snippet children(source)}
			{@const dragged = findDragged(source.id)}
			{#if dragged}
				<div
					class="flex h-8 items-center gap-2.5 rounded-lg border border-rule bg-dark-800 px-3 text-sm text-dark-50 shadow-2xl"
				>
					<span class="truncate">{dragged.definition.name}</span>
				</div>
			{/if}
		{/snippet}
	</DragOverlay>
</DragDropProvider>
