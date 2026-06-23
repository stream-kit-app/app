<script lang="ts">
	import { Command } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = Command.EmptyProps;

	const { children, class: className, ...props }: Props = $props();
</script>

<Command.Empty
	{...props}
	class={cn('flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300', className)}
>
	{@render children?.()}
</Command.Empty>
