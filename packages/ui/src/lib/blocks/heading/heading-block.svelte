<script lang="ts">
	import type { PageBlock } from '../types';

	import { Heading } from '../../components/heading';

	type Props = {
		block: Extract<PageBlock, { type: 'heading' }>;
	};

	let { block }: Props = $props();
</script>

<Heading level={block.level ?? 2} subTitle={block.subtitle}>{block.title}</Heading>
