<script lang="ts">
	import type { PageBlock } from '../types';

	type Props = {
		block: Extract<PageBlock, { type: 'text' }>;
	};

	let { block }: Props = $props();
</script>

<p class="max-w-3xl text-sm leading-6 text-dark-100">{block.text}</p>
