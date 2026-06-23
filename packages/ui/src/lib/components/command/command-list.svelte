<script lang="ts">
	import { Command } from 'bits-ui';

	import { ScrollArea } from '../scroll-area';
	import { cn } from '../../utils';

	type Props = Command.ListProps;

	let { children, id, class: className, ...props }: Props = $props();
</script>

<Command.List {id} {...props} class={cn('px-2 pb-2', className)}>
	<ScrollArea orientation="vertical" viewportClasses="max-h-80 overflow-hidden">
		{@render children?.()}
	</ScrollArea>
</Command.List>
