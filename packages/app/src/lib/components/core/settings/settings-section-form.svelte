<script lang="ts">
	import type { SettingsSection } from '$lib/core/settings';

	import SettingsFieldGroup from '$lib/components/core/settings/settings-field-group.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Heading } from '$lib/components/ui/heading';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		section: SettingsSection;
	};

	let { section }: Props = $props();
	const { t } = useI18n();

	const context = $derived.by(() => {
		for (const field of section.fields) {
			void field.value;
		}

		return section.createContext(app);
	});
	let isSaving = $state(false);

	async function saveSettings() {
		isSaving = true;

		try {
			await app.settings.save(section.key);
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="flex w-full max-w-2xl flex-col gap-6 p-6">
	<header class="flex flex-col gap-2">
		<Heading level="1" subTitle={section.description}>{section.title}</Heading>
	</header>

	<SettingsFieldGroup
		{context}
		items={section.fieldItems}
		getField={(key) => section.getField(key)}
		getFieldError={(fieldId) => section.getFieldError(fieldId, section.formErrors)}
	/>

	<div>
		<Button onclick={saveSettings} isLoading={isSaving}>{t('Save')}</Button>
	</div>
</div>
