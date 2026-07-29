<script lang="ts">
	import { Command } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = Command.RootProps;

	const { children, class: className, ...props }: Props = $props();
</script>

<Command.Root
	{...props}
	class={cn(
		'flex w-full flex-col divide-y divide-dark-600 overflow-hidden rounded-none border border-dark-600 bg-dark-800 shadow-md',
		className
	)}
>
	{@render children?.()}
</Command.Root>
