<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import { Button } from '@stream-kit/ui/button';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		plugin: RegisteredPlugin;
		modalId: string;
	};

	let { plugin, modalId }: Props = $props();
	const { t } = useI18n();

	let isSaving = $state(false);

	function close(): void {
		app.modals.get(modalId)?.close();
	}

	async function savePluginSettings(): Promise<void> {
		if (isSaving) {
			return;
		}

		isSaving = true;

		try {
			const saved = await plugin.save(app);

			if (saved) {
				app.toast.create({
					title: t('Plugin saved'),
					description: t('{name} has been saved successfully', { name: plugin.name }),
					variant: 'success'
				});
				close();
			}
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" disabled={isSaving} onclick={close}>{t('Cancel')}</Button>
	<Button icon="ri:save-line" isLoading={isSaving} onclick={() => void savePluginSettings()}>
		{t('Save')}
	</Button>
</div>
