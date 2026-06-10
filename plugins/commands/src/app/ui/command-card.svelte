<script lang="ts">
	import type { Command } from '../domain/command.svelte';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		command: Command;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
	};

	let { command, selected = false, onSelectedChange }: Props = $props();
	const { t } = useI18n();
	let shiftKey = false;

	const commandLabel = $derived(command.displayCommandNames.map((name) => `!${name}`).join(', '));
</script>

<div
	class={cn(
		'grid grid-cols-[1fr_auto_auto_auto] items-center rounded-xl border transition-colors',
		command.hasUnavailableDefinitions
			? 'border-destructive-500 bg-destructive-800 hover:bg-destructive-600'
			: 'border-border-dark-600 bg-dark-800 hover:bg-dark-700',
		!command.enabled && 'opacity-60'
	)}
>
	<button
		type="button"
		class="group col-span-4 grid cursor-pointer grid-cols-subgrid items-center px-3 py-2 text-left transition-colors"
		onclick={() => command.open()}
	>
		<div class="flex min-w-0 items-center gap-4">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="shrink-0"
				onclick={(event) => event.stopPropagation()}
				onmousedown={(event) => {
					shiftKey = event.shiftKey;
				}}
			>
				<InputCheckbox
					inline
					aria-label={t('Select {name}', {
						name: command.name.trim() || t('this command')
					})}
					bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
				/>
			</div>
			<div class="min-w-0">
				<p class={cn('truncate font-medium', !command.enabled && 'text-dark-400')}>
					{command.name.trim()}
				</p>
				<p class="truncate text-sm text-dark-300">{commandLabel}</p>
			</div>
		</div>

		<span
			class={cn(
				'me-2 text-sm',
				command.hasUnavailableDefinitions ? 'text-destructive-50' : 'text-dark-300'
			)}
			{@attach tooltip(() =>
				command.handlers.map((handler) => `- ${handler.definition.name}`).join('<br />')
			)}
		>
			{t('handlers ({count})', { count: command.handlers.length })}
		</span>

		<div class="flex flex-wrap justify-end gap-1">
			{#each command.sources as source (source)}
				<Badge variant="secondary">{source}</Badge>
			{/each}
		</div>

		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 justify-self-end text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</button>
</div>
