<script lang="ts">
	import type { ApiServerBind, ApiServerSettings } from '#lib/core/api-server/index.js';
	import type { SettingsFieldItem } from '#lib/core/settings/field.js';
	import type { SupportedLocale } from '#lib/i18n.js';

	import { watch } from 'runed';
	import { untrack } from 'svelte';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { CopyButton } from '@stream-kit/ui/copy-button';

	import { SettingsFieldGroup } from '#lib/components/core/settings/index.js';
	import { app } from '#lib/core/index.js';
	import { saveLocale } from '#lib/core/locale/store.js';
	import {
		stopAllPluginDevWatchers,
		syncPluginDevWatchers
	} from '#lib/core/plugins/plugin-dev-watcher.js';
	import { appUpdater } from '#lib/core/updater/app-updater.svelte.js';
	import { useI18n } from '#lib/i18n.js';

	const { t, getLocale, setLocale } = useI18n();

	const localeItems = $derived([
		{ value: 'en', label: t('English') },
		{ value: 'nl', label: t('Dutch') }
	]);

	const bindItems = $derived([
		{ value: '127.0.0.1', label: t('Localhost only (127.0.0.1)') },
		{ value: '0.0.0.0', label: t('All interfaces (LAN)') }
	]);

	const appearanceFields = $derived<SettingsFieldItem[]>([
		{
			type: 'section',
			title: t('Appearance'),
			fields: [
				{
					key: 'locale',
					name: t('Language'),
					type: 'select',
					items: localeItems
				}
			]
		},
		{
			type: 'section',
			title: t('Updates'),
			fields: [
				{
					type: 'alert',
					key: 'appVersion',
					name: t('Current version: {version}', {
						version: appUpdater.currentVersion ?? '…'
					})
				},
				{
					type: 'alert',
					key: 'storeUpdatesHelp',
					name: t('App updates are managed by the Microsoft Store.'),
					visible: () => appUpdater.isStoreInstall
				},
				{
					key: 'checkAppUpdatesOnStartup',
					name: t('Check for app updates on startup'),
					type: 'checkbox',
					visible: () => !appUpdater.isStoreInstall
				},
				{
					type: 'button',
					key: 'checkAppUpdates',
					name:
						appUpdater.isChecking || appUpdater.isInstalling
							? t('Checking...')
							: t('Check for updates'),
					variant: 'outline',
					onClick: () => appUpdater.check(),
					visible: () => !appUpdater.isStoreInstall
				}
			]
		},
		{
			type: 'section',
			title: t('Developer'),
			fields: [
				{
					key: 'developerMode',
					name: t('Developer mode'),
					type: 'checkbox'
				},
				{
					type: 'alert',
					key: 'developerModeHelp',
					name: t('Enable developer tools and plugin hot-reload')
				}
			]
		},
		{
			type: 'section',
			title: t('API Server'),
			fields: [
				{
					key: 'apiServerEnabled',
					name: t('Enable WebSocket API server'),
					type: 'checkbox'
				},
				{
					type: 'alert',
					key: 'apiServerHelp',
					name: t(
						'Remote clients can connect to control Stream Kit. A token is required. Prefer localhost unless you need LAN access.'
					),
					variant: 'warning',
					visible: (context) => Boolean(context.getValue('apiServerEnabled'))
				},
				{
					key: 'apiServerPort',
					name: t('Port'),
					type: 'text',
					visible: (context) => Boolean(context.getValue('apiServerEnabled'))
				},
				{
					key: 'apiServerBind',
					name: t('Bind address'),
					type: 'select',
					items: bindItems,
					visible: (context) => Boolean(context.getValue('apiServerEnabled'))
				},
				{
					key: 'apiServerToken',
					name: t('Access token'),
					type: 'text',
					inputType: 'password',
					visible: (context) => Boolean(context.getValue('apiServerEnabled'))
				},
				{
					type: 'alert',
					key: 'apiServerStatus',
					name: app.apiServer.status.running
						? t('Running at {url}', { url: app.apiServer.status.wsUrl })
						: t('API server is stopped'),
					variant: app.apiServer.status.running ? 'success' : 'default',
					visible: (context) => Boolean(context.getValue('apiServerEnabled'))
				}
			]
		}
	]);

	let fieldValues = $state<Record<string, string | boolean>>({
		locale: getLocale(),
		developerMode: false,
		checkAppUpdatesOnStartup: true,
		apiServerEnabled: false,
		apiServerPort: '7892',
		apiServerBind: '127.0.0.1',
		apiServerToken: ''
	});
	let hasLoadedSettings = $state(false);
	let hasInteracted = false;
	let apiServerSaveTimer: ReturnType<typeof setTimeout> | undefined;
	/** Skip the persist effect while applying service → form updates (avoids restart loops). */
	let suppressApiServerPersist = false;

	const settingsContext = $derived({
		app,
		settings: app.settings,
		getValue: (key: string) => fieldValues[key]
	});

	function applyApiServerFields(settings: ApiServerSettings): void {
		suppressApiServerPersist = true;
		fieldValues = {
			...fieldValues,
			apiServerEnabled: settings.enabled,
			apiServerPort: String(settings.port),
			apiServerBind: settings.bind,
			apiServerToken: settings.token
		};
		queueMicrotask(() => {
			suppressApiServerPersist = false;
		});
	}

	$effect(() => {
		void (async () => {
			await app.settings.ensureLoaded();
			await app.apiServer.loadSettings();
			await appUpdater.load();

			if (!hasInteracted) {
				fieldValues = {
					locale: getLocale(),
					developerMode: app.settings.developerMode,
					checkAppUpdatesOnStartup: app.settings.checkAppUpdatesOnStartup,
					apiServerEnabled: app.apiServer.settings.enabled,
					apiServerPort: String(app.apiServer.settings.port),
					apiServerBind: app.apiServer.settings.bind,
					apiServerToken: app.apiServer.settings.token
				};
			}

			hasLoadedSettings = true;
		})();
	});

	$effect(() => {
		const locale = fieldValues.locale as SupportedLocale | undefined;

		if (!locale || locale === getLocale()) {
			return;
		}

		setLocale(locale);
		void saveLocale(locale);
	});

	$effect(() => {
		if (!hasLoadedSettings) {
			return;
		}

		const enabled = Boolean(fieldValues.developerMode);

		if (enabled === app.settings.developerMode) {
			return;
		}

		void (async () => {
			await app.settings.setDeveloperMode(enabled);

			if (!enabled) {
				await stopAllPluginDevWatchers(app);
				return;
			}

			await syncPluginDevWatchers(app);
		})();
	});

	watch(
		() => ({
			loaded: hasLoadedSettings,
			enabled: Boolean(fieldValues.checkAppUpdatesOnStartup)
		}),
		({ loaded, enabled }) => {
			if (!loaded) {
				return;
			}

			if (enabled === app.settings.checkAppUpdatesOnStartup) {
				return;
			}

			void app.settings.setCheckAppUpdatesOnStartup(enabled);
		}
	);

	$effect(() => {
		if (!hasLoadedSettings) {
			return;
		}

		// Read field values before any early return so this effect re-runs on toggle.
		const enabled = Boolean(fieldValues.apiServerEnabled);
		const port = Number(fieldValues.apiServerPort);
		const bind = (
			fieldValues.apiServerBind === '0.0.0.0' ? '0.0.0.0' : '127.0.0.1'
		) as ApiServerBind;
		const token = String(fieldValues.apiServerToken ?? '');

		if (!hasInteracted || suppressApiServerPersist) {
			return;
		}

		// Do not track service settings — updates from save/regen would re-enter this effect
		// with stale form values and cause a restart loop.
		const current = untrack(() => app.apiServer.settings);
		if (
			enabled === current.enabled &&
			port === current.port &&
			bind === current.bind &&
			token === current.token
		) {
			return;
		}

		clearTimeout(apiServerSaveTimer);
		apiServerSaveTimer = setTimeout(() => {
			void app.apiServer
				.saveSettings({
					enabled,
					port: Number.isFinite(port) && port > 0 ? port : current.port,
					bind,
					token
				})
				.then(() => {
					applyApiServerFields(untrack(() => app.apiServer.settings));
				})
				.catch((error) => {
					console.error('Failed to save API server settings', error);
					app.toast.create({
						title: t('API server settings could not be saved'),
						description:
							error instanceof Error ? error.message : t('Unknown API server error.'),
						variant: 'warning'
					});
				});
		}, 300);
	});

	function getField(key: string) {
		return {
			id: key,
			key,
			get value() {
				return fieldValues[key];
			},
			set value(next: string | boolean) {
				hasInteracted = true;
				fieldValues = { ...fieldValues, [key]: next };
			}
		};
	}

	function notifyWsUrlCopied(): void {
		app.toast.create({
			title: t('Copied'),
			description: t('WebSocket URL copied to clipboard.'),
			variant: 'success'
		});
	}

	async function regenerateToken(): Promise<void> {
		clearTimeout(apiServerSaveTimer);
		hasInteracted = true;
		suppressApiServerPersist = true;

		try {
			const token = await app.apiServer.regenerateToken();
			applyApiServerFields({
				...untrack(() => app.apiServer.settings),
				token
			});
			app.toast.create({
				title: t('Token regenerated'),
				description: t('Clients must reconnect with the new token.'),
				variant: 'success'
			});
		} catch (error) {
			suppressApiServerPersist = false;
			console.error('Failed to regenerate API server token', error);
			app.toast.create({
				title: t('API server settings could not be saved'),
				description:
					error instanceof Error ? error.message : t('Unknown API server error.'),
				variant: 'warning'
			});
		}
	}
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-6">
		<SettingsFieldGroup
			class="max-w-xl"
			context={settingsContext}
			items={appearanceFields}
			getField={(key) => getField(key)}
		/>

		{#if fieldValues.apiServerEnabled}
			<div class="flex max-w-xl flex-wrap gap-2">
				<CopyButton
					variant="outline"
					size="default"
					value={() => app.apiServer.wsUrlWithToken || undefined}
					copiedLabel={t('Copied')}
					disabled={!app.apiServer.status.running}
					onCopied={notifyWsUrlCopied}
				>
					{t('Copy WebSocket URL')}
				</CopyButton>
				<Button
					type="button"
					variant="outline"
					icon="ri:refresh-line"
					onclick={() => void regenerateToken()}
				>
					{t('Regenerate token')}
				</Button>
			</div>
		{/if}
	</div>
</Container>
