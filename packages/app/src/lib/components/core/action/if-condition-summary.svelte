<script lang="ts">
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';

	import { Label } from '@stream-kit/ui/input';

	import {
		getIfConditionField,
		resolveOperatorLabel,
		isValuelessIfOperator
	} from '$lib/core/action/if-condition';

	import DefinitionIdPopover from './definition-id-popover.svelte';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';

	type Props = {
		handler: ActionHandler;
		t?: TranslateFn;
	};

	let { handler, t: translateProp }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));

	const ifCondition = $derived(getIfConditionField(handler));

	const operatorLabel = $derived(
		ifCondition
			? resolveOperatorLabel(ifCondition.config.items, ifCondition.field.type, (label) =>
					t(label as Parameters<typeof t>[0])
				)
			: ''
	);

	const isValueless = $derived(
		ifCondition
			? isValuelessIfOperator(ifCondition.config.valuelessOperators, ifCondition.field.type)
			: false
	);

	const pathText = $derived(ifCondition?.field.path.trim() ?? '');
	const valueText = $derived(ifCondition?.field.value.trim() ?? '');
</script>

{#if ifCondition}
	<Label class="flex flex-wrap items-baseline gap-x-1.5 font-mono text-base">
		<DefinitionIdPopover id={handler.definition.id} class="font-bold text-green-500 uppercase" {t}>
			{t('if')}
		</DefinitionIdPopover>
		{#if pathText}
			<span class="text-primary-100">{pathText}</span>
		{:else}
			<span class="text-dark-400 italic">
				{ifCondition.config.pathPlaceholder ?? '{variable}'}
			</span>
		{/if}
		<span class="text-dark-50 italic">{operatorLabel.toLowerCase()}</span>
		{#if !isValueless && valueText}
			<span class="text-primary-100">{valueText}</span>
		{/if}
		{#if ifCondition.field.negate}
			<span class="font-bold text-red-400 uppercase">{t('not')}</span>
		{/if}
	</Label>
{/if}
