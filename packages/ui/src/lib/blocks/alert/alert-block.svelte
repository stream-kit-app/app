<script lang="ts">
	import type { PageBlock } from '../types';

	import { Alert } from '../../components/alert';

	type Props = {
		block: Extract<PageBlock, { type: 'alert' }>;
	};

	let { block }: Props = $props();
</script>

<Alert
	variant={block.variant ?? 'default'}
	title={block.title}
	description={block.description}
/>
