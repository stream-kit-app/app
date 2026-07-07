<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';

	type Props = {
		icon: string;
		title: string;
		description: string;
		actionLabel?: string;
		onAction?: () => void;
		class?: string;
	};

	let { icon, title, description, actionLabel, onAction, class: className = 'mt-8' }: Props =
		$props();
</script>

<div
	class="{className} relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
>
	<div class="boot-ambient pointer-events-none opacity-30"></div>
	<div
		class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
	>
		<Icon {icon} class="size-7" aria-hidden="true" />
	</div>
	<div class="relative flex flex-col gap-1.5">
		<p class="text-lg font-semibold text-dark-50">{title}</p>
		<p class="text-sm text-dark-300">{description}</p>
	</div>
	{#if actionLabel && onAction}
		<Button class="relative" icon="ri:add-fill" onclick={onAction}>{actionLabel}</Button>
	{/if}
</div>
