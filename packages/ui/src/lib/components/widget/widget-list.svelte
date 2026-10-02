<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	type Props = {
		class?: string;
		children?: Snippet;
	};

	let { class: className, children }: Props = $props();
</script>

<!-- Negative inset so row text lines up with the widget header while hover bleeds to the edge. -->
<div class={cn('-mx-2 flex flex-col gap-0.5', className)}>
	{@render children?.()}
</div>
