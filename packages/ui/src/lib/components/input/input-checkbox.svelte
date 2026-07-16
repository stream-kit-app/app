<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Checkbox, useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		inputFieldBorderError,
		inputFieldErrorMessage,
		inputToggleFocusRing
	} from './input-field-classes';
	import Label from './label.svelte';

	type Props = {
		label?: string;
		'aria-label'?: string;
		checked?: boolean;
		error?: string;
		id?: string;
		class?: string;
		/** Render as a single inline row without outer grid spacing. */
		inline?: boolean;
	};

	let {
		label,
		'aria-label': ariaLabel,
		checked = $bindable(false),
		error,
		id = useId(),
		class: className,
		inline = false
	}: Props = $props();

	const checkboxClass = $derived(
		cn(
			'peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none',
			'data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary',
			'data-[state=unchecked]:bg-dark-700',
			error
				? inputFieldBorderError
				: 'border-border data-[state=unchecked]:hover:border-dark-400',
			inputToggleFocusRing,
			'disabled:cursor-not-allowed disabled:opacity-50'
		)
	);
</script>

{#if inline}
	<div class={cn('flex items-center gap-2', className)}>
		<Checkbox.Root
			{id}
			bind:checked
			aria-label={ariaLabel}
			aria-labelledby={label ? `${id}-label` : undefined}
			aria-invalid={error ? true : undefined}
			class={checkboxClass}
		>
			{#snippet children({ checked })}
				{#if checked}
					<Icon icon="ri:check-line" class="size-3.5" />
				{/if}
			{/snippet}
		</Checkbox.Root>
		{#if label}
			<Label
				id="{id}-label"
				for={id}
				class="cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</Label>
		{/if}
	</div>
{:else}
	<div class={cn('grid gap-2', className)}>
		<div class="flex items-center gap-2">
			<Checkbox.Root
				{id}
				bind:checked
				aria-label={ariaLabel}
				aria-labelledby={label ? `${id}-label` : undefined}
				aria-invalid={error ? true : undefined}
				class={checkboxClass}
			>
				{#snippet children({ checked })}
					{#if checked}
						<Icon icon="ri:check-line" class="size-3.5" />
					{/if}
				{/snippet}
			</Checkbox.Root>
			{#if label}
				<Label
					id="{id}-label"
					for={id}
					class="cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</Label>
			{/if}
		</div>
		{#if error}
			<p class={inputFieldErrorMessage}>{error}</p>
		{/if}
	</div>
{/if}
