<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		action: Action;
	};

	let { action }: Props = $props();
	const { t } = useI18n();
</script>

<button
	type="button"
	class={cn(
		'grid grid-cols-[30%_200px_200px_1fr]',
		'group w-full cursor-pointer items-center justify-between rounded-xl',
		'border px-4 py-3 text-left transition-colors',
		action.hasUnavailableDefinitions
			? 'border-destructive-500 bg-destructive-800 hover:bg-destructive-900'
			: 'border-transparent bg-dark-800 hover:bg-dark-600'
	)}
	onclick={() => action.open()}
>
	<span>{action.name.trim()}</span>
	<span
		class={cn(
			'text-center',
			action.triggers.some((trigger) => !trigger.definition.isAvailable)
				? 'text-destructive-50'
				: 'text-dark-300'
		)}
		{@attach tooltip(() =>
			action.triggers.map((trigger) => `- ${trigger.definition.name}`).join('<br />')
		)}
	>
		{t('triggers ({count})', { count: action.triggers.length })}
	</span>
	<span
		class={cn(
			'text-center',
			action.handlers.some((handler) => !handler.definition.isAvailable)
				? 'text-destructive-50'
				: 'text-dark-300'
		)}
		{@attach tooltip(() =>
			action.handlers.map((handler) => `- ${handler.definition.name}`).join('<br />')
		)}
	>
		{t('handlers ({count})', { count: action.handlers.length })}
	</span>
	<span class="justify-self-end">
		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</span>
</button>
