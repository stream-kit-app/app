<script lang="ts">
	import { open } from '@tauri-apps/plugin-dialog';
	import { isString } from 'es-toolkit';

	import { Button } from '@stream-kit/ui/button';
	import { app } from '$lib/core';
	import { installPluginFromZip } from '$lib/core/plugins/plugin-loader';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();
	let isInstalling = $state(false);

	async function installPlugin(): Promise<void> {
		if (isInstalling) {
			return;
		}

		const selected = await open({
			multiple: false,
			directory: false,
			filters: [{ name: t('Plugin zip'), extensions: ['zip'] }]
		});

		if (!selected || Array.isArray(selected)) {
			return;
		}

		// Installed plugins run with full access to the app and system, so require
		// explicit, informed consent before extracting and loading untrusted code.
		const trusted = await app.confirm.ask({
			title: t('Install third-party plugin?'),
			description: t(
				'Installed plugins run with full access to Stream Kit and your system. Only install plugins from sources you trust.'
			),
			confirmLabel: t('Install'),
			cancelLabel: t('Cancel')
		});

		if (!trusted) {
			return;
		}

		isInstalling = true;

		try {
			const manifest = await installPluginFromZip(app, selected);
			app.toast.create({
				title: t('Plugin installed'),
				description: t('{name} has been installed. Enable the plugin to start using it.', {
					name: manifest.name
				}),
				variant: 'success'
			});
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: isString(error)
						? error.toString()
						: t('Unknown installation error.');

			if (message.includes('already installed')) {
				const confirmed = await app.confirm.ask({
					title: t('Replace plugin?'),
					description: t(
						'A plugin with this key is already installed. Do you want to replace the existing plugin?'
					),
					confirmLabel: t('Replace'),
					cancelLabel: t('Cancel')
				});

				if (confirmed) {
					try {
						const manifest = await installPluginFromZip(app, selected, true);
						app.toast.create({
							title: t('Plugin replaced'),
							description: t('{name} has been reinstalled.', { name: manifest.name }),
							variant: 'success'
						});
					} catch (replaceError) {
						app.toast.create({
							title: t('Plugin could not be installed'),
							description:
								replaceError instanceof Error
									? replaceError.message
									: t('Unknown installation error.'),
							variant: 'error'
						});
					}
				}
			} else {
				app.toast.create({
					title: t('Plugin could not be installed'),
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
	onclick={installPlugin}
	variant="outline"
	disabled={isInstalling}
	icon="ri:upload-line"
	aria-label={t('Install plugin')}
	isLoading={isInstalling}
>
	{isInstalling ? t('Installing...') : t('Install plugin')}
</Button>
