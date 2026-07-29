<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';
	import { Button } from '../button';

	type Props = HTMLAttributes<HTMLDivElement> & {
		icon: string;
		title: string;
		description: string;
		actionLabel?: string;
		onAction?: () => void;
		children?: Snippet;
	};

	let {
		icon,
		title,
		description,
		actionLabel,
		onAction,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	{...restProps}
	class={cn('box-border flex min-h-full w-full flex-1 flex-col p-6', className)}
>
	<div
		class="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-none border border-dashed border-rule bg-dark-900 px-6 py-16 text-center"
	>
		<div class="boot-ambient pointer-events-none opacity-30"></div>
		<div
			class="relative flex size-16 items-center justify-center border border-rule bg-dark-800 text-primary"
		>
			<Icon {icon} class="size-7" aria-hidden="true" />
		</div>
		<div class="relative flex flex-col gap-1.5">
			<p class="text-lg font-semibold text-dark-50">{title}</p>
			<p class="text-sm text-dark-300">{description}</p>
		</div>
		{#if children}
			<div class="relative flex flex-wrap items-center justify-center gap-2">
				{@render children()}
			</div>
		{:else if actionLabel && onAction}
			<Button class="relative" icon="ri:add-fill" onclick={onAction}>{actionLabel}</Button>
		{/if}
	</div>
</div>
