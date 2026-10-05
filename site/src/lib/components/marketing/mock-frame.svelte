<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet;
	};

	let { class: className, children }: Props = $props();
</script>

<!-- Decorative product illustration; hidden from assistive tech. -->
<div
	class={[
		'pointer-events-none overflow-hidden rounded-xl border border-rule bg-surface text-left shadow-2xl shadow-black/40 select-none',
		className
	]}
	aria-hidden="true"
>
	{@render children()}
</div>
