<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	type Props = DropdownMenu.SubProps;
	const { children, ...props }: Props = $props();
</script>

<DropdownMenu.Sub {...props}>
	{@render children?.()}
</DropdownMenu.Sub>
