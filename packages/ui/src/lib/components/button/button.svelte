<script lang="ts">
	import type { ButtonSize, ButtonVariant } from './button-variants';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { watch } from 'runed';
	import { onDestroy } from 'svelte';

	import { cn } from '../../utils';
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

	/** Keep the spinner visible briefly, so a fast action still reads as "clicked". */
	const MIN_SPINNER_MS = 600;

	let showSpinner = $state(false);
	let spinnerStartedAt = 0;
	let spinnerTimer: ReturnType<typeof setTimeout> | undefined;

	watch(
		() => isLoading,
		(loading) => {
			clearTimeout(spinnerTimer);

			if (loading) {
				spinnerStartedAt = Date.now();
				showSpinner = true;
				return;
			}

			const remaining = MIN_SPINNER_MS - (Date.now() - spinnerStartedAt);

			if (remaining <= 0) {
				showSpinner = false;
				return;
			}

			spinnerTimer = setTimeout(() => {
				showSpinner = false;
			}, remaining);
		}
	);

	onDestroy(() => clearTimeout(spinnerTimer));
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
		{#if showSpinner}
			<Icon
				icon="ri:loader-4-line"
				class={cn('animate-spin', iconClass)}
				aria-hidden={children != null}
			/>
		{:else}
			<Icon {icon} class={cn(iconClass)} aria-hidden={children != null} />
		{/if}
	{:else if showSpinner}
		<Icon
			icon="ri:loader-4-line"
			class={cn('animate-spin', iconClass)}
			aria-hidden={children != null}
		/>
	{/if}

	{@render children?.()}

	{#if icon && iconPosition === 'end'}
		<Icon {icon} class={cn(iconClass)} aria-hidden={children != null} />
	{/if}
</svelte:element>
