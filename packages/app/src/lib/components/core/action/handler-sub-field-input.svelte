<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	import {
		InputCheckbox,
		InputCode,
		InputFilePath,
		InputSelect,
		InputSwitch,
		InputText,
		InputTextSelect,
		InputTextVariables
	} from '@stream-kit/ui/input';

	import type {
		HandlerFieldScalarValue,
		HandlerFieldVariable,
		HandlerOneOfInnerFieldDefinition
	} from '$lib/core/action/handler/field';
	import type { SelectItemsSource } from '$lib/core/action/trigger/condition';
	import type { ActionHandler } from '$lib/core/action/action-handler.svelte';
	import { getApp } from '$lib/core/registry';
	import { useI18n } from '$lib/i18n';
	import { buildScriptLspWorkspace } from '$lib/codemirror/script-lsp-workspace';

	type Props = {
		handler: ActionHandler;
		config: HandlerOneOfInnerFieldDefinition;
		value: HandlerFieldScalarValue | undefined;
		error?: string;
		contextVariables?: HandlerFieldVariable[];
		onValueChange: (value: HandlerFieldScalarValue) => void;
	};

	let { handler, config, value, error, contextVariables = [], onValueChange }: Props = $props();

	const { t } = useI18n();

	const scalarValue = $derived(value);

	const onTextInput =
		(): FormEventHandler<HTMLInputElement> =>
		(event) => {
			onValueChange(event.currentTarget.value);
		};

	const onCodeInput =
		(): FormEventHandler<HTMLTextAreaElement> =>
		(event) => {
			onValueChange(event.currentTarget.value);
		};

	function resolveFieldVariables(
		fieldConfig: Extract<HandlerOneOfInnerFieldDefinition, { type: 'text' }>
	): HandlerFieldVariable[] {
		if ('useContextVariables' in fieldConfig && fieldConfig.useContextVariables) {
			return contextVariables;
		}

		return 'variables' in fieldConfig ? (fieldConfig.variables ?? []) : [];
	}

	function resolveHandlerSelectItems(
		fieldConfig: Extract<HandlerOneOfInnerFieldDefinition, { type: 'combobox' }>
	): SelectItemsSource {
		if (!fieldConfig.items) {
			return [];
		}

		const { items } = fieldConfig;

		if (typeof items !== 'function') {
			return items;
		}

		return () => {
			const context = {
				getFieldValue: (key: string) => handler.getField(key)?.value
			};

			return items(context);
		};
	}

	function getItemsReloadKey(
		fieldConfig: Extract<HandlerOneOfInnerFieldDefinition, { type: 'combobox' }>
	): (() => unknown) | undefined {
		if (!fieldConfig.itemsReloadFromField) {
			return undefined;
		}

		const fieldKey = fieldConfig.itemsReloadFromField;

		return () => handler.getField(fieldKey)?.value;
	}
</script>

{#if config.type === 'text'}
	{#if (config.variables && config.variables.length > 0) || config.useContextVariables}
		<InputTextVariables
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			variables={resolveFieldVariables(config)}
			bind:value={() => String(scalarValue ?? ''), (next) => onValueChange(next)}
			{error}
		/>
	{:else}
		<InputText
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			value={String(scalarValue ?? '')}
			{error}
			oninput={onTextInput()}
		/>
	{/if}
{:else if config.type === 'checkbox'}
	<InputCheckbox
		label={config.name}
		bind:checked={() => Boolean(scalarValue), (next) => onValueChange(next)}
		{error}
	/>
{:else if config.type === 'switch'}
	<InputSwitch
		label={config.name}
		bind:checked={() => Boolean(scalarValue), (next) => onValueChange(next)}
		{error}
	/>
{:else if config.type === 'select'}
	<InputSelect
		type="single"
		label={config.name}
		items={config.items}
		placeholder={config.placeholder}
		loadingPlaceholder={config.loadingPlaceholder}
		searchPlaceholder={t('Search ...')}
		noResultsLabel={t('No matches found')}
		required={config.required}
		bind:value={() => String(scalarValue ?? ''), (next) => onValueChange(next)}
		{error}
	/>
{:else if config.type === 'combobox'}
	<InputTextSelect
		label={config.name}
		items={resolveHandlerSelectItems(config)}
		placeholder={config.placeholder}
		loadingPlaceholder={config.loadingPlaceholder}
		allowCustomValue={config.allowCustomValue ?? true}
		reloadKey={getItemsReloadKey(config)}
		required={config.required}
		bind:value={() => String(scalarValue ?? ''), (next) => onValueChange(next)}
		{error}
	/>
{:else if config.type === 'select-file-or-folder'}
	<InputFilePath
		label={config.name}
		placeholder={config.placeholder}
		required={config.required}
		mode={config.mode}
		filters={config.filters}
		value={String(scalarValue ?? '')}
		onValueChange={(next) => onValueChange(next)}
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
{:else if config.type === 'code'}
	<InputCode
		label={config.name}
		placeholder={config.placeholder}
		required={config.required}
		language={config.language}
		value={String(scalarValue ?? '')}
		oninput={onCodeInput()}
		languageServer={buildScriptLspWorkspace(String(scalarValue ?? ''))}
		variables={contextVariables}
		variablesTitle={t('Variables')}
		variablesAriaLabel={t('Insert variable')}
		{error}
	/>
{/if}
