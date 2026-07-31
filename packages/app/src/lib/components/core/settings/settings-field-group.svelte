<script lang="ts">
	import type { SettingsContext } from '$lib/core/settings/context';
	import type {
		SettingsFieldDefinition,
		SettingsFieldInstance,
		SettingsFieldItem,
		SettingsFieldValue
	} from '$lib/core/settings/field';
	import type { FormEventHandler } from 'svelte/elements';

	import { Alert } from '@stream-kit/ui/alert';
	import { Button } from '@stream-kit/ui/button';
	import { Heading } from '@stream-kit/ui/heading';
	import {
		InputCheckbox,
		InputColor,
		InputFilePath,
		InputSelect,
		InputSlider,
		InputSwitch,
		InputText,
		InputTextSelect
	} from '@stream-kit/ui/input';

	import {
		hasCloudFileAccess,
		isLocalFilePath,
		pickCloudFileUrl,
		toDisplayCloudFileValue,
		toStoredCloudFileValue,
		uploadLocalFileToCloud,
		usesCloudFileStorage
	} from '$lib/components/core/user-files/cloud-file-actions';
	import { getApp } from '$lib/core/registry';
	import {
		filterVisibleFieldItems,
		isSettingsFieldSection,
		toSettingsSelectItemsSource
	} from '$lib/core/settings/settings-field';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import SelectValuesSettingsField from './select-values-settings-field.svelte';
	import TableSettingsField from './table-settings-field.svelte';

	type Props = {
		context: SettingsContext;
		items: SettingsFieldItem[];
		getField: (key: string) => SettingsFieldInstance | undefined;
		getFieldError?: (fieldId: string) => string | undefined;
		class?: string;
	};

	let { context, items, getField, getFieldError, class: className }: Props = $props();

	const { t } = useI18n();
	const app = getApp();
	const visibleItems = $derived(filterVisibleFieldItems(items, context));

	function updateField(field: SettingsFieldInstance, value: SettingsFieldValue): void {
		field.value = value;
	}

	const onTextInput =
		(field: SettingsFieldInstance): FormEventHandler<HTMLInputElement> =>
		(event) => {
			updateField(field, event.currentTarget.value);
		};
</script>

{#snippet fieldInput(config: SettingsFieldDefinition, field: SettingsFieldInstance, error?: string)}
	{#if config.type === 'text'}
		<InputText
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			type={config.inputType ?? 'text'}
			value={String(field.value ?? '')}
			{error}
			oninput={onTextInput(field)}
		/>
	{:else if config.type === 'checkbox'}
		<InputCheckbox
			label={config.name}
			bind:checked={() => Boolean(field.value), (value) => updateField(field, value)}
			{error}
		/>
	{:else if config.type === 'switch'}
		<InputSwitch
			label={config.name}
			bind:checked={() => Boolean(field.value), (value) => updateField(field, value)}
			{error}
		/>
	{:else if config.type === 'select'}
		<InputSelect
			type="single"
			label={config.name}
			items={toSettingsSelectItemsSource(config.items, context)}
			reloadKey={config.itemsReload ? () => config.itemsReload?.(context) : undefined}
			placeholder={config.placeholder}
			loadingPlaceholder={config.loadingPlaceholder}
			required={config.required}
			bind:value={() => String(field.value ?? ''), (value) => updateField(field, value)}
			{error}
		/>
	{:else if config.type === 'combobox'}
		<InputTextSelect
			label={config.name}
			items={toSettingsSelectItemsSource(config.items, context)}
			reloadKey={config.itemsReload ? () => config.itemsReload?.(context) : undefined}
			placeholder={config.placeholder}
			loadingPlaceholder={config.loadingPlaceholder}
			required={config.required}
			allowCustomValue={false}
			bind:value={() => String(field.value ?? ''), (value) => updateField(field, value)}
			{error}
		/>
	{:else if config.type === 'slider'}
		<InputSlider
			label={config.name}
			min={config.min}
			max={config.max}
			step={config.step ?? 1}
			unit={config.unit}
			bind:value={
				() => Number(field.value ?? config.defaultValue ?? config.min),
				(value) => updateField(field, value)
			}
			{error}
		/>
	{:else if config.type === 'color'}
		<InputColor
			label={config.name}
			defaultValue={typeof config.defaultValue === 'string' ? config.defaultValue : '#000000'}
			bind:value={
				() => String(field.value ?? config.defaultValue ?? ''),
				(value) => updateField(field, value)
			}
			{error}
		/>
	{:else if config.type === 'select-file-or-folder'}
		{@const cloudStorage = usesCloudFileStorage(config) && hasCloudFileAccess(app.auth)}
		{@const fileValue = String(field.value ?? '')}
		{@const hasLocalPath = cloudStorage && isLocalFilePath(fileValue)}
		{@const displayFileValue =
			cloudStorage || app.userFiles.isOfflineMirrorEnabled()
				? toDisplayCloudFileValue(app, fileValue)
				: fileValue}
		<InputFilePath
			label={config.name}
			placeholder={config.placeholder}
			required={config.required}
			mode={config.mode}
			filters={config.filters}
			value={displayFileValue}
			onValueChange={(value: string) => updateField(field, toStoredCloudFileValue(value))}
			browseLabel={t('Browse')}
			uploadLabel={hasLocalPath ? t('Upload to cloud') : t('Upload')}
			cloudLabel={t('Cloud')}
			emptyFileLabel={t('No file selected')}
			emptyFolderLabel={t('No folder selected')}
			onBrowse={() =>
				app.fs.select({
					type: config.mode,
					filters: config.filters
				})}
			onUpload={cloudStorage
				? () => uploadLocalFileToCloud(config.filters, fileValue)
				: undefined}
			onCloudBrowse={cloudStorage ? () => pickCloudFileUrl(config.filters) : undefined}
			{error}
		/>
	{/if}
{/snippet}

{#snippet fieldList(definitions: SettingsFieldDefinition[])}
	<div class="grid gap-4">
		{#each definitions as config (config.key)}
			{#if config.type === 'alert'}
				{@const variant = config.variant ?? 'default'}
				<Alert {variant} title={config.name} description={config.description} />
			{:else if config.type === 'button'}
				<Button
					variant={config.variant ?? 'outline'}
					onclick={() => void config.onClick(context)}
				>
					{config.name}
				</Button>
			{:else if config.type === 'select-values'}
				<SelectValuesSettingsField {config} {context} />
			{:else if config.type === 'table'}
				<TableSettingsField {config} {context} />
			{:else}
				{@const field = getField(config.key)}
				{#if field}
					{@render fieldInput(config, field, getFieldError?.(field.id))}
				{/if}
			{/if}
		{/each}
	</div>
{/snippet}

<div class={cn('flex flex-col gap-8', className)}>
	{#each visibleItems as item, index (isSettingsFieldSection(item) ? (item.title ?? `section-${index}`) : item.key)}
		{#if isSettingsFieldSection(item)}
			<section class="flex flex-col gap-4">
				{#if item.title || item.description}
					<header class="flex flex-col gap-1">
						{#if item.title}
							<Heading level="3">{item.title}</Heading>
						{/if}
						{#if item.description}
							<p class="text-sm text-dark-100">{item.description}</p>
						{/if}
					</header>
				{/if}
				{@render fieldList(item.fields)}
			</section>
		{:else}
			{@render fieldList([item])}
		{/if}
	{/each}
</div>
