<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		label?: string;
		title: string;
		align?: 'center' | 'start';
		/** Render the title as `h1` (page intros) instead of `h2` (sections). */
		as?: 'h1' | 'h2';
		class?: string;
		children?: Snippet;
	};

	let { label, title, align = 'center', as = 'h2', class: className, children }: Props = $props();
</script>

<div
	class={[
		'flex max-w-2xl flex-col gap-4',
		align === 'center' ? 'mx-auto items-center text-center' : 'items-start',
		className
	]}
>
	{#if label}
		<p class="text-sm font-medium text-primary">{label}</p>
	{/if}
	<svelte:element
		this={as}
		class="font-outfit text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl"
	>
		{title}
	</svelte:element>
	{#if children}
		<p class="text-lg text-balance text-muted-foreground">
			{@render children()}
		</p>
	{/if}
</div>
