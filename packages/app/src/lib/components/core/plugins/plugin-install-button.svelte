<script lang="ts">
	import { open } from '@tauri-apps/plugin-dialog';
	import { isString } from 'es-toolkit';

	import { Button } from '$lib/components/ui/button';
	import { app } from '$lib/core';
	import { installPluginFromZip } from '$lib/core/plugins/plugin-loader';

	let isInstalling = $state(false);

	async function installPlugin(): Promise<void> {
		if (isInstalling) {
			return;
		}

		const selected = await open({
			multiple: false,
			directory: false,
			filters: [{ name: 'Plugin zip', extensions: ['zip'] }]
		});

		if (!selected || Array.isArray(selected)) {
			return;
		}

		isInstalling = true;

		try {
			const manifest = await installPluginFromZip(app, selected);
			app.toast.create({
				title: 'Plugin installed',
				description: `${manifest.name} has been installed. Enable the plugin to start using it.`,
				variant: 'success'
			});
		} catch (error) {
			console.log(error);
			const message =
				error instanceof Error
					? error.message
					: isString(error)
						? error.toString()
						: 'Unknown installation error.';

			if (message.includes('already installed')) {
				const confirmed = await app.confirm.ask({
					title: 'Replace plugin?',
					description:
						'A plugin with this key is already installed. Do you want to replace the existing plugin?',
					confirmLabel: 'Replace',
					cancelLabel: 'Cancel'
				});

				if (confirmed) {
					try {
						const manifest = await installPluginFromZip(app, selected, true);
						app.toast.create({
							title: 'Plugin replaced',
							description: `${manifest.name} has been reinstalled.`,
							variant: 'success'
						});
					} catch (replaceError) {
						app.toast.create({
							title: 'Plugin could not be installed',
							description:
								replaceError instanceof Error
									? replaceError.message
									: 'Unknown installation error.',
							variant: 'error'
						});
					}
				}
			} else {
				app.toast.create({
					title: 'Plugin could not be installed',
					description: message,
					variant: 'error'
				});
			}
		} finally {
			isInstalling = false;
		}
	}
</script>

<Button onclick={installPlugin} disabled={isInstalling}>
	{isInstalling ? 'Installing...' : 'Install plugin'}
</Button>
