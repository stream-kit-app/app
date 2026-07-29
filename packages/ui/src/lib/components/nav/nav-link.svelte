<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import { cn } from '../../utils';

	type Props = HTMLAnchorAttributes & {
		activePath?: string;
	};

	const { children, activePath, ...props }: Props = $props();
	const isActive = $derived(props.href != null && props.href === activePath);
</script>

<a
	{...props}
	data-active={isActive}
	class={cn(
		'relative flex items-center gap-2.5 rounded-none px-3 py-1.5 text-sm font-medium text-dark-200',
		'hover:bg-dark-900/60 hover:text-dark-100',
		isActive &&
			'bg-dark-900 text-foreground before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-primary hover:bg-dark-900 hover:text-foreground',
		props.class
	)}
>
	{@render children?.()}
</a>
