<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	import { cn } from '../../utils';
	import { ScrollArea } from '../scroll-area';

	type Props = DropdownMenu.ContentProps;
	const { children, class: className, ...props }: Props = $props();
</script>

<DropdownMenu.Portal>
	<DropdownMenu.Content
		{...props}
		class={cn(
			'z-[100] min-w-(--bits-floating-anchor-width)',
			'rounded-xl bg-dark-800 p-[5px] shadow-lg',
			'border border-dark-600',
			className
		)}
		sideOffset={4}
	>
		<ScrollArea
			orientation="vertical"
			viewportClasses="max-h-(--bits-dropdown-menu-content-available-height) overflow-hidden"
		>
			{@render children?.()}
		</ScrollArea>
	</DropdownMenu.Content>
</DropdownMenu.Portal>
