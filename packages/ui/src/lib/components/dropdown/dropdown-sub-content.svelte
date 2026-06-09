<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = DropdownMenu.SubContentProps;
	const { children, ...props }: Props = $props();
</script>

<DropdownMenu.SubContent
	{...props}
	class={cn(
		'min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md',
		'border border-dark-600',
		props.class
	)}
	sideOffset={12}
>
	{@render children?.()}
</DropdownMenu.SubContent>
