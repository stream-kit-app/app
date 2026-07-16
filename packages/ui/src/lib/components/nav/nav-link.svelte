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
		'flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-medium text-dark-200',
		'hover:bg-dark-900 hover:text-dark-100',
		isActive && 'bg-dark-800 text-foreground hover:bg-dark-800 hover:text-foreground',
		props.class
	)}
>
	{@render children?.()}
</a>
