<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import { page } from '$app/state';

	import { cn } from '$lib/utils';

	type Props = { variant?: 'default' | 'sidebar' } & HTMLAnchorAttributes;

	const { children, variant = 'default', ...props }: Props = $props();
	const isActive = $derived(props.href === page.url.pathname);
</script>

<a
	{...props}
	data-active={isActive}
	class={cn(
		'font-medium',
		'flex items-center gap-4 rounded-xl px-4 py-2',
		{
			' bg-dark-600 shadow-sm hover:bg-dark-700 not-[data-active]:hover:bg-dark-600':
				variant === 'default' && isActive,
			'text-primary-50 hover:bg-dark-800 not-[data-active]:hover:bg-transparent':
				variant === 'sidebar' && isActive
		},
		props.class
	)}
>
	{@render children?.()}
</a>
