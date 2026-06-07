<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLDivElement> & {
		center?: boolean;
		size?: 'sm' | 'md' | 'lg' | 'full';
	};

	const { children, center, size = 'full', ...props }: Props = $props();
</script>

<div
	{...props}
	class={cn(
		'container px-4',
		{
			'mx-auto': center,
			'max-w-3xl': size === 'sm',
			'max-w-5xl': size === 'md',
			'max-w-7xl': size === 'lg',
			'max-w-full': size === 'full'
		},
		props.class
	)}
>
	{@render children?.()}
</div>
