<script lang="ts">
	import { Command } from 'bits-ui';

	import { cn } from '../../utils';
	import { inputSizeClasses } from '../input/input-size-classes';

	type Props = Command.InputProps;

	let { value = $bindable(''), class: className, ...props }: Props = $props();
</script>

<Command.Input
	{...props}
	bind:value
	class={cn(
		'w-full border-0 bg-dark-800 text-dark-50 outline-none placeholder:text-dark-300',
		'border-b border-dark-600 px-4 py-3',
		className
	)}
/>
