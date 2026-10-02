<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';
	import { Button } from '../button';

	type Props = HTMLAttributes<HTMLDivElement> & {
		icon: string;
		title: string;
		description?: string;
		/** Smaller inline variant for empty lists inside forms and panels. */
		compact?: boolean;
		actionLabel?: string;
		onAction?: () => void;
		children?: Snippet;
	};

	let {
		icon,
		title,
		description,
		compact = false,
		actionLabel,
		onAction,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	{...restProps}
	class={cn(
		'box-border flex w-full flex-col',
		compact ? 'p-0' : 'min-h-full flex-1 p-6',
		className
	)}
>
	<div
		class={cn(
			'relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-rule bg-dark-950 text-center',
			compact ? 'gap-3 px-4 py-6' : 'gap-4 px-6 py-16'
		)}
	>
		<div
			class={cn(
				'relative flex items-center justify-center rounded-md border border-rule bg-dark-800 text-primary',
				compact ? 'size-10' : 'size-16'
			)}
		>
			<Icon {icon} class={compact ? 'size-5' : 'size-7'} aria-hidden="true" />
		</div>
		<div class={cn('relative flex flex-col', compact ? 'gap-1' : 'gap-1.5')}>
			<p class={cn('font-semibold text-dark-50', compact ? 'text-sm' : 'text-lg')}>{title}</p>
			{#if description}
				<p class={cn('text-dark-300', compact ? 'text-xs' : 'text-sm')}>{description}</p>
			{/if}
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
