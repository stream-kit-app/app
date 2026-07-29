<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	type Props = HTMLAttributes<HTMLParagraphElement> & {
		index?: string;
		children?: Snippet;
	};

	let { index, class: className, children, ...restProps }: Props = $props();
</script>

<p
	class={cn(
		'inline-flex items-center font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-muted-foreground uppercase',
		className
	)}
	{...restProps}
>
	{#if index}
		<span class="text-primary">{index}</span>
		<span class="mx-1.5 text-rule-strong">/</span>
	{/if}
	<span>{@render children?.()}</span>
</p>
