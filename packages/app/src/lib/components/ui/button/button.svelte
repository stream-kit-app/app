<script lang="ts">
	import type { ButtonSize, ButtonVariant } from './button-variants';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';

	import { cn } from '$lib/utils';

	import { buttonVariants } from './button-variants';

	type Props = HTMLButtonAttributes & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		href?: HTMLAnchorAttributes['href'];
		icon?: string;
		iconPosition?: 'start' | 'end';
		iconClass?: string;
		isLoading?: boolean;
		children?: Snippet;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		icon,
		iconPosition = 'start',
		iconClass,
		href,
		type,
		disabled = false,
		isLoading = $bindable(false),
		children,
		...restProps
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	data-button-root
	type={href ? undefined : (type ?? 'button')}
	href={href && !disabled ? href : undefined}
	disabled={href ? undefined : disabled}
	aria-disabled={href && disabled ? true : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : undefined}
	class={cn(buttonVariants({ variant, size }), className)}
	{...restProps}
>
	{#if icon && iconPosition === 'start'}
		{#if isLoading}
			<Icon
				icon="gg:spinner"
				class={cn('animate-spin', iconClass)}
				aria-hidden={children != null}
			/>
		{:else}
			<Icon {icon} class={cn(iconClass)} aria-hidden={children != null} />
		{/if}
	{:else if isLoading}
		<Icon
			icon="gg:spinner"
			class={cn('animate-spin', iconClass)}
			aria-hidden={children != null}
		/>
	{/if}

	{@render children?.()}

	{#if icon && iconPosition === 'end'}
		<Icon {icon} class={cn(iconClass)} aria-hidden={children != null} />
	{/if}
</svelte:element>
