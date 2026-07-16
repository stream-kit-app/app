<script lang="ts">
	import Icon from '@iconify/svelte';

	import { cn } from '@stream-kit/plugin/utils';

	import { DEFAULT_RANK_ICON, getRankIconKind } from '../../lib/rank-icon';

	type Props = {
		icon?: string;
		class?: string;
	};

	let { icon, class: className }: Props = $props();

	const kind = $derived(getRankIconKind(icon));
</script>

<div
	class={cn(
		'flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary',
		className
	)}
	aria-hidden="true"
>
	{#if kind === 'image' && icon}
		<img src={icon} alt="" class="size-full max-h-10 max-w-10 object-contain p-1" />
	{:else}
		<Icon icon={icon?.trim() || DEFAULT_RANK_ICON} class="size-5" />
	{/if}
</div>
