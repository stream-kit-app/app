<script lang="ts">
	import type { CellGridCols } from './cell-grid-variants';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	import { cellGridVariants } from './cell-grid-variants';

	type Props = HTMLAttributes<HTMLDivElement> & {
		cols?: CellGridCols;
		children?: Snippet;
	};

	let { cols = 2, class: className, children, ...restProps }: Props = $props();
</script>

<div class={cn(cellGridVariants({ cols }), className)} {...restProps}>
	{@render children?.()}
</div>
