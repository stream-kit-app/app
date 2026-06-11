<script lang="ts">
	import type { Timer } from '../lib/timer.svelte';

	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { InputCheckbox } from '@stream-kit/ui/input';

	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		timer: Timer;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
	};

	let { timer, selected = false, onSelectedChange }: Props = $props();
	const { t } = useI18n();
	let shiftKey = false;

	const intervalLabel = $derived(`${timer.intervalMinSec}s – ${timer.intervalMaxSec}s`);
</script>

<div
	class={cn(
		'grid grid-cols-[1fr_auto_auto] items-center rounded-xl border border-border-dark-600 bg-dark-800 transition-colors hover:bg-dark-700',
		!timer.enabled && 'opacity-60'
	)}
>
	<button
		type="button"
		class="group col-span-3 grid cursor-pointer grid-cols-subgrid items-center px-3 py-2 text-left"
		onclick={() => timer.open()}
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
					aria-label={t('Select {name}', { name: timer.name.trim() || t('this timer') })}
					bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
				/>
			</div>
			<div class="min-w-0">
				<p class={cn('truncate font-medium', !timer.enabled && 'text-dark-400')}>
					{timer.name.trim()}
				</p>
				<p class="truncate text-sm text-dark-300">
					{t('{count} messages · every {interval}', {
						count: timer.messages.filter((m) => m.trim()).length,
						interval: intervalLabel
					})}
				</p>
			</div>
		</div>

		<div class="flex flex-wrap justify-end gap-1">
			{#each timer.platforms as platform (platform)}
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
