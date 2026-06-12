<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import { cn } from '../../utils';

	type Props = {
		variant?: 'default' | 'sidebar';
		activePath?: string;
	} & HTMLAnchorAttributes;

	const { children, variant = 'default', activePath, ...props }: Props = $props();
	const isActive = $derived(props.href != null && props.href === activePath);
</script>

<a
	{...props}
	data-active={isActive}
	class={cn(
		'font-medium',
		'flex items-center gap-4 rounded-xl px-4 py-2',
		{
			'hover:bg-dark-700': variant === 'default',
			' bg-primary/15 text-primary shadow-sm hover:bg-dark-700 not-[data-active]:hover:bg-dark-600':
				variant === 'default' && isActive,
			'text-primary-50 hover:bg-dark-800 not-[data-active]:hover:bg-transparent':
				variant === 'sidebar' && isActive
		},
		props.class
	)}
>
	{@render children?.()}
</a>
