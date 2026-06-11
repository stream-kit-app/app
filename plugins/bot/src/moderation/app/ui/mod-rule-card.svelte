<script lang="ts">
	import type { ModRule } from '../lib/mod-rule.svelte';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { summarizeConditions } from '../../../lib/moderation-conditions';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		rule: ModRule;
		selected?: boolean;
		onSelectedChange?: (selected: boolean) => void;
	};

	let { rule, selected = false, onSelectedChange }: Props = $props();
	const { t } = useI18n();

	const summary = $derived(summarizeConditions(rule.parameters.conditions));
</script>

<div
	class={cn(
		'border-border-dark-600 grid grid-cols-[1fr_auto_auto] items-center rounded-xl border bg-dark-800 transition-colors hover:bg-dark-700',
		!rule.enabled && 'opacity-60'
	)}
>
	<button
		type="button"
		class="group col-span-3 grid cursor-pointer grid-cols-subgrid items-center gap-4 px-3 py-2 text-left"
		onclick={() => rule.open()}
	>
		<div class="flex min-w-0 items-center gap-4">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div class="shrink-0" onclick={(event) => event.stopPropagation()}>
				<InputCheckbox
					inline
					aria-label={t('Select {name}', { name: rule.name.trim() || t('this rule') })}
					bind:checked={() => selected, (value) => onSelectedChange?.(value)}
				/>
			</div>
			<div class="min-w-0">
				<p class={cn('truncate font-medium', !rule.enabled && 'text-dark-400')}>
					{rule.name.trim()}
				</p>
				<p class="truncate text-sm text-dark-300">
					{t('{summary} · {action}', { summary, action: rule.action })}
				</p>
			</div>
		</div>

		<div class="flex flex-wrap justify-end gap-1">
			{#each rule.platforms as platform (platform)}
				<Badge variant="secondary">{platform}</Badge>
			{/each}
		</div>

		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 justify-self-end text-dark-400 transition-colors group-hover:text-dark-200"
			aria-hidden="true"
		/>
	</button>
</div>
