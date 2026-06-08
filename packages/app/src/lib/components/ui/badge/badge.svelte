<script lang="ts">
	import type { BadgeSize, BadgeVariant } from './badge-variants';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	import { badgeVariants } from './badge-variants';

	type Props = HTMLAttributes<HTMLSpanElement> & {
		variant?: BadgeVariant;
		size?: BadgeSize;
		children?: Snippet;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<span class={cn(badgeVariants({ variant, size }), className)} {...restProps}>
	{@render children?.()}
</span>
