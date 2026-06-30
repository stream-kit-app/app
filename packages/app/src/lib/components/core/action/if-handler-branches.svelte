<script lang="ts">
	import type { ActionHandler, HandlerBranch } from '$lib/core/action/action-handler.svelte';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';

	import { Label } from '@stream-kit/ui/input';

	import { findHandlerDefinition } from '$lib/core/action/handler-tree';
	import {
		getPrecedingActionVariablesForHandler,
		mergeContextVariables
	} from '$lib/core/action/variable-helpers';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import HandlerChainCard from './handler-chain-card.svelte';
	import SortableChainList from './sortable-chain-list.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';

	type Props = {
		host: HandlerChainEditorHost;
		definitions: HandlerDefinition[];
		parentHandler: ActionHandler;
		contextVariables: HandlerFieldVariable[];
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let { host, definitions, parentHandler, contextVariables, app, t: translateProp }: Props =
		$props();

	const t = $derived(resolveTranslate(translateProp));

	const branches: Array<{ key: HandlerBranch; label: string }> = $derived([
		{ key: 'then', label: t('Then') },
		{ key: 'else', label: t('Else') }
	]);

	function addBranchHandler(branch: HandlerBranch, definition: HandlerDefinition): void {
		const found = findHandlerDefinition(definitions, definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		host.addHandler(found, { parentId: parentHandler.id, branch });
	}

	function reorderBranchHandlers(branch: HandlerBranch, handlers: ActionHandler[]): void {
		host.reorderBranchHandlers(parentHandler.id, branch, handlers);
	}

	function handlerLabel(handler: ActionHandler): string {
		return handler.definition.name;
	}

	function contextVariablesForBranchHandler(handler: ActionHandler): HandlerFieldVariable[] {
		return mergeContextVariables(
			contextVariables,
			getPrecedingActionVariablesForHandler(host.handlers, handler.id)
		);
	}
</script>

<div class="grid gap-4 border-t border-dark-700 pt-4">
	{#each branches as branch (branch.key)}
		{@const branchHandlers = parentHandler.getBranchHandlers(branch.key)}
		<section class="grid gap-2 rounded-lg border border-dark-700 bg-dark-900/40 p-3">
			<div class="flex flex-wrap items-center justify-between gap-2">
				<Label class="font-mono text-sm font-bold text-green-500 uppercase">
					{branch.label}
				</Label>
				<DefinitionPickerDropdown
					label={t('Add Handler')}
					{definitions}
					onSelect={(definition) => addBranchHandler(branch.key, definition)}
				/>
			</div>

			{#if branchHandlers.length === 0}
				<p class="text-sm text-dark-400">{t('No handlers in this branch yet.')}</p>
			{:else}
				<SortableChainList
					items={branchHandlers}
					getId={(handler: ActionHandler) => handler.id}
					getLabel={handlerLabel}
					sortableType="handler-{branch.key}-{parentHandler.id}"
					onReorder={(handlers) => reorderBranchHandlers(branch.key, handlers)}
					{t}
				>
					{#snippet itemContent(handler: ActionHandler)}
						<HandlerChainCard
							{host}
							{definitions}
							{handler}
							contextVariables={contextVariablesForBranchHandler(handler)}
							fieldErrors={host.formErrors?.handlerErrors[handler.id]}
							{app}
							{t}
						/>
					{/snippet}
				</SortableChainList>
			{/if}
		</section>
	{/each}
</div>
