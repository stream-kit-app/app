<script lang="ts">
	import type { PluginPageFormItem } from '$lib/core/plugins';
	import type { RegisteredPlugin } from '$lib/core/plugins/registered-plugin.svelte';
	import type { SettingsContext, SettingsFieldInstance, SettingsFieldItem } from '$lib/core/settings';

	import SettingsFieldGroup from '$lib/components/core/settings/settings-field-group.svelte';
	import { app } from '$lib/core';
	import {
		createSettingsFields,
		flattenSettingsFieldItems,
		isPersistedSettingsField
	} from '$lib/core/settings/settings-field';
	import { validateSettingsFields, type SettingsFormErrors } from '$lib/core/settings/validate-settings';
	import { useI18n } from '$lib/i18n';
	import { Button } from '@stream-kit/ui/button';
	import { Heading } from '@stream-kit/ui/heading';

	type Props = {
		plugin: RegisteredPlugin;
		formKey: string;
		title?: string;
		description?: string;
		fields: PluginPageFormItem[];
		submitLabel?: string;
		successMessage?: string;
	};

	let {
		plugin,
		formKey: _formKey,
		title,
		description,
		fields,
		submitLabel,
		successMessage
	}: Props = $props();
	const { t } = useI18n();

	const fieldItems = $derived(fields as SettingsFieldItem[]);
	let fieldInstances = $state<SettingsFieldInstance[]>([]);
	let formErrors = $state<SettingsFormErrors | null>(null);
	let isLoading = $state(true);
	let isSaving = $state(false);

	const context = $derived.by<SettingsContext>(() => {
		for (const field of fieldInstances) {
			void field.value;
		}

		const pluginContext = plugin.createContext(app);

		return {
			app,
			settings: pluginContext.store,
			getValue: (key) => fieldInstances.find((field) => field.key === key)?.value
		};
	});

	$effect(() => {
		void loadFields(fieldItems);
	});

	async function loadFields(items: SettingsFieldItem[]): Promise<void> {
		isLoading = true;
		const stored: SettingsFieldInstance[] = [];
		const pluginContext = plugin.createContext(app);

		for (const definition of flattenSettingsFieldItems(items).filter(isPersistedSettingsField)) {
			const value = await pluginContext.store.get<SettingsFieldInstance['value']>(definition.key);

			if (value !== undefined && value !== null) {
				stored.push({
					id: crypto.randomUUID(),
					key: definition.key,
					value
				});
			}
		}

		fieldInstances = createSettingsFields(items, stored);
		isLoading = false;
	}

	function getField(key: string): SettingsFieldInstance | undefined {
		return fieldInstances.find((field) => field.key === key);
	}

	function getFieldError(fieldId: string): string | undefined {
		return formErrors?.fieldErrors[fieldId];
	}

	async function saveFields(): Promise<void> {
		if (isLoading || isSaving) {
			return;
		}

		formErrors = validateSettingsFields(fieldInstances, fieldItems, context);

		if (formErrors) {
			return;
		}

		isSaving = true;

		try {
			await plugin.saveFieldInstances(app, fieldInstances);

			app.toast.create({
				title: successMessage ?? 'Settings saved',
				variant: 'success'
			});
		} finally {
			isSaving = false;
		}
	}
</script>

<form class="flex max-w-2xl flex-col gap-5" onsubmit={(event) => { event.preventDefault(); void saveFields(); }}>
	{#if title || description}
		<header class="flex flex-col gap-1">
			{#if title}
				<Heading level="2" subTitle={description}>{title}</Heading>
			{:else if description}
				<p class="text-sm text-dark-100">{description}</p>
			{/if}
		</header>
	{/if}

	{#if !isLoading}
		<SettingsFieldGroup
			{context}
			items={fieldItems}
			getField={getField}
			getFieldError={getFieldError}
		/>
	{/if}

	<div>
		<Button type="submit" isLoading={isSaving} disabled={isLoading}>
			{submitLabel ?? t('Save')}
		</Button>
	</div>
</form>
