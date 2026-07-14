<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = DropdownMenu.ContentProps;
	const { children, class: className, ...props }: Props = $props();
</script>

<DropdownMenu.Portal>
	<DropdownMenu.Content
		{...props}
		class={cn(
			'z-50 max-h-[min(30rem,var(--bits-menu-content-available-height,30rem))] min-w-(--bits-floating-anchor-width) overflow-y-auto overscroll-contain',
			'rounded-xl bg-dark-800 p-[5px] shadow-md',
			'border border-dark-600',
			className
		)}
		sideOffset={4}
	>
		{@render children?.()}
	</DropdownMenu.Content>
</DropdownMenu.Portal>
