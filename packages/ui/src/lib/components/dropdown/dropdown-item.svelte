<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = DropdownMenu.ItemProps;
	const { children, ...props }: Props = $props();
</script>

<DropdownMenu.Item
	{...props}
	class={cn('cursor-pointer rounded-md px-4 py-2 outline-none hover:bg-dark-700', props.class)}
>
	{@render children?.()}
</DropdownMenu.Item>
