<script lang="ts">
	import type { SupportedLocale } from '$lib/i18n';

	import { untrack } from 'svelte';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { SettingsFieldGroup } from '$lib/components/core/settings';
	import { app } from '$lib/core';
	import type { ApiServerBind, ApiServerSettings } from '$lib/core/api-server';
	import { saveLocale } from '$lib/core/locale/store';
	import type { SettingsFieldItem } from '$lib/core/settings/field';
	import {
		stopAllPluginDevWatchers,
		syncPluginDevWatchers
	} from '$lib/core/plugins/plugin-dev-watcher';
	import { useI18n } from '$lib/i18n';

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

			if (!hasInteracted) {
				fieldValues = {
					locale: getLocale(),
					developerMode: app.settings.developerMode,
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

	$effect(() => {
		if (!hasLoadedSettings) {
			return;
		}

		// Read field values before any early return so this effect re-runs on toggle.
		const enabled = Boolean(fieldValues.apiServerEnabled);
		const port = Number(fieldValues.apiServerPort);
		const bind = (fieldValues.apiServerBind === '0.0.0.0' ? '0.0.0.0' : '127.0.0.1') as ApiServerBind;
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

	async function copyWsUrl(): Promise<void> {
		const url = app.apiServer.wsUrlWithToken;
		if (!url) {
			return;
		}

		await navigator.clipboard.writeText(url);
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
				<Button
					type="button"
					variant="outline"
					icon="ri:file-copy-line"
					disabled={!app.apiServer.status.running}
					onclick={() => void copyWsUrl()}
				>
					{t('Copy WebSocket URL')}
				</Button>
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
