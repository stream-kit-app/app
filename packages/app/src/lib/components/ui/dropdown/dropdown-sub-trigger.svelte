<script lang="ts">
	import Icon from '@iconify/svelte';
	import { DropdownMenu } from 'bits-ui';

	import { cn } from '$lib/utils';

	type Props = DropdownMenu.SubTriggerProps;
	const { children, ...props }: Props = $props();
</script>

<DropdownMenu.SubTrigger
	{...props}
	class={cn(
		'flex cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 outline-none hover:bg-dark-700',
		'data-[state=open]:bg-dark-700',
		props.class
	)}
>
	{@render children?.()}
	<Icon icon="ri:arrow-right-s-line" />
</DropdownMenu.SubTrigger>
