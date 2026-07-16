<script lang="ts">
	import { Label } from 'bits-ui';

	import { cn } from '../../utils';

	let { children, ...props }: Label.RootProps = $props();
</script>

<Label.Root
	{children}
	{...props}
	class={cn('text-sm font-medium text-muted-foreground', props.class)}
/>
