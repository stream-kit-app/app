<script lang="ts">
	import { Command } from 'bits-ui';

	import { cn, itemBase } from '../../utils';

	type Props = Command.ItemProps;

	const { children, class: className, ...props }: Props = $props();
</script>

<Command.Item
	{...props}
	class={cn(
		'flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-dark-50 outline-none select-none',
		itemBase,
		'data-disabled:cursor-default data-disabled:opacity-50 data-selected:bg-dark-700',
		className
	)}
>
	{@render children?.()}
</Command.Item>
