<script lang="ts">
	import type { CrosshairPosition, CrosshairSize } from './crosshair-variants';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '../../utils';

	import { crosshairVariants } from './crosshair-variants';

	type Props = HTMLAttributes<HTMLSpanElement> & {
		size?: CrosshairSize;
		position?: CrosshairPosition;
	};

	let {
		size = 'md',
		position = 'top-left',
		class: className,
		...restProps
	}: Props = $props();
</script>

<span
	aria-hidden="true"
	class={cn(crosshairVariants({ size, position }), className)}
	{...restProps}
>+</span>
