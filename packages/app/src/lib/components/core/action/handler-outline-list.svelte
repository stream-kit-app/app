<script lang="ts">
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';
	import type { TranslateFn } from './resolve-translate';
	import type { ActionHandler, HandlerBranch } from '$lib/core/action/action-handler.svelte';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';

	import { branchContainerKey, HANDLER_DND_ROOT_KEY } from '$lib/core/action/handler-chain-dnd';
	import { isIfHandler } from '$lib/core/action/if-condition';
	import { cn } from '$lib/utils';

	import { getHandlerChainDndContext } from './handler-chain-dnd-context.svelte';
	import { getHandlerChainEditorState } from './handler-chain-editor-state.svelte';
	import HandlerOutlineBranch from './handler-outline-branch.svelte';
	import HandlerOutlineConnector, { connectorLineClass } from './handler-outline-connector.svelte';
	import Self from './handler-outline-list.svelte';
	import HandlerOutlineRow from './handler-outline-row.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		host: HandlerChainEditorHost;
		definitions: HandlerDefinition[];
		containerKey: string;
		onAddToBranch: (
			parent: ActionHandler,
			branch: HandlerBranch,
			definition: { id: string }
		) => void;
		t?: TranslateFn;
	};

	let { host, definitions, containerKey, onAddToBranch, t: translateProp }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const dnd = getHandlerChainDndContext();
	const state = getHandlerChainEditorState();

	const entries = $derived(dnd?.layout()[containerKey] ?? []);
	const isRoot = $derived(containerKey === HANDLER_DND_ROOT_KEY);
	const chainDragging = $derived(dnd?.isDragging() ?? false);

	const branches: Array<{ key: HandlerBranch; label: string }> = $derived([
		{ key: 'then', label: t('Then') },
		{ key: 'else', label: t('Else') }
	]);
</script>

<div class="grid min-w-0">
	{#each entries as entry, index (entry.id)}
		{#if index > 0}
			<!-- Belongs to the handler above: does this one wait for it? -->
			<HandlerOutlineConnector handler={entries[index - 1].handler} {t} />
		{/if}
		<HandlerOutlineRow
			{host}
			handler={entry.handler}
			{index}
			{containerKey}
			position={isRoot ? index + 1 : undefined}
			{t}
		/>
		{#if isIfHandler(entry.handler) && !state.collapsed.has(entry.handler.id)}
			<!-- One continuous guide from the If chevron (24px grip + 2px gap + 12px) down
				through Then and Else. -->
			<div class="relative mb-1 ml-[37px] grid min-w-0 gap-0.5 border-l border-rule pl-2">
				{#if index < entries.length - 1 && !chainDragging}
					<!-- Carries the connector spine (grip axis, 12px) past the branches to the
						next sibling: 12px minus the 37px margin and 1px border. -->
					<span
						class={cn(
							'absolute -top-[7px] -bottom-1 -left-[26px]',
							connectorLineClass(entry.handler.blocking)
						)}
					></span>
				{/if}
				{#each branches as branch (branch.key)}
					{@const key = branchContainerKey(entry.handler.id, branch.key)}
					<HandlerOutlineBranch
						containerKey={key}
						label={branch.label}
						isEmpty={(dnd?.layout()[key] ?? []).length === 0}
						{definitions}
						onAdd={(definition) => onAddToBranch(entry.handler, branch.key, definition)}
						{t}
					>
						<Self {host} {definitions} containerKey={key} {onAddToBranch} {t} />
					</HandlerOutlineBranch>
				{/each}
			</div>
		{/if}
	{/each}
</div>
