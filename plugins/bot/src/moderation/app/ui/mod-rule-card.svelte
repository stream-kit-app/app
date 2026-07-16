<script lang="ts">
	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { cn } from '@stream-kit/plugin/utils';

	import { summarizeConditions } from '../../../lib/moderation-conditions';
	import { ModRule } from '../lib/mod-rule.svelte';
	import type { ModRuleAction } from '../lib/stored-mod-rule';
	import { getModerationService } from '../lib/get-moderation';

	type Props = {
		rule: ModRule;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
	};

	let { rule, selected = false, onSelectedChange }: Props = $props();
	const t = getModerationService().requireApp().i18n.t;
	let shiftKey = false;

	const summary = $derived(summarizeConditions(rule.parameters.conditions));
	const actionLabel = $derived(formatActionLabel(rule.action));

	function formatActionLabel(action: ModRuleAction): string {
		switch (action) {
			case 'delete':
				return t('Delete message');
			case 'timeout':
				return t('Timeout (10 min)');
			case 'warn':
				return t('Warn (Twitch only)');
			default:
				return action;
		}
	}

	function handleClone(event: MouseEvent): void {
		event.stopPropagation();
		ModRule.createFrom(rule).open();
	}
</script>

<div
	class={cn('group/card flex min-w-0 flex-1 items-center gap-3 transition-colors', {
		'opacity-60': !rule.enabled
	})}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={cn(
			'shrink-0 transition-opacity',
			!selected && 'opacity-0 group-hover/card:opacity-100 focus-within:opacity-100'
		)}
		onclick={(event) => event.stopPropagation()}
		onmousedown={(event) => {
			shiftKey = event.shiftKey;
		}}
	>
		<InputCheckbox
			inline
			aria-label={t('Select {name}', {
				name: rule.name.trim() || t('this rule')
			})}
			bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
		/>
	</div>

	<div
		class={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', {
			'bg-dark-700 text-dark-400': !rule.enabled,
			'bg-dark-700 text-primary': rule.enabled
		})}
		aria-hidden="true"
	>
		<Icon icon="ri:shield-check-line" class="size-5" />
	</div>

	<button
		type="button"
		class="flex min-w-0 flex-1 cursor-pointer flex-col gap-1 text-left"
		onclick={() => rule.open()}
	>
		<span
			class={cn(
				'truncate text-base font-semibold',
				!rule.enabled ? 'text-dark-300' : 'text-dark-50'
			)}
		>
			{rule.name.trim() || t('Untitled rule')}
		</span>
		<span class="flex flex-wrap items-center gap-1.5">
			<Badge size="sm" variant="ghost" {@attach tooltip(() => summary)}>
				<Icon icon="ri:filter-3-line" />
				{summary}
			</Badge>
			<Badge size="sm" variant="outline">
				<Icon icon="ri:flashlight-line" />
				{actionLabel}
			</Badge>
			{#each rule.platforms as platform (platform)}
				<Badge size="sm" variant="secondary">{platform}</Badge>
			{/each}
		</span>
	</button>

	<div class="flex shrink-0 items-center gap-1">
		{#if rule.id != null}
			<Button
				variant="outline"
				size="icon"
				icon="clarity:clone-line"
				class="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
				aria-label={t('Clone rule')}
				onclick={handleClone}
				{@attach tooltip(() => t('Clone rule'))}
			/>
		{/if}
		<Icon
			icon="ri:arrow-right-s-line"
			class="size-5 shrink-0 text-dark-500 transition-[color,transform] group-hover/card:translate-x-0.5 group-hover/card:text-dark-300"
			aria-hidden="true"
		/>
	</div>
</div>
