<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import SettingsForm from '$lib/components/core/settings/settings-form.svelte';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		plugin: RegisteredPlugin;
	};

	let { plugin }: Props = $props();
	const { t } = useI18n();
	let revision = $state(0);

	const context = $derived.by(() => {
		void revision;

		for (const field of plugin.fields) {
			void field.value;
		}

		return plugin.createContext(app);
	});
	let isSaving = $state(false);

	$effect(() => {
		const api = plugin.api as { subscribe?: (listener: () => void) => () => void } | undefined;

		return api?.subscribe?.(() => {
			revision += 1;
		});
	});

	async function savePluginSettings() {
		isSaving = true;

		try {
			const saved = await plugin.save(app);

			if (saved) {
				app.toast.create({
					title: t('Plugin saved'),
					description: t('{name} has been saved successfully', { name: plugin.name }),
					variant: 'success'
				});
				app.modals.get(`plugin-settings-${plugin.key}`)?.close();
			}
		} finally {
			isSaving = false;
		}
	}
</script>

<SettingsForm
	{context}
	fieldItems={plugin.fieldItems}
	getField={(key) => plugin.getField(key)}
	getFieldError={(fieldId) => plugin.getFieldError(fieldId, plugin.formErrors)}
	onSave={savePluginSettings}
	{isSaving}
	saveLabel={t('Save')}
/>
