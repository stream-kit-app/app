<script lang="ts">
	import { Dialog } from 'bits-ui';

	import { cn } from '../../utils';

	type Props = Dialog.ContentProps;

	const { children, class: className, ...props }: Props = $props();
</script>

<Dialog.Content
	{...props}
	class={cn(
		'fixed top-1/2 left-1/2 z-50 w-full max-w-[94%] origin-center -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-[490px]',
		'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
		'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
		className
	)}
>
	{@render children?.()}
</Dialog.Content>
