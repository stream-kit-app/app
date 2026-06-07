<script lang="ts">
	import type { Snippet } from 'svelte';

	import { DropdownMenu } from 'bits-ui';

	import { Button } from '../button';

	type Props = {
		trigger: Snippet<[{ props: Record<string, unknown> }]> | string;
	} & DropdownMenu.RootProps;

	const { children, trigger, ...props }: Props = $props();
</script>

<DropdownMenu.Root {...props}>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			{#if typeof trigger === 'string'}
				<Button {...props} variant="outline">
					{trigger}
				</Button>
			{:else}
				{@render trigger({ props })}
			{/if}
		{/snippet}
	</DropdownMenu.Trigger>
	{@render children?.()}
</DropdownMenu.Root>
