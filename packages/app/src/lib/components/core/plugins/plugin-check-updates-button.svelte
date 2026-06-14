<script lang="ts">
	import { Button } from '@stream-kit/ui/button';

	import { app } from '$lib/core';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	let isChecking = $state(false);

	async function checkForUpdates(): Promise<void> {
		if (isChecking || pluginUpdates.isChecking) {
			return;
		}

		isChecking = true;

		try {
			await pluginUpdates.check();

			if (pluginUpdates.availableCount === 0) {
				app.toast.create({
					title: t('All plugins up to date'),
					description: t('No plugin updates were found.'),
					variant: 'success'
				});
			} else {
				app.toast.create({
					title: t('Updates available'),
					description: t('{count} plugin update(s) available.', {
						count: pluginUpdates.availableCount
					}),
					variant: 'default'
				});
			}
		} catch (error) {
			app.toast.create({
				title: t('Update check failed'),
				description: error instanceof Error ? error.message : t('Unknown error.'),
				variant: 'error'
			});
		} finally {
			isChecking = false;
		}
	}
</script>

<Button
	onclick={checkForUpdates}
	variant="outline"
	disabled={isChecking || pluginUpdates.isChecking}
	icon="ri:refresh-line"
	aria-label={t('Check for updates')}
	isLoading={isChecking || pluginUpdates.isChecking}
>
	{isChecking || pluginUpdates.isChecking ? t('Checking...') : t('Check for updates')}
</Button>
