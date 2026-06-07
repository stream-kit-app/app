<script lang="ts">
	import { Switch, useId } from 'bits-ui';

	import { cn } from '$lib/utils';

	import Label from './label.svelte';

	type Props = {
		label?: string;
		checked?: boolean;
		error?: string;
		id?: string;
		class?: string;
	};

	let {
		label,
		checked = $bindable(false),
		error,
		id = useId(),
		class: className
	}: Props = $props();
</script>

<div class={cn('grid gap-2', className)}>
	<div class="flex items-center gap-3">
		<Switch.Root
			{id}
			bind:checked
			aria-labelledby={label ? `${id}-label` : undefined}
			aria-invalid={error ? true : undefined}
			class={cn(
				'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none',
				'data-[state=checked]:bg-primary',
				error
					? 'data-[state=unchecked]:bg-red-500/30'
					: 'data-[state=unchecked]:bg-dark-600',
				'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800',
				'disabled:cursor-not-allowed disabled:opacity-50'
			)}
		>
			<Switch.Thumb
				class="pointer-events-none block size-5 shrink-0 rounded-full bg-dark-50 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
			/>
		</Switch.Root>
		{#if label}
			<Label id="{id}-label" for={id} class="cursor-pointer">
				{label}
			</Label>
		{/if}
	</div>
	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}
</div>
