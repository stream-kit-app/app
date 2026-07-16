<script lang="ts">
	import type { PluginWidgetColumns } from '$lib/core/plugins/types';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		value: PluginWidgetColumns;
		class?: string;
		onValueChange?: (value: PluginWidgetColumns) => void;
	};

	let { value, class: className, onValueChange }: Props = $props();

	const { t } = useI18n();

	const options: PluginWidgetColumns[] = [1, 2, 3, 4, 5, 6];
</script>

<div
	class={cn(
		'flex w-auto shrink-0 items-center gap-0.5 rounded-lg border border-dark-600 bg-dark-700 p-0.5',
		'@max-[24rem]/widget:w-full',
		className
	)}
>
	<span class="sr-only">{t('Width')}</span>
	{#each options as columns (columns)}
		<button
			type="button"
			class={cn(
				'flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-xs font-medium tabular-nums transition',
				'@max-[24rem]/widget:min-w-0 @max-[24rem]/widget:flex-1 @max-[24rem]/widget:px-0',
				value === columns
					? 'bg-primary/20 text-primary-100 ring-1 ring-primary/30'
					: 'text-dark-400 hover:bg-dark-700 hover:text-dark-100'
			)}
			aria-label={t('{count} columns', { count: columns })}
			aria-pressed={value === columns}
			onclick={() => onValueChange?.(columns)}
		>
			{columns}
		</button>
	{/each}
</div>
