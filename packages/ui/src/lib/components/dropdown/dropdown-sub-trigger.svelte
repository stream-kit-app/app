<script lang="ts">
	import Icon from '@iconify/svelte';
	import { DropdownMenu } from 'bits-ui';

	import { cn, itemBase, itemHighlighted, itemHover } from '../../utils';

	type Props = DropdownMenu.SubTriggerProps;
	const { children, class: className, openDelay = 100, ...props }: Props = $props();
</script>

<DropdownMenu.SubTrigger
	{...props}
	{openDelay}
	class={cn(
		'flex cursor-pointer items-center justify-between gap-2 px-4 py-2 outline-none',
		itemBase,
		itemHover,
		itemHighlighted,
		'data-[state=open]:bg-dark-700 data-[state=open]:text-dark-50',
		className
	)}
>
	{@render children?.()}
	<Icon icon="ri:arrow-right-s-line" />
</DropdownMenu.SubTrigger>
