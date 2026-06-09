<script lang="ts">
	import type { AlertVariant } from './alert-variants';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';

	import { alertIconByVariant, alertIconVariants, alertVariants } from './alert-variants';

	type Props = HTMLAttributes<HTMLDivElement> & {
		variant?: AlertVariant;
		icon?: string | false;
		title?: string;
		description?: string;
		children?: Snippet;
	};

	let {
		variant = 'default',
		icon,
		title,
		description,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const iconName = $derived(icon === false ? undefined : (icon ?? alertIconByVariant[variant]));
</script>

<div class={cn(alertVariants({ variant }), className)} {...restProps}>
	{#if iconName}
		<Icon icon={iconName} class={alertIconVariants({ variant })} />
	{/if}

	<div class="min-w-0 flex-1">
		{#if title}
			<p class="font-semibold">{title}</p>
		{/if}
		{#if description}
			<p class={cn('opacity-80', title && 'mt-1')}>{description}</p>
		{/if}
		{@render children?.()}
	</div>
</div>
