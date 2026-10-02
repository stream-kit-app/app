<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import { cn, itemActive, itemBase, itemHover } from '../../utils';

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
		'relative flex items-center gap-2.5 px-3 py-1.5 text-sm font-medium text-dark-200',
		itemBase,
		itemHover,
		isActive && itemActive,
		props.class
	)}
>
	{@render children?.()}
</a>
