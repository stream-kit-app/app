<script lang="ts">
	import type {
		ActionHandler,
		HandlerFieldFormErrors
	} from '$lib/core/action/action-handler.svelte';
	import type { Action } from '$lib/core/action/action.svelte';
	import type {
		HandlerFieldDefinition,
		HandlerFieldInstance,
		HandlerFieldScalarValue,
		HandlerFieldVariable,
		KeyValueEntry,
		OneOfFieldValue,
		ResolvedHandlerFieldDefinition,
		TextSelectTextFieldValue
	} from '$lib/core/action/handler/field';
	import type { SelectItemsSource } from '$lib/core/action/trigger/condition';
	import type { PluginAppApi } from '@stream-kit/plugin';
	import type { FormEventHandler } from 'svelte/elements';

	import { tooltip } from '@stream-kit/ui/attachments';
	import {
		InputCheckbox,
		InputCode,
		InputFilePath,
		InputHotkey,
		InputKeyValueList,
		InputSelect,
		InputSwitch,
		InputText,
		InputTextSelect,
		InputTextSelectText,
		InputTextVariables,
		InputOneOf,
		InputSlider
	} from '@stream-kit/ui/input';

	import HandlerSubFieldInput from './handler-sub-field-input.svelte';
	import ScriptCodeField from './script-code-field.svelte';

	import { CollectionContentPopover } from '$lib/components/core/collection';
	import { resolveApp } from './resolve-app';
	import { resolveTranslate, type TranslateFn } from './resolve-translate';
	import { cn } from '$lib/utils';

	type Props = {
		action?: Action;
		handler: ActionHandler;
		fieldErrors?: HandlerFieldFormErrors;
		contextVariables?: HandlerFieldVariable[];
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let {
		action,
		handler,
		fieldErrors,
		contextVariables = [],
		app: appProp,
		t: translateProp
	}: Props = $props();

	const app = $derived(resolveApp(appProp));
	const t = $derived(resolveTranslate(translateProp));

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

	function getTextSelectTextValue(field: HandlerFieldInstance): TextSelectTextFieldValue {
		const value = field.value;

		if (value && typeof value === 'object' && 'path' in value) {
			return value as TextSelectTextFieldValue;
		}

		return { path: '', type: 'equals', value: '', negate: false };
	}

	function setTextSelectTextValue(
		field: HandlerFieldInstance,
		next: { path: string; type: string; value: string }
	): void {
		const current = getTextSelectTextValue(field);
		field.value = { ...next, negate: current.negate };
	}

	function setTextSelectTextNegate(field: HandlerFieldInstance, negate: boolean): void {
		field.value = { ...getTextSelectTextValue(field), negate };
	}

	function resolveFieldVariables(
		config: Extract<HandlerFieldDefinition, { type: 'text' | 'text-select-text' | 'json' }>
	): HandlerFieldVariable[] {
		if ('useContextVariables' in config && config.useContextVariables) {
			return contextVariables;
		}

		return 'variables' in config ? (config.variables ?? []) : [];
	}

	function resolveHandlerSelectItems(
		config: Extract<HandlerFieldDefinition, { type: 'combobox' }>
	): SelectItemsSource {
		if (!config.items) {
			return [];
		}

		const { items } = config;

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
		config: Extract<HandlerFieldDefinition, { type: 'combobox' }>
	): (() => unknown) | undefined {
		if (!config.itemsReloadFromField) {
			return undefined;
		}

		const fieldKey = config.itemsReloadFromField;

		return () => handler.getField(fieldKey)?.value;
	}
	function isExistingCollectionNameField(config: ResolvedHandlerFieldDefinition): boolean {
		return (
			config.type === 'combobox' &&
			config.key === 'collection-name' &&
			config.allowCustomValue === false
		);
	}

	function getOneOfValue(field: HandlerFieldInstance): OneOfFieldValue {
		const value = field.value;

		if (value && typeof value === 'object' && 'variant' in value && 'values' in value) {
			return value as OneOfFieldValue;
		}

		return { variant: '', values: {} };
	}

	function setOneOfValue(field: HandlerFieldInstance, next: OneOfFieldValue): void {
		field.value = next;
	}
</script>

{#snippet fieldInput(config: ResolvedHandlerFieldDefinition, field: HandlerFieldInstance, error?: string)}
	{#if config.type === 'text'}
		{#if (config.variables && config.variables.length > 0) || config.useContextVariables}
			<InputTextVariables
				label={config.name}
				placeholder={config.placeholder}
				required={config.required}
				variables={resolveFieldVariables(config)}
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
	{:else if config.type === 'hotkey'}
		<InputHotkey
			label={config.name}
			placeholder={config.placeholder ?? t('Click and press keys…')}
			required={config.required}
			captureLabel={t('Press shortcut…')}
			emptyLabel={t('Not set')}
			bind:value={() => String(field.value ?? ''), (value) => (field.value = value)}
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
			bind:value={() => String(field.value ?? ''), (value) => (field.value = value)}
			{error}
		/>
	{:else if config.type === 'combobox'}
		{#if isExistingCollectionNameField(config)}
			<div class="flex items-end gap-2">
				<div class="min-w-0 flex-1">
					<InputTextSelect
						label={config.name}
						items={resolveHandlerSelectItems(config)}
						placeholder={config.placeholder}
						loadingPlaceholder={config.loadingPlaceholder}
						allowCustomValue={config.allowCustomValue ?? true}
						reloadKey={getItemsReloadKey(config)}
						required={config.required}
						bind:value={() => String(field.value ?? ''), (value) => (field.value = value)}
						{error}
					/>
				</div>
				<CollectionContentPopover collectionName={String(field.value ?? '')} {app} {t} />
			</div>
		{:else}
			<InputTextSelect
				label={config.name}
				items={resolveHandlerSelectItems(config)}
				placeholder={config.placeholder}
				loadingPlaceholder={config.loadingPlaceholder}
				allowCustomValue={config.allowCustomValue ?? true}
				reloadKey={getItemsReloadKey(config)}
				required={config.required}
				bind:value={() => String(field.value ?? ''), (value) => (field.value = value)}
				{error}
			/>
		{/if}
	{:else if config.type === 'select-file-or-folder'}
		<InputFilePath
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			mode={config.mode}
			filters={config.filters}
			value={String(field.value ?? '')}
			onValueChange={(value: string) => (field.value = value)}
			browseLabel={t('Browse')}
			emptyFileLabel={t('No file selected')}
			emptyFolderLabel={t('No folder selected')}
			onBrowse={() =>
				app.fs.select({
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
			bind:entries={
				() => getKeyValueEntries(field), (entries) => setKeyValueEntries(field, entries)
			}
			addLabel={t('Add')}
			removeLabel={t('Remove')}
			{error}
		/>
	{:else if config.type === 'code'}
		<ScriptCodeField
			{action}
			{handler}
			{field}
			{contextVariables}
			{app}
			{t}
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			language={config.language}
			oninput={onCodeInput(field)}
			{error}
		/>
	{:else if config.type === 'json'}
		<InputCode
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			language="json"
			minHeight="8rem"
			value={String(field.value ?? '')}
			oninput={onCodeInput(field)}
			variables={resolveFieldVariables(config)}
			variablesTitle={t('Variables')}
			variablesAriaLabel={t('Insert variable')}
			formatLabel={t('Format')}
			expandLabel={t('Expand')}
			collapseLabel={t('Close')}
			loadingLabel={t('Loading editor...')}
			{error}
		/>
	{:else if config.type === 'text-select-text'}
		{#if config.allowNegate}
			<InputTextSelectText
				items={config.items}
				pathPlaceholder={config.pathPlaceholder}
				valuePlaceholder={config.valuePlaceholder}
				valuelessOperators={config.valuelessOperators}
				variables={resolveFieldVariables(config)}
				selectClass="w-32"
				contentProps={{ align: 'start' }}
				bind:value={
					() => getTextSelectTextValue(field),
					(next) => setTextSelectTextValue(field, next)
				}
				{error}
			>
				{#snippet suffix()}
					<span
						{@attach tooltip(
							t('Negate this condition. Enable to reverse: Passes if NOT matched.')
						)}
					>
						<InputCheckbox
							inline
							label={t('Not')}
							bind:checked={
								() => getTextSelectTextValue(field).negate ?? false,
								(value) => setTextSelectTextNegate(field, value)
							}
						/>
					</span>
				{/snippet}
			</InputTextSelectText>
		{:else}
			<InputTextSelectText
				label={config.name}
				items={config.items}
				pathPlaceholder={config.pathPlaceholder}
				valuePlaceholder={config.valuePlaceholder}
				valuelessOperators={config.valuelessOperators}
				variables={resolveFieldVariables(config)}
				selectClass="w-32"
				contentProps={{ align: 'start' }}
				bind:value={
					() => getTextSelectTextValue(field),
					(next) => setTextSelectTextValue(field, next)
				}
				{error}
			/>
		{/if}
{:else if config.type === 'one-of'}
	<InputOneOf
		label={config.name}
		required={config.required}
		error={error}
		variants={config.variants.map((variant) => ({ id: variant.id, label: variant.label }))}
		bind:value={() => getOneOfValue(field), (next) => setOneOfValue(field, next as OneOfFieldValue)}
	>
		{#snippet panel({ variantId, value, setValue })}
			{@const activeVariant = config.variants.find((variant) => variant.id === variantId)}
			{#if activeVariant}
				<HandlerSubFieldInput
					{handler}
					config={activeVariant.field}
					value={value as HandlerFieldScalarValue}
					{error}
					{contextVariables}
					{app}
					{t}
					onValueChange={(next) => setValue(next)}
				/>
			{/if}
		{/snippet}
	</InputOneOf>
{:else if config.type === 'slider'}
	<InputSlider
		label={config.name}
		min={config.min}
		max={config.max}
		step={config.step ?? 1}
		bind:value={
			() => Number(field.value ?? config.defaultValue ?? config.min),
			(value) => (field.value = value)
		}
		{error}
	/>
{/if}
{/snippet}

<div class={cn('grid min-w-0 gap-4')}>
	{#each handler.fieldDefinitions ?? [] as config (config.key)}
		{@const field = handler.getField(config.key)}
		{#if field}
			{@render fieldInput(config, field, handler.getFieldError(field.id, fieldErrors))}
		{/if}
	{/each}
</div>
