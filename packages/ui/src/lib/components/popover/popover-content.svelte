<script lang="ts">
	import { Popover } from 'bits-ui';

	import { cn } from '../../utils';
	import { ScrollArea } from '../scroll-area';

	type Props = Popover.ContentProps;

	const { children, class: className, ...props }: Props = $props();
</script>

<Popover.Content
	{...props}
	class={cn(
		'z-[100] w-72 rounded-xl border border-dark-600 bg-dark-800 p-3 shadow-md outline-none',
		className
	)}
	sideOffset={4}
>
	<ScrollArea orientation="vertical" viewportClasses="max-h-64 overflow-hidden">
		{@render children?.()}
	</ScrollArea>
</Popover.Content>
