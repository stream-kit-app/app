<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = DropdownMenu.SubContentProps;
	const { children, class: className, ...props }: Props = $props();
</script>

<DropdownMenu.Portal>
	<DropdownMenu.SubContent
		{...props}
		class={cn(
			'z-[100] min-w-(--bits-floating-anchor-width) max-h-[min(30rem,var(--bits-menu-content-available-height,30rem))] overflow-y-auto overscroll-contain',
			'rounded-xl bg-dark-800 p-[5px] shadow-md',
			'border border-dark-600',
			className
		)}
		sideOffset={8}
	>
		{@render children?.()}
	</DropdownMenu.SubContent>
</DropdownMenu.Portal>
