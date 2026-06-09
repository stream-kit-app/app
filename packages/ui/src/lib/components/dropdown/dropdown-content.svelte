<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { cn } from 'tailwind-variants';

	import { ScrollArea } from '../scroll-area';

	type Props = DropdownMenu.ContentProps;
	const { children, ...props }: Props = $props();
</script>

<DropdownMenu.Content
	{...props}
	class={cn(
		'min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md',
		'relative z-50 border border-dark-600'
	)}
	sideOffset={4}
>
	<ScrollArea orientation="vertical" viewportClasses="max-h-64 overflow-hidden">
		{@render children?.()}
	</ScrollArea>
</DropdownMenu.Content>
