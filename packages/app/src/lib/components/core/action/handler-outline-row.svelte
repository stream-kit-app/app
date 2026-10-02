<script lang="ts">
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';
	import type { TranslateFn } from './resolve-translate';
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';

	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
	import Icon from '@iconify/svelte';
	import { tick } from 'svelte';

	import { Button } from '@stream-kit/ui/button';

	import { isIfHandler } from '$lib/core/action/if-condition';
	import { cn } from '$lib/utils';

	import { getHandlerChainEditorState } from './handler-chain-editor-state.svelte';
	import HandlerNameLabel from './handler-name-label.svelte';
	import IfConditionSummary from './if-condition-summary.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		host: HandlerChainEditorHost;
		handler: ActionHandler;
		index: number;
		containerKey: string;
		/** 1-based position shown in front of root handlers. */
		position?: number;
		t?: TranslateFn;
	};

	let { host, handler, index, containerKey, position, t: translateProp }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const state = getHandlerChainEditorState();

	const isIf = $derived(isIfHandler(handler));
	const isSelected = $derived(state.selectedId === handler.id);
	const isCollapsed = $derived(state.collapsed.has(handler.id));
	const errors = $derived(host.formErrors?.handlerErrors[handler.id]);
	const hasErrors = $derived(
		!!errors && (errors.missingFields.length > 0 || Object.keys(errors.fieldErrors).length > 0)
	);
	const execution = $derived(host.execution?.state);
	const isRunning = $derived(execution?.activeHandlerId === handler.id);
	const isCompleted = $derived(
		!isRunning && (execution?.completedHandlerIds.includes(handler.id) ?? false)
	);

	const { ref, handleRef, isDragging } = useSortable({
		id: () => handler.id,
		index: () => index,
		type: 'handler',
		accept: 'handler',
		group: () => containerKey,
		data: () => ({ group: containerKey }),
		feedback: 'move'
	});

	async function focusRow(id: string | null): Promise<void> {
		if (!id) {
			return;
		}

		await tick();
		document.querySelector<HTMLElement>(`[data-outline-row-id="${CSS.escape(id)}"]`)?.focus();
	}

	function handleKeydown(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				state.selectNext();
				void focusRow(state.selectedId);
				return;
			case 'ArrowUp':
				event.preventDefault();
				state.selectPrevious();
				void focusRow(state.selectedId);
				return;
			case 'ArrowRight':
				if (isIf && isCollapsed) {
					event.preventDefault();
					state.toggle(handler.id);
				}
				return;
			case 'ArrowLeft':
				if (isIf && !isCollapsed) {
					event.preventDefault();
					state.toggle(handler.id);
				}
				return;
			case 'Enter':
			case ' ':
				event.preventDefault();
				state.select(handler.id, { openDetail: true });
				return;
		}
	}
</script>

<div
	{@attach ref}
	role="treeitem"
	aria-selected={isSelected}
	aria-expanded={isIf ? !isCollapsed : undefined}
	tabindex={isSelected ? 0 : -1}
	data-chain-item-id={handler.id}
	data-outline-row-id={handler.id}
	class={cn(
		'group flex min-w-0 cursor-pointer items-center gap-0.5 rounded-md outline-none',
		'focus-visible:ring-2 focus-visible:ring-ring',
		isDragging.current && 'opacity-40'
	)}
	onclick={() => state.select(handler.id, { openDetail: true })}
	onkeydown={handleKeydown}
>
	<Button
		variant="ghost"
		size="icon-badge"
		icon="ri:draggable"
		tabindex={-1}
		class="cursor-grab text-dark-400 active:cursor-grabbing"
		aria-label={t('Drag to reorder {name}', { name: handler.definition.name })}
		onclick={(event) => event.stopPropagation()}
		{@attach handleRef}
	/>

	{#if isIf}
		<Button
			variant="ghost"
			size="icon-badge"
			icon="ri:arrow-right-s-line"
			tabindex={-1}
			iconClass={cn('transition-transform duration-150', !isCollapsed && 'rotate-90')}
			class="text-dark-300"
			aria-label={isCollapsed ? t('Expand') : t('Collapse')}
			onclick={(event) => {
				event.stopPropagation();
				state.toggle(handler.id);
			}}
		/>
	{/if}

	<!-- Same item states as nav and dropdown items. -->
	<div
		class={cn(
			'flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150',
			isSelected
				? 'bg-dark-700 text-dark-50'
				: 'text-dark-100 group-hover:bg-dark-700 group-hover:text-dark-50',
			isRunning && 'ring-1 ring-success-200/60 ring-inset',
			!handler.definition.isAvailable && 'text-destructive-100'
		)}
	>
		{#if position != null}
			<span class="shrink-0 font-mono text-xs text-dark-400">{position}</span>
		{/if}

		<span class="min-w-0 flex-1 truncate">
			{#if isIf}
				<IfConditionSummary {handler} {t} compact />
			{:else}
				<HandlerNameLabel {handler} />
			{/if}
		</span>

		{#if hasErrors}
			<span
				class="size-2 shrink-0 rounded-full bg-destructive-300"
				role="img"
				aria-label={t('Has errors')}
			></span>
		{:else if isCompleted}
			<Icon
				icon="ri:check-line"
				class="size-4 shrink-0 text-success-200"
				aria-hidden="true"
			/>
		{/if}
	</div>
</div>
