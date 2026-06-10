<script lang="ts">
	import type { Action } from '$lib/core/action/action.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		action: Action;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
	};

	let { action, selected = false, onSelectedChange }: Props = $props();
	const { t } = useI18n();
	let shiftKey = false;
</script>

<div
	class={cn(
		'grid grid-cols-[auto_1fr_200px_200px_auto] items-center rounded-xl border transition-colors',
		action.hasUnavailableDefinitions
			? 'border-destructive-500 bg-destructive-800 hover:bg-destructive-600'
			: 'border-border-dark-600 bg-dark-800 hover:bg-dark-700',
		!action.enabled && 'opacity-60'
	)}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="shrink-0 p-3"
		onclick={(event) => event.stopPropagation()}
		onmousedown={(event) => {
			shiftKey = event.shiftKey;
		}}
	>
		<InputCheckbox
			inline
			aria-label={t('Select {name}', { name: action.name.trim() || t('this action') })}
			bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
		/>
	</div>
	<button
		type="button"
		class={cn(
			'group col-span-4 grid cursor-pointer grid-cols-subgrid items-center px-3 py-2 text-left transition-colors'
		)}
		onclick={() => action.open()}
	>
		<span class={cn(!action.enabled && 'text-dark-400')}>{action.name.trim()}</span>
		<span
			class={cn(
				'text-center',
				action.triggers.some((trigger) => !trigger.definition.isAvailable)
					? 'text-destructive-50'
					: action.enabled
						? 'text-dark-300'
						: 'text-dark-400'
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
					: action.enabled
						? 'text-dark-300'
						: 'text-dark-400'
			)}
			{@attach tooltip(() =>
				action.handlers.map((handler) => `- ${handler.definition.name}`).join('<br />')
			)}
		>
			{t('handlers ({count})', { count: action.handlers.length })}
		</span>
		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 justify-self-end text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</button>
</div>
