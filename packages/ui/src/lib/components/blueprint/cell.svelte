<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
		href?: string;
	};

	let { href, class: className, children, ...restProps }: Props = $props();

	const cellClass = $derived(
		cn(
			'border-r border-b border-rule bg-background p-6 transition-colors',
			href && 'block cursor-pointer hover:bg-dark-900/80',
			className
		)
	);
</script>

{#if href}
	<a {href} class={cellClass} {...restProps as HTMLAttributes<HTMLAnchorElement>}>
		{@render children?.()}
	</a>
{:else}
	<div class={cellClass} {...restProps}>
		{@render children?.()}
	</div>
{/if}
