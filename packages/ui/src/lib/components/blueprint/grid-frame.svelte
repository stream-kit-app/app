<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	import { cn } from '../../utils';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
		size?: 'md' | 'lg' | 'xl';
	};

	let { size = 'lg', class: className, children, ...restProps }: Props = $props();

	const frameClass = $derived(
		cn(
			'relative mx-auto w-full',
			size === 'md' && 'max-w-5xl',
			size === 'lg' && 'max-w-7xl',
			size === 'xl' && 'max-w-[90rem]'
		)
	);
</script>

<div class={cn('relative isolate min-h-screen w-full overflow-x-hidden bg-background', className)} {...restProps}>
	<div class={frameClass}>
		<!-- Hatched gutters outside the rails (full viewport bleed via absolute) -->
		<div
			aria-hidden="true"
			class="blueprint-hatch pointer-events-none absolute inset-y-0 right-full w-screen opacity-40"
		></div>
		<div
			aria-hidden="true"
			class="blueprint-hatch pointer-events-none absolute inset-y-0 left-full w-screen opacity-40"
		></div>

		<!-- Vertical rails -->
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-y-0 left-0 z-10 w-px bg-rule"
		></div>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-y-0 right-0 z-10 w-px bg-rule"
		></div>

		{@render children?.()}
	</div>
</div>
