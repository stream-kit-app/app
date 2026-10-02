<script lang="ts">
	import type { SettingsContext } from '$lib/core/settings/context';
	import type {
		SettingsFieldDefinition,
		SettingsFieldInstance,
		SettingsFieldItem,
		SettingsFieldSectionDefinition,
		SettingsFieldValue
	} from '$lib/core/settings/field';
	import type { FormEventHandler } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	import { Alert } from '@stream-kit/ui/alert';
	import { Badge } from '@stream-kit/ui/badge';
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
		flattenSettingsFieldItems,
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
	/** Open state of collapsible sections the user toggled, keyed by section path. */
	const openSections = new SvelteMap<string, boolean>();
	/** `defaultOpen` resolved once per section, so typing doesn't open or close it. */
	const initialOpen = new Map<string, boolean>();

	function sectionHasError(section: SettingsFieldSectionDefinition): boolean {
		if (!getFieldError) {
			return false;
		}

		return flattenSettingsFieldItems(section.fields).some((definition) => {
			const field = getField(definition.key);

			return field ? Boolean(getFieldError(field.id)) : false;
		});
	}

	/** Settings buttons whose async `onClick` is still running. */
	const pendingButtons = new SvelteSet<string>();

	async function runButton(key: string, onClick: () => void | Promise<void>): Promise<void> {
		if (pendingButtons.has(key)) {
			return;
		}

		pendingButtons.add(key);

		try {
			await onClick();
		} finally {
			pendingButtons.delete(key);
		}
	}

	type SectionItemGroup =
		| { type: 'fields'; fields: SettingsFieldDefinition[] }
		| { type: 'section'; section: SettingsFieldSectionDefinition };

	/** Consecutive fields share one grid; sections render on their own. */
	function groupSectionItems(sectionItemsList: SettingsFieldItem[]): SectionItemGroup[] {
		const groups: SectionItemGroup[] = [];

		for (const item of sectionItemsList) {
			if (isSettingsFieldSection(item)) {
				groups.push({ type: 'section', section: item });
				continue;
			}

			const last = groups.at(-1);

			if (last?.type === 'fields') {
				last.fields.push(item);
			} else {
				groups.push({ type: 'fields', fields: [item] });
			}
		}

		return groups;
	}

	function isSectionOpen(section: SettingsFieldSectionDefinition, id: string): boolean {
		if (sectionHasError(section)) {
			return true;
		}

		const toggled = openSections.get(id);

		if (toggled !== undefined) {
			return toggled;
		}

		let initial = initialOpen.get(id);

		if (initial === undefined) {
			const { defaultOpen = false } = section;
			initial = typeof defaultOpen === 'function' ? defaultOpen(context) : defaultOpen;
			initialOpen.set(id, initial);
		}

		return initial;
	}

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
				{@const pending = pendingButtons.has(config.key)}
				<Button
					variant={config.variant ?? 'outline'}
					isLoading={pending}
					disabled={pending}
					aria-busy={pending}
					onclick={() => void runButton(config.key, () => config.onClick(context))}
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

{#snippet sectionHeader(section: SettingsFieldSectionDefinition, nested: boolean)}
	{@const badge = section.badge?.(context)}
	<span class="flex min-w-0 flex-1 items-start gap-3 text-left">
		{#if section.icon}
			<Icon
				icon={section.icon}
				class={cn('shrink-0 text-dark-300', nested ? 'mt-0.5 size-4' : 'mt-1 size-5')}
				aria-hidden="true"
			/>
		{/if}
		<span class="flex min-w-0 flex-1 flex-col gap-1">
			{#if section.title}
				{#if nested}
					<span class="text-sm font-semibold text-dark-100">{section.title}</span>
				{:else if section.collapsible}
					<!-- Headings aren't valid inside the toggle <button>. -->
					<span class="text-base font-semibold text-dark-50">{section.title}</span>
				{:else}
					<Heading level="3">{section.title}</Heading>
				{/if}
			{/if}
			{#if section.description}
				<span class="text-sm text-dark-100">{section.description}</span>
			{/if}
		</span>
		{#if badge}
			<Badge variant={badge.variant ?? 'outline'} size="sm" class="mt-1">{badge.label}</Badge>
		{/if}
	</span>
{/snippet}

{#snippet sectionItems(sectionItemsList: SettingsFieldItem[], parentId: string, nested: boolean)}
	{#each groupSectionItems(sectionItemsList) as group, index (group.type === 'section' ? `${parentId}/${group.section.title ?? `section-${index}`}` : `${parentId}/fields-${index}`)}
		{#if group.type === 'section'}
			{@render section(
				group.section,
				`${parentId}/${group.section.title ?? `section-${index}`}`,
				nested
			)}
		{:else}
			{@render fieldList(group.fields)}
		{/if}
	{/each}
{/snippet}

{#snippet section(item: SettingsFieldSectionDefinition, id: string, nested: boolean)}
	{#if item.collapsible}
		{@const open = isSectionOpen(item, id)}
		<section
			class={cn(
				'flex flex-col overflow-hidden rounded-xl border border-rule',
				nested ? 'bg-dark-900/30' : 'bg-dark-900/40'
			)}
		>
			<button
				type="button"
				class={cn(
					'flex w-full cursor-pointer items-start gap-3 text-left transition-colors hover:bg-dark-700/40',
					nested ? 'px-4 py-3' : 'px-5 py-4',
					open && 'border-b border-rule'
				)}
				aria-expanded={open}
				onclick={() => openSections.set(id, !open)}
			>
				<Icon
					icon="ri:arrow-down-s-line"
					class={cn(
						'mt-1 size-4 shrink-0 text-dark-400 transition-transform duration-200',
						!open && '-rotate-90'
					)}
					aria-hidden="true"
				/>
				{@render sectionHeader(item, nested)}
			</button>
			{#if open}
				<div
					class={cn(
						'flex animate-in flex-col gap-6 duration-200 fade-in slide-in-from-top-1',
						nested ? 'p-4' : 'p-5'
					)}
				>
					{@render sectionItems(item.fields, id, true)}
				</div>
			{/if}
		</section>
	{:else}
		<section class={cn('flex flex-col', nested ? 'gap-3' : 'gap-4')}>
			{#if item.title || item.description || item.icon}
				<header class="flex">
					{@render sectionHeader(item, nested)}
				</header>
			{/if}
			<div class="flex flex-col gap-4">
				{@render sectionItems(item.fields, id, true)}
			</div>
		</section>
	{/if}
{/snippet}

<div class={cn('flex flex-col gap-8', className)}>
	{@render sectionItems(visibleItems, 'root', false)}
</div>
