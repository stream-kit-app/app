<script lang="ts" generics="T extends string">
	import type { ToggleGroupItem, ToggleGroupSize } from './types';
	import type { HTMLAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';

	type Props = {
		value?: T;
		items: ToggleGroupItem<T>[];
		size?: ToggleGroupSize;
		ariaLabel?: string;
		class?: string;
		onValueChange?: (value: T) => void;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	let {
		value = $bindable(),
		items,
		size = 'default',
		ariaLabel,
		class: className,
		onValueChange,
		...restProps
	}: Props = $props();

	function select(next: T): void {
		if (value === next) {
			return;
		}

		value = next;
		onValueChange?.(next);
	}
</script>

<div
	class={cn(
		'inline-flex w-fit rounded-none border border-rule bg-dark-900/50 p-1 shadow-inner',
		className
	)}
	role="group"
	aria-label={ariaLabel}
	{...restProps}
>
	{#each items as item (item.value)}
		{@const isSelected = value === item.value}
		<button
			type="button"
			disabled={item.disabled}
			aria-pressed={isSelected}
			class={cn(
				'inline-flex cursor-pointer items-center gap-2 rounded-lg font-medium transition',
				'disabled:cursor-not-allowed disabled:opacity-50',
				size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm',
				isSelected
					? 'bg-dark-700 text-dark-50 shadow-sm'
					: 'text-dark-300 hover:text-dark-100'
			)}
			onclick={() => select(item.value)}
		>
			{#if item.icon}
				<Icon icon={item.icon} class={size === 'sm' ? 'size-3.5' : 'size-4'} aria-hidden="true" />
			{/if}
			{item.label}
		</button>
	{/each}
</div>
