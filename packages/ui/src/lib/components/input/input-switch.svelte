<script lang="ts">
	import { Switch, useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		inputFieldBorderError,
		inputFieldErrorMessage,
		inputToggleFocusRing
	} from './input-field-classes';
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
				'inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-none border p-[2px] transition-colors outline-none',
				'data-[state=checked]:border-primary data-[state=checked]:bg-primary/15',
				error
					? cn(inputFieldBorderError, 'data-[state=unchecked]:bg-destructive/15')
					: 'data-[state=unchecked]:border-border data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-dark-400',
				inputToggleFocusRing,
				'disabled:cursor-not-allowed disabled:opacity-50'
			)}
		>
			<Switch.Thumb
				class={cn(
					'pointer-events-none block size-4 shrink-0 rounded-none transition-transform',
					'data-[state=checked]:translate-x-[19px] data-[state=unchecked]:-translate-x-[1px]',
					'data-[state=unchecked]:bg-dark-400',
					'data-[state=checked]:bg-primary'
				)}
			/>
		</Switch.Root>
		{#if label}
			<Label id="{id}-label" for={id} class="cursor-pointer">
				{label}
			</Label>
		{/if}
	</div>
	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
