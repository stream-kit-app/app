<script lang="ts">
	import type { PageBlock } from '../types';

	import { Button } from '../../components/button';

	type Props = {
		block: Extract<PageBlock, { type: 'button' }>;
	};

	let { block }: Props = $props();
</script>

<div>
	<Button variant={block.variant ?? 'outline'} onclick={block.onClick}>
		{block.label}
	</Button>
</div>
