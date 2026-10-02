<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	import { cn, itemBase, itemHighlighted, itemHover } from '../../utils';

	type Props = DropdownMenu.ItemProps;
	const { children, ...props }: Props = $props();
</script>

<DropdownMenu.Item
	{...props}
	class={cn(
		'cursor-pointer px-4 py-2 outline-none',
		itemBase,
		itemHover,
		itemHighlighted,
		props.class
	)}
>
	{@render children?.()}
</DropdownMenu.Item>
