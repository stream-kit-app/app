<script lang="ts">
	import type { ActionHandler, HandlerFieldFormErrors } from '$lib/core/action/action-handler.svelte';
	import type { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { HandlerFieldVariable } from '@stream-kit/ui/types';

	import { Button } from '@stream-kit/ui/button';

	import { tooltip } from '$lib/attachments';
	import { isIfHandler } from '$lib/core/action/if-condition';
	import { cn } from '$lib/utils';

	import HandlerFieldGroup from './handler-field-group.svelte';
	import IfConditionSummary from './if-condition-summary.svelte';
	import IfHandlerBranches from './if-handler-branches.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';
	import type { HandlerChainEditorHost } from './handler-chain-editor.types';

	type Props = {
		host: HandlerChainEditorHost;
		handler: ActionHandler;
		definitions: HandlerDefinition[];
		contextVariables: HandlerFieldVariable[];
		fieldErrors?: HandlerFieldFormErrors;
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let { host, handler, definitions, contextVariables, fieldErrors, app, t: translateProp }: Props =
		$props();

	const t = $derived(resolveTranslate(translateProp));

	const executionState = $derived(host.execution?.state);
</script>

<div
	class={cn('grid min-w-0 gap-2 rounded-xl border px-4 py-4 transition-colors duration-200', {
		'border-green-500 ring-1 ring-green-500/50':
			handler.definition.isAvailable && executionState?.activeHandlerId === handler.id,
		'border-green-600/70':
			handler.definition.isAvailable &&
			executionState?.activeHandlerId !== handler.id &&
			executionState?.completedHandlerIds.includes(handler.id),
		'border-dark-600':
			handler.definition.isAvailable &&
			executionState?.activeHandlerId !== handler.id &&
			!executionState?.completedHandlerIds.includes(handler.id),
		'border-destructive-500 bg-destructive-800': !handler.definition.isAvailable
	})}
>
	<div class="flex items-center justify-between gap-2">
		{#if isIfHandler(handler)}
			<div class="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-1">
				<IfConditionSummary {handler} {t} />
				{#if !handler.definition.isAvailable}
					<span class="text-sm font-normal text-destructive-50">
						{t('Unavailable')}
					</span>
				{/if}
			</div>
		{:else}
			<p class="min-w-0 font-medium text-dark-50">
				{handler.definition.name}
				{#if !handler.definition.isAvailable}
					<span class="ml-2 text-sm font-normal text-destructive-50">
						{t('Unavailable')}
					</span>
				{/if}
			</p>
		{/if}
		<div class="flex shrink-0 items-center gap-1">
			<Button
				variant="ghost"
				size="icon"
				icon="clarity:clone-line"
				aria-label={t('Clone handler')}
				onclick={() => host.cloneHandler(handler.id)}
				{@attach tooltip(() => t('Clone handler'))}
			/>
			<Button
				variant="ghost"
				size="icon"
				icon="ri:close-line"
				aria-label={t('Remove')}
				onclick={() => host.removeHandler(handler.id)}
				{@attach tooltip(() => t('Remove handler'))}
			/>
		</div>
	</div>

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
		<HandlerFieldGroup {handler} {contextVariables} {fieldErrors} {app} {t} />
	{/if}

	{#if isIfHandler(handler)}
		<IfHandlerBranches {host} {definitions} parentHandler={handler} {contextVariables} {app} {t} />
	{/if}
</div>
