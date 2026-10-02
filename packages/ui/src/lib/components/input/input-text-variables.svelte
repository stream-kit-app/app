<script lang="ts">
	import type { HandlerFieldVariable } from '../../types';
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements';

	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import {
		VariableAutocomplete,
		VariableAutocompletePopup,
		variableOptionId
	} from '../variable-autocomplete';

	import {
		inputFieldBorder,
		inputFieldDisabled,
		inputFieldErrorMessage,
		inputFieldFocusWithinRing,
		inputFieldSurface
	} from './input-field-classes';
	import { inputSizeClasses } from './input-size-classes';
	import Label from './label.svelte';

	type Props = {
		label?: string;
		variables?: HandlerFieldVariable[];
		value?: string;
		error?: string;
		oninput?: FormEventHandler<HTMLInputElement>;
	} & Omit<HTMLInputAttributes, 'value' | 'oninput'>;

	let {
		label,
		variables = [],
		value = $bindable(''),
		error,
		oninput,
		id = useId(),
		placeholder,
		class: className,
		...props
	}: Props = $props();

	const listboxId = $derived(`${id}-listbox`);

	const autocomplete = new VariableAutocomplete({
		variables: () => variables,
		onChange: (next) => (value = next)
	});
</script>

<div class={cn('relative grid w-full min-w-0 gap-2', className)}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div
		class={cn(
			'relative flex w-full min-w-0 items-center rounded-lg',
			inputFieldFocusWithinRing(error)
		)}
	>
		<input
			{@attach autocomplete.attach}
			{id}
			{placeholder}
			bind:value
			class={cn(
				'min-w-0 w-full truncate rounded-lg border outline-none',
				inputFieldSurface,
				inputFieldDisabled,
				inputSizeClasses.md,
				inputFieldBorder(error)
			)}
			role={variables.length > 0 ? 'combobox' : undefined}
			aria-invalid={error ? true : undefined}
			aria-autocomplete={variables.length > 0 ? 'list' : undefined}
			aria-expanded={variables.length > 0 ? autocomplete.isOpen : undefined}
			aria-controls={variables.length > 0 ? listboxId : undefined}
			aria-activedescendant={autocomplete.isOpen
				? variableOptionId(listboxId, autocomplete.highlightedIndex)
				: undefined}
			{oninput}
			{...props}
		/>
	</div>

	<VariableAutocompletePopup {autocomplete} id={listboxId} />

	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
