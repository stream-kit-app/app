<script lang="ts">
	import type { Snippet } from 'svelte';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';

	type Props = {
		href: string;
		class?: string;
		children?: Snippet;
	};

	let { href, class: className, children }: Props = $props();
</script>

<a
	{href}
	class={cn(
		'group/link -mx-1 inline-flex items-center gap-0.5 self-end rounded-md px-1 py-0.5 text-xs font-medium text-dark-300 transition-colors hover:text-dark-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
		className
	)}
>
	{@render children?.()}
	<Icon
		icon="ri:arrow-right-s-line"
		class="size-3.5 transition-transform group-hover/link:translate-x-0.5"
		aria-hidden="true"
	/>
</a>
