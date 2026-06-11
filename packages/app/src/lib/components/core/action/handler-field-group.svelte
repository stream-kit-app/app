<script lang="ts">
	import type {
		ActionHandler,
		HandlerFieldFormErrors
	} from '$lib/core/action/action-handler.svelte';
	import type {
		HandlerFieldDefinition,
		HandlerFieldInstance,
		KeyValueEntry
	} from '$lib/core/action/handler/field';
	import type { FormEventHandler } from 'svelte/elements';

	import {
		InputCheckbox,
		InputCode,
		InputFilePath,
		InputKeyValueList,
		InputSelect,
		InputSwitch,
		InputText,
		InputTextVariables
	} from '@stream-kit/ui/input';

	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { configureScriptApiTypes } from '$lib/monaco/script-setup';
	import { cn } from '$lib/utils';

	type Props = {
		handler: ActionHandler;
		fieldErrors?: HandlerFieldFormErrors;
	};

	let { handler, fieldErrors }: Props = $props();

	const { t } = useI18n();

	const onTextInput =
		(field: HandlerFieldInstance): FormEventHandler<HTMLInputElement> =>
		(event) => {
			field.value = event.currentTarget.value;
		};

	const onCodeInput =
		(field: HandlerFieldInstance): FormEventHandler<HTMLTextAreaElement> =>
		(event) => {
			field.value = event.currentTarget.value;
		};

	function getKeyValueEntries(field: HandlerFieldInstance): KeyValueEntry[] {
		return Array.isArray(field.value) ? field.value : [];
	}

	function setKeyValueEntries(field: HandlerFieldInstance, entries: KeyValueEntry[]): void {
		field.value = entries;
	}
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
	{:else if config.type === 'select-file-or-folder'}
		<InputFilePath
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			mode={config.mode}
			filters={config.filters}
			value={String(field.value ?? '')}
			onValueChange={(value) => (field.value = value)}
			browseLabel={t('Browse')}
			emptyFileLabel={t('No file selected')}
			emptyFolderLabel={t('No folder selected')}
			onBrowse={() =>
				getApp().fs.select({
					type: config.mode,
					filters: config.filters
				})}
			{error}
		/>
	{:else if config.type === 'key-value-list'}
		<InputKeyValueList
			label={config.name}
			keyPlaceholder={config.keyPlaceholder}
			valuePlaceholder={config.valuePlaceholder}
			bind:entries={() => getKeyValueEntries(field), (entries) => setKeyValueEntries(field, entries)}
			addLabel={t('Add')}
			removeLabel={t('Remove')}
			{error}
		/>
	{:else if config.type === 'code'}
		<InputCode
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			language={config.language}
			value={String(field.value ?? '')}
			oninput={onCodeInput(field)}
			configureMonaco={configureScriptApiTypes}
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
