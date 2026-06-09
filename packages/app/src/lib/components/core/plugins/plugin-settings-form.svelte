<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import SettingsFieldGroup from '$lib/components/core/settings/settings-field-group.svelte';
	import { Button } from '@stream-kit/ui/button';
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
			}
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="flex w-full flex-col gap-6">
	<SettingsFieldGroup
		{context}
		items={plugin.fieldItems}
		getField={(key) => plugin.getField(key)}
		getFieldError={(fieldId) => plugin.getFieldError(fieldId, plugin.formErrors)}
	/>

	<div>
		<Button onclick={savePluginSettings} isLoading={isSaving}>{t('Save')}</Button>
	</div>
</div>
