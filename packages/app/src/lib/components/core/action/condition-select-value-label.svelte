<script lang="ts">
	import type { SelectItemsSource } from '$lib/core/action/trigger/condition';

	import { resolveSelectItems } from '@stream-kit/ui/input';

	import { cn } from '$lib/utils';

	type Props = {
		items: SelectItemsSource;
		value: string;
		class?: string;
	};

	let { items, value, class: className }: Props = $props();

	const resolvedItems = resolveSelectItems(() => items);

	const selectedLabel = $derived.by(() => {
		if (!value) {
			return null;
		}

		return resolvedItems.items.find((item) => item.value === value)?.label ?? null;
	});
</script>

{#if value && selectedLabel}
	<span class={cn('min-w-0 flex-1 truncate text-dark-300', className)}>{selectedLabel}</span>
{/if}
