<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';
	import type { ActionHandler, HandlerBranch } from '$lib/core/action/action-handler.svelte';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';

	import { Label } from '@stream-kit/ui/input';

	import { branchContainerKey } from '$lib/core/action/handler-chain-dnd';
	import { isIfHandler } from '$lib/core/action/if-condition';
	import { findHandlerDefinition } from '$lib/core/action/handler-tree';
	import {
		getPrecedingActionVariablesForHandler,
		mergeContextVariables
	} from '$lib/core/action/variable-helpers';
	import { cn } from '$lib/utils';

	import DefinitionPickerDropdown from './definition-picker-dropdown.svelte';
	import HandlerBranchContainer from './handler-branch-container.svelte';
	import HandlerChainCard from './handler-chain-card.svelte';
	import IfHandlerBranches from './if-handler-branches.svelte';
	import SortableChainList from './sortable-chain-list.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';
	import { scrollChainItemIntoView } from './scroll-chain-item';
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';

	type Props = {
		host: HandlerChainEditorHost;
		definitions: HandlerDefinition[];
		parentHandler: ActionHandler;
		contextVariables: HandlerFieldVariable[];
		app?: PluginAppApi;
		embedded?: boolean;
		t?: TranslateFn;
	};

	let {
		host,
		definitions,
		parentHandler,
		contextVariables,
		app,
		embedded = false,
		t: translateProp
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const action = $derived(
		'triggers' in host && 'id' in host ? (host as Action) : undefined
	);

	const branches: Array<{ key: HandlerBranch; label: string }> = $derived([
		{ key: 'then', label: t('Then') },
		{ key: 'else', label: t('Else') }
	]);

	function addBranchHandler(branch: HandlerBranch, definition: { id: string }): void {
		const found = findHandlerDefinition(definitions, definition.id);

		if (!found || found.isGroup || !found.isAvailable) {
			return;
		}

		host.addHandler(found, { parentId: parentHandler.id, branch });

		const branchHandlers = parentHandler.getBranchHandlers(branch);
		const added = branchHandlers[branchHandlers.length - 1];
		if (added) {
			void scrollChainItemIntoView(added.id);
		}
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

<div
	class={cn('grid gap-4', embedded ? 'border-t border-dark-700 bg-dark-900/30 px-4 py-4' : 'border-t border-dark-700 pt-4')}
>
	{#each branches as branch (branch.key)}
		{@const branchHandlers = parentHandler.getBranchHandlers(branch.key)}
		{@const containerKey = branchContainerKey(parentHandler.id, branch.key)}
		<section class="grid min-w-0 gap-2 rounded-lg border border-dark-700 bg-dark-900/40 p-3">
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

			<HandlerBranchContainer
				{containerKey}
				branchLabel={branch.label}
				isEmpty={branchHandlers.length === 0}
				{t}
			>
				{#if branchHandlers.length > 0}
					<SortableChainList
						items={branchHandlers}
						getId={(handler: ActionHandler) => handler.id}
						getLabel={handlerLabel}
						sortableType="handler"
						{containerKey}
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
								contextVariables={contextVariablesForBranchHandler(handler)}
								fieldErrors={host.formErrors?.handlerErrors[handler.id]}
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
									{contextVariables}
									{app}
									embedded
									{t}
								/>
							{/if}
						{/snippet}
					</SortableChainList>
				{/if}
			</HandlerBranchContainer>
		</section>
	{/each}
</div>
