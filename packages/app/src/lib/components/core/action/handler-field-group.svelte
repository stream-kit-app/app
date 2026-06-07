<script lang="ts">
	import type { HandlerFieldDefinition, HandlerFieldInstance } from '$lib/core/action/handler/field';
	import type {
		ActionHandler,
		HandlerFieldFormErrors
	} from '$lib/core/action/action-handler.svelte';
	import type { FormEventHandler } from 'svelte/elements';

	import {
		InputCheckbox,
		InputSelect,
		InputSwitch,
		InputText,
		InputTextVariables
	} from '$lib/components/ui/input';
	import { cn } from '$lib/utils';

	type Props = {
		handler: ActionHandler;
		fieldErrors?: HandlerFieldFormErrors;
	};

	let { handler, fieldErrors }: Props = $props();

	const onTextInput =
		(field: HandlerFieldInstance): FormEventHandler<HTMLInputElement> =>
		(event) => {
			field.value = event.currentTarget.value;
		};
</script>

{#snippet fieldInput(config: HandlerFieldDefinition, field: HandlerFieldInstance, error?: string)}
	{#if config.type === 'text'}
		{#if config.variables && config.variables.length > 0}
			<InputTextVariables
				label={config.name}
				placeholder={config.placeholder}
				required={config.required}
				variables={config.variables}
				bind:value={() => String(field.value ?? ''), (next) => (field.value = next)}
				{error}
			/>
		{:else}
			<InputText
				label={config.name}
				placeholder={config.placeholder}
				required={config.required}
				value={String(field.value ?? '')}
				{error}
				oninput={onTextInput(field)}
			/>
		{/if}
	{:else if config.type === 'checkbox'}
		<InputCheckbox
			label={config.name}
			bind:checked={() => Boolean(field.value), (value) => (field.value = value)}
			{error}
		/>
	{:else if config.type === 'switch'}
		<InputSwitch
			label={config.name}
			bind:checked={() => Boolean(field.value), (value) => (field.value = value)}
			{error}
		/>
	{:else if config.type === 'select'}
		<InputSelect
			type="single"
			label={config.name}
			items={config.items}
			placeholder={config.placeholder}
			loadingPlaceholder={config.loadingPlaceholder}
			required={config.required}
			bind:value={() => String(field.value ?? ''), (value) => (field.value = value)}
			{error}
		/>
	{/if}
{/snippet}

<div class={cn('grid gap-4')}>
	{#each handler.fieldDefinitions ?? [] as config (config.key)}
		{@const field = handler.getField(config.key)}
		{#if field}
			{@render fieldInput(config, field, handler.getFieldError(field.id, fieldErrors))}
		{/if}
	{/each}
</div>
