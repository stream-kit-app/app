<script lang="ts">
	import type { DndDragEvent } from './dnd-events';
	import type {
		HandlerChainEditorHost,
		HandlerChainFormErrors
	} from './handler-chain-editor.types';
	import type { TranslateFn } from './resolve-translate';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';
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
	import { findHandlerDefinition } from '$lib/core/action/handler-tree';
	import { isIfHandler } from '$lib/core/action/if-condition';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import { applyDndMove } from './dnd-events';
	import HandlerChainCard from './handler-chain-card.svelte';
	import { setHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import IfHandlerBranches from './if-handler-branches.svelte';
	import { resolveTranslate } from './resolve-translate';
	import { scrollChainItemIntoView } from './scroll-chain-item';
	import SortableChainList from './sortable-chain-list.svelte';

	type Props = {
		host: HandlerChainEditorHost;
		definitions: HandlerDefinition[];
		formErrors?: HandlerChainFormErrors | null;
		contextVariablesForHandler: (handler: ActionHandler) => HandlerFieldVariable[];
		globalVariables?: HandlerFieldVariable[];
		showVariablePopover?: boolean;
		onAddHandler: (definition: HandlerDefinition) => void;
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let {
		host,
		definitions,
		formErrors,
		contextVariablesForHandler,
		globalVariables = [],
		showVariablePopover = false,
		onAddHandler,
		app,
		t: translateProp
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const action = $derived('triggers' in host && 'id' in host ? (host as Action) : undefined);
	const sensors = [KeyboardSensor, PointerSensor];

	let layout = $state<HandlerDndLayout>(buildHandlerDndLayout(host.handlers));
	let isDragging = $state(false);

	setHandlerChainDndContext({
		layout: () => layout,
		isDragging: () => isDragging
	});

	watch(
		() => handlerTreeSignature(host.handlers),
		() => {
			if (isDragging) {
				return;
			}

			layout = buildHandlerDndLayout(host.handlers);
		}
	);

	function handlerLabel(handler: ActionHandler): string {
		return handler.definition.name;
	}

	function selectHandlerDefinition(definition: {
		id: string;
		isGroup: boolean;
		isAvailable: boolean;
	}): void {
		const found = findHandlerDefinition(definitions, definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		onAddHandler(found);

		const added = host.handlers[host.handlers.length - 1];
		if (added) {
			void scrollChainItemIntoView(added.id);
		}
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
		const nextSignature = handlerTreeSignature(nextHandlers);
		const currentSignature = handlerTreeSignature(host.handlers);

		if (nextSignature !== currentSignature) {
			host.reorderHandlers(nextHandlers);
		}

		layout = buildHandlerDndLayout(host.handlers);
	}
</script>

<section class="grid gap-3">
	<div class="sticky top-0 z-20 -mx-8 flex items-center gap-1 bg-dark-800 px-8 py-2">
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
				label={t('Add Handler')}
				{definitions}
				onSelect={selectHandlerDefinition}
			/>
		</div>
	</div>

	<div class="grid gap-3">

		{#if formErrors?.handlers}
			<p class="text-sm text-destructive-50">{formErrors.handlers}</p>
		{/if}

		{#if host.handlers.length === 0}
			<p class="text-sm text-dark-300">{t('No handlers added yet.')}</p>
		{/if}

		{#if host.handlers.length > 0}
			<DragDropProvider
				{sensors}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
			<SortableChainList
				items={host.handlers}
				getId={(handler: ActionHandler) => handler.id}
				getLabel={handlerLabel}
				sortableType="handler"
				containerKey={HANDLER_DND_ROOT_KEY}
				{t}
			>
				{#snippet itemContent(handler: ActionHandler)}
					<HandlerChainCard
						{action}
						{host}
						{definitions}
						{handler}
						variant={isIfHandler(handler) ? 'embedded' : 'standalone'}
						includeBranches={!isIfHandler(handler)}
						contextVariables={contextVariablesForHandler(handler)}
						fieldErrors={formErrors?.handlerErrors[handler.id]}
						{app}
						{t}
					/>
				{/snippet}
				{#snippet itemTrailingContent(handler: ActionHandler)}
					{#if isIfHandler(handler)}
						<IfHandlerBranches
							{host}
							{definitions}
							parentHandler={handler}
							contextVariables={contextVariablesForHandler(handler)}
							{app}
							embedded
							{t}
						/>
					{/if}
				{/snippet}
			</SortableChainList>

			<DragOverlay>
				{#snippet children(source)}
					{@const match = findHandlerDndEntry(layout, String(source.id))}
					{#if match}
						<div class="rounded-none border border-rule bg-dark-800 shadow-2xl">
							<HandlerChainCard
								{action}
								{host}
								{definitions}
								handler={match.entry.handler}
								contextVariables={contextVariablesForHandler(match.entry.handler)}
								fieldErrors={formErrors?.handlerErrors[match.entry.handler.id]}
								{app}
								{t}
							/>
						</div>
					{/if}
				{/snippet}
			</DragOverlay>
			</DragDropProvider>
		{/if}
	</div>
</section>
