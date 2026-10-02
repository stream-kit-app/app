<script lang="ts">
	import type { DndDragEvent } from './dnd-events';
	import type {
		HandlerChainEditorHost,
		HandlerChainFormErrors
	} from './handler-chain-editor.types';
	import type { TranslateFn } from './resolve-translate';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';
	import type { ActionHandler, HandlerBranch } from '$lib/core/action/action-handler.svelte';
	import type { Action } from '$lib/core/action/action.svelte';
	import type { HandlerDndLayout } from '$lib/core/action/handler-chain-dnd';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';

	import {
		DragDropProvider,
		DragOverlay,
		KeyboardSensor,
		PointerSensor
	} from '@dnd-kit-svelte/svelte';
	import { watch } from 'runed';
	import { untrack } from 'svelte';

	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { Label } from '@stream-kit/ui/input';
	import { VariablePopover } from '@stream-kit/ui/variable-popover';

	import {
		applyHandlerDndLayout,
		buildHandlerDndLayout,
		findHandlerDndEntry,
		HANDLER_DND_ROOT_KEY,
		handlerTreeSignature,
		layoutHasInvalidHandlerPlacements
	} from '$lib/core/action/handler-chain-dnd';
	import { findHandlerDefinition, flattenActionHandlers } from '$lib/core/action/handler-tree';
	import { isIfHandler } from '$lib/core/action/if-condition';
	import { computeVariableScopes } from '$lib/core/action/variable-scope';
	import { cn } from '$lib/utils';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import { applyDndMove } from './dnd-events';
	import { setHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import {
		HandlerChainEditorState,
		setHandlerChainEditorState
	} from './handler-chain-editor-state.svelte';
	import HandlerDetailPanel from './handler-detail-panel.svelte';
	import HandlerOutlineList from './handler-outline-list.svelte';
	import IfConditionSummary from './if-condition-summary.svelte';
	import { resolveTranslate } from './resolve-translate';
	import { scrollChainItemIntoView } from './scroll-chain-item';
	import { StickyHeaderState } from './sticky-header.svelte';

	type Props = {
		host: HandlerChainEditorHost;
		definitions: HandlerDefinition[];
		formErrors?: HandlerChainFormErrors | null;
		/**
		 * Trigger, context and global variables available to every handler. Handler outputs are added
		 * per handler in execution order.
		 */
		baseVariables?: HandlerFieldVariable[];
		globalVariables?: HandlerFieldVariable[];
		showVariablePopover?: boolean;
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let {
		host,
		definitions,
		formErrors,
		baseVariables,
		globalVariables = [],
		showVariablePopover = false,
		app,
		t: translateProp
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const action = $derived('triggers' in host && 'id' in host ? (host as Action) : undefined);
	const sensors = [KeyboardSensor, PointerSensor];
	const stickyHeader = new StickyHeaderState();

	const editorState = setHandlerChainEditorState(
		new HandlerChainEditorState(() => host.handlers)
	);

	let layout = $state<HandlerDndLayout>(untrack(() => buildHandlerDndLayout(host.handlers)));
	let isDragging = $state(false);
	let knownHandlerIds = untrack(() =>
		flattenActionHandlers(host.handlers).map((handler) => handler.id)
	);

	setHandlerChainDndContext({
		layout: () => layout,
		isDragging: () => isDragging
	});

	const scopes = $derived(
		baseVariables ? computeVariableScopes(host.handlers, baseVariables) : null
	);
	const selected = $derived(editorState.selected);

	function variablesFor(handler: ActionHandler): HandlerFieldVariable[] {
		return scopes?.get(handler.id) ?? [];
	}

	watch(
		() => handlerTreeSignature(host.handlers),
		() => {
			const previousIds = knownHandlerIds;
			const previousSelectedId = editorState.selectedId;
			knownHandlerIds = flattenActionHandlers(host.handlers).map((handler) => handler.id);
			editorState.syncSelection(previousIds);

			if (editorState.selectedId && editorState.selectedId !== previousSelectedId) {
				void scrollChainItemIntoView(editorState.selectedId);
			}

			if (!isDragging) {
				layout = buildHandlerDndLayout(host.handlers);
			}
		},
		{ lazy: true }
	);

	watch(
		() => formErrors,
		(errors) => {
			const handlerErrors = errors?.handlerErrors ?? {};

			if (editorState.selectedId && handlerErrors[editorState.selectedId]) {
				return;
			}

			editorState.revealFirstError(Object.keys(handlerErrors));
		},
		{ lazy: true }
	);

	function resolveDefinition(definition: { id: string }): HandlerDefinition | undefined {
		const found = findHandlerDefinition(definitions, definition.id);

		return found && !found.isGroup && found.isAvailable ? found : undefined;
	}

	function addHandler(definition: { id: string }): void {
		const found = resolveDefinition(definition);

		if (!found) {
			return;
		}

		const afterId = editorState.selectedId;
		host.addHandler(found, afterId ? { afterId } : undefined);
	}

	function addToBranch(
		parent: ActionHandler,
		branch: HandlerBranch,
		definition: { id: string }
	): void {
		const found = resolveDefinition(definition);

		if (!found) {
			return;
		}

		editorState.collapsed.delete(parent.id);
		host.addHandler(found, { parentId: parent.id, branch });
	}

	function handleDragStart(): void {
		isDragging = true;
	}

	function handleDragOver(event: DndDragEvent): void {
		const nextLayout = applyDndMove(layout, event);

		if (layoutHasInvalidHandlerPlacements(host.handlers, nextLayout)) {
			event.preventDefault?.();
			return;
		}

		layout = nextLayout;
	}

	function handleDragEnd(): void {
		isDragging = false;

		const nextHandlers = applyHandlerDndLayout(host.handlers, layout);

		if (handlerTreeSignature(nextHandlers) !== handlerTreeSignature(host.handlers)) {
			host.reorderHandlers(nextHandlers);
		}

		layout = buildHandlerDndLayout(host.handlers);
	}
</script>

<section class="@container relative grid gap-3">
	<div
		bind:this={stickyHeader.sentinel}
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-0 h-px"
	></div>
	<div
		class={cn(
			'sticky top-0 z-20 -mx-8 flex items-center gap-1 border-b border-transparent bg-dark-800 px-8 py-2',
			stickyHeader.isStuck && 'border-rule'
		)}
	>
		<Label>{t('Handlers')}</Label>
		{#if showVariablePopover}
			<VariablePopover
				variables={globalVariables}
				title={t('Global variables')}
				emptyLabel={t('No global variables defined yet.')}
				ariaLabel={t('Show global variables')}
				copiedLabel={t('Copied')}
			/>
		{/if}
		<div class="ml-auto shrink-0">
			<DefinitionPickerDropdown
				label={selected ? t('Add Handler after selected') : t('Add Handler')}
				{definitions}
				onSelect={addHandler}
			/>
		</div>
	</div>

	{#if formErrors?.handlers}
		<p class="text-sm text-destructive-50">{formErrors.handlers}</p>
	{/if}

	{#if host.handlers.length === 0}
		<EmptyState compact icon="ri:list-check" title={t('No handlers added yet.')} />
	{:else}
		<!-- One panel with collapsed borders: the column rule meets the panel edge and the
			full-bleed rules inside the detail pane. -->
		<div
			class="grid min-w-0 border border-rule bg-dark-800 @3xl:grid-cols-[22rem_minmax(0,1fr)]"
		>
			<div
				class={cn(
					'min-w-0 @3xl:block @3xl:border-r @3xl:border-rule',
					editorState.showDetailOnNarrow && 'hidden'
				)}
			>
				<div role="tree" aria-label={t('Handlers')} class="min-w-0 p-2">
					<DragDropProvider
						{sensors}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDragEnd={handleDragEnd}
					>
						<HandlerOutlineList
							{host}
							{definitions}
							containerKey={HANDLER_DND_ROOT_KEY}
							onAddToBranch={addToBranch}
							{t}
						/>

						<DragOverlay>
							{#snippet children(source)}
								{@const match = findHandlerDndEntry(layout, String(source.id))}
								{#if match}
									<div
										class="flex h-9 items-center border border-rule bg-dark-800 px-3 text-sm text-dark-50 shadow-2xl"
									>
										{#if isIfHandler(match.entry.handler)}
											<IfConditionSummary
												handler={match.entry.handler}
												{t}
												compact
											/>
										{:else}
											<span class="truncate"
												>{match.entry.handler.definition.name}</span
											>
										{/if}
									</div>
								{/if}
							{/snippet}
						</DragOverlay>
					</DragDropProvider>
				</div>
			</div>

			<div
				class={cn(
					// -mb-px: a bottom rule that reaches the panel edge overlaps the panel border.
					'-mb-px flex min-w-0 flex-col @3xl:flex',
					!editorState.showDetailOnNarrow && 'hidden'
				)}
			>
				<!-- Sticky below the Handlers header (py-2 + h-8 + 1px border), so the selected
					handler stays in view however far the outline is scrolled. -->
				<div
					class="flex min-h-[calc(100dvh-16rem)] flex-1 flex-col @3xl:sticky @3xl:top-[49px] @3xl:max-h-[calc(100dvh-16rem)] @3xl:flex-none @3xl:overflow-y-auto"
				>
					{#if selected}
						{#key selected.id}
							<HandlerDetailPanel
								{action}
								{host}
								handler={selected}
								{definitions}
								variables={variablesFor(selected)}
								fieldErrors={formErrors?.handlerErrors[selected.id]}
								onAddToBranch={addToBranch}
								{app}
								{t}
							/>
						{/key}
					{:else}
						<p class="p-5 text-sm text-dark-300">{t('Select a handler to edit it.')}</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</section>
