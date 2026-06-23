<script lang="ts">
	import { Command } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = Command.LoadingProps;

	const { children, class: className, ...props }: Props = $props();
</script>

<Command.Loading
	{...props}
	class={cn('flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300', className)}
>
	{@render children?.()}
</Command.Loading>
