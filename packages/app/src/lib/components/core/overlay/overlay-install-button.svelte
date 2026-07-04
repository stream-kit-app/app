<script lang="ts">
	import { open } from '@tauri-apps/plugin-dialog';
	import { goto } from '$app/navigation';
	import { isString } from 'es-toolkit';

	import { Button } from '@stream-kit/ui/button';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		variant?: 'default' | 'outline';
		size?: 'default' | 'sm' | 'lg';
	};

	let { variant = 'outline', size = 'default' }: Props = $props();

	const { t } = useI18n();
	let isInstalling = $state(false);

	async function installOverlay(replaceExisting = false, zipPath?: string): Promise<void> {
		if (isInstalling) {
			return;
		}

		let selected = zipPath;

		if (!selected) {
			const picked = await open({
				multiple: false,
				directory: false,
				filters: [{ name: t('Overlay zip'), extensions: ['zip'] }]
			});

			if (!picked || Array.isArray(picked)) {
				return;
			}

			selected = picked;
		}

		if (!replaceExisting) {
			const trusted = await app.confirm.ask({
				title: t('Import third-party overlay?'),
				description: t(
					'Imported overlays are project files stored in Stream Kit app data. Only import overlays from sources you trust.'
				),
				confirmLabel: t('Import'),
				cancelLabel: t('Cancel')
			});

			if (!trusted) {
				return;
			}
		}

		isInstalling = true;

		try {
			const record = await app.overlay.importFromZipPath(selected, replaceExisting);
			app.toast.create({
				title: replaceExisting ? t('Overlay replaced') : t('Overlay installed'),
				description: replaceExisting
					? t('{name} has been reinstalled.', { name: record.name })
					: t('{name} has been imported. Build the overlay before using it in OBS.', {
							name: record.name
						}),
				variant: 'success'
			});
			await goto(`/overlays/${record.id}`);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: isString(error)
						? error.toString()
						: t('Unknown installation error.');

			if (message.includes('already installed')) {
				const confirmed = await app.confirm.ask({
					title: t('Replace overlay?'),
					description: t(
						'An overlay with this id is already installed. Do you want to replace the existing overlay?'
					),
					confirmLabel: t('Replace'),
					cancelLabel: t('Cancel')
				});

				if (confirmed) {
					await installOverlay(true, selected);
				}
			} else {
				app.toast.create({
					title: t('Overlay could not be installed'),
					description: message,
					variant: 'error'
				});
			}
		} finally {
			isInstalling = false;
		}
	}
</script>

<Button
	onclick={() => void installOverlay()}
	{variant}
	{size}
	disabled={isInstalling}
	icon="ri:upload-line"
	aria-label={t('Import overlay')}
	isLoading={isInstalling}
>
	{isInstalling ? t('Importing...') : t('Import overlay')}
</Button>
