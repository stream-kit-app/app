<script lang="ts">
	import type { RankRecord } from '../../lib/types';

	import Icon from '@iconify/svelte';

	import { cn } from '@stream-kit/plugin/utils';
	import { tooltip } from '@stream-kit/ui/attachments';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { InputCheckbox } from '@stream-kit/ui/input';

	type Props = {
		rank: RankRecord;
		pointsLabel: string;
		usersLabel: string;
		selectLabel: string;
		deleteLabel: string;
		selected?: boolean;
		onSelectedChange?: (selected: boolean, shiftKey: boolean) => void;
		onDelete: () => void;
	};

	let {
		rank,
		pointsLabel,
		usersLabel,
		selectLabel,
		deleteLabel,
		selected = false,
		onSelectedChange,
		onDelete
	}: Props = $props();

	let shiftKey = false;
</script>

<div class="relative min-w-0 p-2">
	<div
		class="group/card flex min-w-0 items-center gap-3 rounded-lg px-4 py-1.5 transition-colors hover:bg-dark-700/60"
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
				aria-label={selectLabel}
				bind:checked={() => selected, (value) => onSelectedChange?.(value, shiftKey)}
			/>
		</div>

		<div
			class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
			aria-hidden="true"
		>
			<Icon icon="ri:award-line" class="size-5" />
		</div>

		<div class="flex min-w-0 flex-1 flex-col gap-1">
			<span class="truncate text-base font-semibold text-dark-50">{rank.name}</span>
			<span class="flex flex-wrap items-center gap-1.5">
				<Badge size="sm" variant="secondary">
					{rank.pointsRequired}
					{pointsLabel}
				</Badge>
				<Badge size="sm" variant="outline">
					<Icon icon="ri:user-line" />
					{usersLabel}
				</Badge>
			</span>
		</div>

		<div class="flex shrink-0 items-center gap-1">
			<Button
				variant="ghost"
				size="icon"
				icon="ri:delete-bin-line"
				class="opacity-0 transition-opacity group-hover/card:opacity-100 focus-visible:opacity-100"
				aria-label={deleteLabel}
				onclick={() => onDelete()}
				{@attach tooltip(() => deleteLabel)}
			/>
		</div>
	</div>
</div>
