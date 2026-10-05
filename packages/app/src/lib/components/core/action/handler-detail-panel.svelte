<script lang="ts">
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';
	import type { TranslateFn } from './resolve-translate';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';
	import type {
		ActionHandler,
		HandlerBranch,
		HandlerFieldFormErrors
	} from '#lib/core/action/action-handler.svelte.js';
	import type { Action } from '#lib/core/action/action.svelte.js';
	import type { HandlerDefinition } from '#lib/core/action/handler/handler-definition.svelte.js';

	import { Button } from '@stream-kit/ui/button';

	import { tooltip } from '#lib/attachments/index.js';
	import { findHandlerLocation } from '#lib/core/action/handler-tree.js';
	import { isIfHandler } from '#lib/core/action/if-condition.js';
	import { cn } from '#lib/utils.js';

	import DefinitionIdPopover from './definition-id-popover.svelte';
	import HandlerBranchBoard from './handler-branch-board.svelte';
	import { getHandlerChainEditorState } from './handler-chain-editor-state.svelte';
	import HandlerFieldGroup from './handler-field-group.svelte';
	import { resolveTranslate } from './resolve-translate';

	type Props = {
		action?: Action;
		host: HandlerChainEditorHost;
		handler: ActionHandler;
		definitions: HandlerDefinition[];
		variables: HandlerFieldVariable[];
		fieldErrors?: HandlerFieldFormErrors;
		onAddToBranch: (
			parent: ActionHandler,
			branch: HandlerBranch,
			definition: { id: string }
		) => void;
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let {
		action,
		host,
		handler,
		definitions,
		variables,
		fieldErrors,
		onAddToBranch,
		app,
		t: translateProp
	}: Props = $props();

	const t = $derived(resolveTranslate(translateProp));
	const state = getHandlerChainEditorState();

	/** A lone code field (Run script) stretches to the pane height; other fields keep their size. */
	const fillsWithCode = $derived(
		handler.fieldDefinitions?.length === 1 && handler.fieldDefinitions[0]?.type === 'code'
	);

	/** The If handler this handler sits in, when it is inside a Then/Else branch. */
	const parentHandler = $derived(findHandlerLocation(host.handlers, handler.id)?.parent ?? null);
</script>

<div class="flex min-w-0 flex-1 flex-col">
	<div class="flex items-center gap-2 border-b border-rule px-5 py-3">
		{#if parentHandler}
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:arrow-left-line"
				aria-label={t('Back to {name}', { name: parentHandler.definition.name })}
				onclick={() => state.select(parentHandler.id)}
				{@attach tooltip(() =>
					t('Back to {name}', { name: parentHandler?.definition.name ?? '' })
				)}
			/>
		{:else}
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:arrow-left-line"
				class="@3xl:hidden"
				aria-label={t('Back to handlers')}
				onclick={() => (state.showDetailOnNarrow = false)}
			/>
		{/if}
		<h3 class="min-w-0 flex-1 truncate text-lg font-semibold text-dark-50">
			<DefinitionIdPopover id={handler.definition.id} {t}>
				{handler.definition.name}
			</DefinitionIdPopover>
			{#if !handler.definition.isAvailable}
				<span class="ml-2 text-sm font-normal text-destructive-50">{t('Unavailable')}</span>
			{/if}
		</h3>
		<div class="flex shrink-0 items-center gap-1">
			<Button
				variant="ghost"
				size="icon"
				icon="ri:stack-line"
				aria-label={t('Clone handler')}
				onclick={() => host.cloneHandler(handler.id)}
				{@attach tooltip(() => t('Clone handler'))}
			/>
			<Button
				variant="ghost"
				size="icon"
				icon="ri:delete-bin-line"
				aria-label={t('Remove handler')}
				onclick={() => host.removeHandler(handler.id)}
				{@attach tooltip(() => t('Remove handler'))}
			/>
		</div>
	</div>

	<div class={cn('flex min-h-0 min-w-0 flex-col gap-4 p-5', fillsWithCode && 'flex-1')}>
		{#if !handler.definition.isAvailable}
			<p class="text-sm text-destructive-50">
				{t('This handler is not available. The plugin may be disabled or missing.')}
			</p>
		{/if}

		{#if fieldErrors?.missingFields.length}
			<ul class="grid gap-1 text-sm text-destructive-50">
				{#each fieldErrors.missingFields as name (name)}
					<li>{t('{field} is required', { field: name })}</li>
				{/each}
			</ul>
		{/if}

		{#if handler.fieldDefinitions?.length}
			<HandlerFieldGroup
				fillHeight
				{action}
				{handler}
				contextVariables={variables}
				{fieldErrors}
				{app}
				{t}
			/>
		{:else if !isIfHandler(handler)}
			<p class="text-sm text-dark-300">{t('This handler has no settings.')}</p>
		{/if}
	</div>

	{#if isIfHandler(handler)}
		<HandlerBranchBoard
			{host}
			parent={handler}
			{definitions}
			onAdd={onAddToBranch}
			onOpen={(child) => state.select(child.id, { openDetail: true })}
			{t}
		/>
	{/if}
</div>
