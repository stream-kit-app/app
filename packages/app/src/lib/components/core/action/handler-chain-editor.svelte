<script lang="ts">
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';

	import { Label } from '@stream-kit/ui/input';
	import { VariablePopover } from '@stream-kit/ui/variable-popover';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import HandlerChainCard from './handler-chain-card.svelte';
	import SortableChainList from './sortable-chain-list.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';
	import type { HandlerChainEditorHost, HandlerChainFormErrors } from './handler-chain-editor.types';

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

	function handlerLabel(handler: ActionHandler): string {
		return handler.definition.name;
	}

	function reorderHandlers(handlers: ActionHandler[]): void {
		host.reorderHandlers(handlers);
	}
</script>

<section class="grid gap-3">
	<div class="flex flex-wrap items-center justify-between gap-2">
		<div class="flex items-center gap-1">
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
		</div>
		<DefinitionPickerDropdown
			label={t('Add Handler')}
			{definitions}
			onSelect={onAddHandler}
		/>
	</div>

	{#if formErrors?.handlers}
		<p class="text-sm text-destructive-50">{formErrors.handlers}</p>
	{/if}

	{#if host.handlers.length === 0}
		<p class="text-sm text-dark-300">{t('No handlers added yet.')}</p>
	{/if}

	{#if host.handlers.length > 0}
		<SortableChainList
			items={host.handlers}
			getId={(handler: ActionHandler) => handler.id}
			getLabel={handlerLabel}
			sortableType="handler"
			onReorder={reorderHandlers}
			{t}
		>
			{#snippet itemContent(handler: ActionHandler)}
				<HandlerChainCard
					{host}
					{definitions}
					{handler}
					contextVariables={contextVariablesForHandler(handler)}
					fieldErrors={formErrors?.handlerErrors[handler.id]}
					{app}
					{t}
				/>
			{/snippet}
		</SortableChainList>
	{/if}
</section>
