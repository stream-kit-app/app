<script lang="ts">
	import type { PageBlock } from '../types';

	import { Badge } from '../../components/badge';

	type Props = {
		block: Extract<PageBlock, { type: 'badge' }>;
	};

	let { block }: Props = $props();
</script>

<Badge variant={block.variant ?? 'default'}>{block.label}</Badge>
