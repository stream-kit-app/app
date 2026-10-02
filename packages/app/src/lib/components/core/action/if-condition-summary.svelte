<script lang="ts">
	import type { TranslateFn } from './resolve-translate';
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';
	import type { IfSummaryPart } from '$lib/core/action/if-condition';

	import { summarizeIfCondition } from '$lib/core/action/if-condition';
	import { cn } from '$lib/utils';

	import { resolveTranslate } from './resolve-translate';

	type Props = {
		handler: ActionHandler;
		t?: TranslateFn;
		/** Single truncated line for compact rows. */
		compact?: boolean;
		class?: string;
	};

	let { handler, t: translateProp, compact = false, class: className }: Props = $props();

	const t = $derived(resolveTranslate(translateProp));

	const parts = $derived(
		summarizeIfCondition(handler, (label) => t(label as Parameters<typeof t>[0])) ?? []
	);

	const partClasses: Record<IfSummaryPart['kind'], string> = {
		path: 'text-primary-100',
		value: 'text-primary-100',
		operator: 'text-dark-50 italic',
		placeholder: 'text-dark-400 italic',
		join: 'font-bold text-success-100',
		not: 'font-bold text-destructive-100 uppercase',
		paren: 'text-dark-300'
	};
</script>

<span
	class={cn(
		'min-w-0 gap-x-1.5 font-mono',
		compact ? 'block truncate text-sm' : 'flex flex-wrap items-baseline text-base',
		className
	)}
>
	<span class="font-bold text-success-100 uppercase">{t('if')}</span>
	{#each parts as part, index (index)}
		{' '}<span class={partClasses[part.kind]}>{part.text}</span>
	{/each}
</span>
