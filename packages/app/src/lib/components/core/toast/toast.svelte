<script lang="ts">
	import type { Toast } from '$lib/core/toast';

	import { fly } from 'svelte/transition';

	import { cn } from '$lib/utils';

	import ToastItem from './toast-item.svelte';
	import { toastVariants } from './toast-variants';

	type Props = {
		toast: Toast;
	};

	const { toast }: Props = $props();
</script>

<div
	class="pointer-events-none fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2"
	aria-live="polite"
	aria-relevant="additions"
>
	{#each toast.entries.values() as item (item.id)}
		<div
			in:fly={{ x: 16, duration: 100 }}
			out:fly={{ x: 16, duration: 100 }}
			class={cn(toastVariants({ variant: item.variant }))}
			role="status"
			aria-live="polite"
		>
			<ToastItem {item} onDismiss={() => toast.dismiss(item.id)} />
		</div>
	{/each}
</div>
